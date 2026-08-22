<?php
/* ============================================
   SIGNUP HANDLER
   ============================================ */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

require_once '../config/db.php';

$full_name = isset($_POST['full_name']) ? sanitize($_POST['full_name']) : '';
$father_name = isset($_POST['father_name']) ? sanitize($_POST['father_name']) : '';
$cell_number = isset($_POST['cell_number']) ? sanitize($_POST['cell_number']) : '';
$email = isset($_POST['email']) ? sanitize($_POST['email']) : '';
$address = isset($_POST['address']) ? sanitize($_POST['address']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$confirm_password = isset($_POST['confirm_password']) ? $_POST['confirm_password'] : '';

$errors = [];

if (empty($full_name) || strlen($full_name) < 2) {
    $errors['full_name'] = 'Full name is required.';
}
if (empty($father_name) || strlen($father_name) < 2) {
    $errors['father_name'] = "Father's name is required.";
}
if (empty($cell_number) || !preg_match('/^0\d{10}$/', preg_replace('/[-\s]/', '', $cell_number))) {
    $errors['cell_number'] = 'Enter valid 11-digit cell number.';
}
if (empty($email) || !validateEmail($email)) {
    $errors['email'] = 'Enter valid email address.';
}
if (empty($address) || strlen($address) < 5) {
    $errors['address'] = 'Address is required.';
}
if (empty($password) || strlen($password) < 8) {
    $errors['password'] = 'Password must be at least 8 characters.';
}
if ($password !== $confirm_password) {
    $errors['confirm_password'] = 'Passwords do not match.';
}

if (!empty($errors)) {
    jsonResponse(false, 'Validation errors', ['errors' => $errors]);
}

try {
    $stmt = $pdo->prepare("SELECT id FROM patients WHERE email = :email");
    $stmt->execute(['email' => $email]);
    if ($stmt->rowCount() > 0) {
        jsonResponse(false, 'This email is already registered.');
    }
} catch (PDOException $e) {
    jsonResponse(false, 'Database error: ' . $e->getMessage());
}

try {
    $hashed_password = hashPassword($password);
    $stmt = $pdo->prepare("INSERT INTO patients (full_name, father_name, cell_number, email, address, password) VALUES (:full_name, :father_name, :cell_number, :email, :address, :password)");
    $result = $stmt->execute([
        'full_name' => $full_name,
        'father_name' => $father_name,
        'cell_number' => $cell_number,
        'email' => $email,
        'address' => $address,
        'password' => $hashed_password
    ]);
    
    if ($result) {
        $user_id = $pdo->lastInsertId();
        $_SESSION['user_id'] = $user_id;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_name'] = $full_name;
        $_SESSION['logged_in'] = true;
        jsonResponse(true, 'Registration successful!', ['user_id' => $user_id, 'email' => $email, 'full_name' => $full_name]);
    } else {
        jsonResponse(false, 'Registration failed. Please try again.');
    }
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        jsonResponse(false, 'This email is already registered.');
    } else {
        jsonResponse(false, 'Database error: ' . $e->getMessage());
    }
}
?>