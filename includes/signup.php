<?php
header('Content-Type: application/json');
require_once 'config.php';

// Get POST data
$full_name = $_POST['full_name'] ?? '';
$father_name = $_POST['father_name'] ?? '';
$cell_number = $_POST['cell_number'] ?? '';
$email = $_POST['email'] ?? '';
$address = $_POST['address'] ?? '';
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

// Validation
$errors = [];

if (empty($full_name) || strlen($full_name) < 2) {
    $errors['full_name'] = 'Full name is required';
}
if (empty($father_name) || strlen($father_name) < 2) {
    $errors['father_name'] = 'Father\'s name is required';
}
if (empty($cell_number) || !preg_match('/^0\d{10}$/', preg_replace('/[^0-9]/', '', $cell_number))) {
    $errors['cell_number'] = 'Valid 11-digit cell number required';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Valid email address required';
}
if (empty($address) || strlen($address) < 5) {
    $errors['address'] = 'Address is required';
}
if (strlen($password) < 8) {
    $errors['password'] = 'Password must be at least 8 characters';
}
if ($password !== $confirm_password) {
    $errors['confirm_password'] = 'Passwords do not match';
}

if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fix validation errors',
        'data' => ['errors' => $errors]
    ]);
    exit;
}

// Check if email already exists
$pdo = getDBConnection();
if ($pdo) {
    $stmt = $pdo->prepare("SELECT id FROM patients WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode([
            'success' => false,
            'message' => 'Email already registered',
            'data' => ['errors' => ['email' => 'Email already exists']]
        ]);
        exit;
    }
}

// Create user in Supabase Auth
// Prepare user metadata to send to Supabase (do NOT send hashed password to Supabase)
$userMeta = [
    'full_name' => $full_name,
    'father_name' => $father_name,
    'cell_number' => $cell_number,
    'address' => $address
];

$authResult = supabaseAuthSignup($email, $password, $userMeta);

// Accept any 2xx status as success
if (isset($authResult['status']) && $authResult['status'] >= 200 && $authResult['status'] < 300 && !empty($authResult['data']['user']['id'])) {
    $supabaseUser = $authResult['data']['user'];
    $supabaseId = $supabaseUser['id'];

    // Insert into local patients table with hashed password for local verification
    $pdo = getDBConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO patients (id, full_name, father_name, cell_number, email, address, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $supabaseId,
                $full_name,
                $father_name,
                $cell_number,
                $email,
                $address,
                password_hash($password, PASSWORD_DEFAULT)
            ]);
        } catch (PDOException $e) {
            // If insert fails because user exists, ignore; otherwise log
            error_log('Patients insert error: ' . $e->getMessage());
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Account created successfully!',
        'data' => ['user' => $supabaseUser]
    ]);
    exit;
} else {
    $errorMsg = $authResult['data']['msg'] ?? ($authResult['data']['error'] ?? 'Signup failed');
    if (is_array($errorMsg)) $errorMsg = json_encode($errorMsg);

    if (strpos((string)$errorMsg, 'already registered') !== false || strpos((string)$errorMsg, 'User already') !== false) {
        echo json_encode([
            'success' => false,
            'message' => 'Email already registered',
            'data' => ['errors' => ['email' => 'Email already exists']]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => $errorMsg
        ]);
    }
    exit;
}
?>