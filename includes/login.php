<?php
header('Content-Type: application/json');
require_once 'config.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$remember = isset($_POST['remember']) ? true : false;

$errors = [];

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Valid email required';
}
if (empty($password)) {
    $errors['password'] = 'Password required';
}

if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fix validation errors',
        'data' => ['errors' => $errors]
    ]);
    exit;
}

$authResult = supabaseAuthLogin($email, $password);

// If Supabase auth succeeds (2xx), use that session
if (isset($authResult['status']) && $authResult['status'] >= 200 && $authResult['status'] < 300 && !empty($authResult['data']['user']['id'])) {
    $userData = $authResult['data'];

    session_start();
    $_SESSION['user_id'] = $userData['user']['id'];
    $_SESSION['access_token'] = $userData['access_token'] ?? null;
    $_SESSION['refresh_token'] = $userData['refresh_token'] ?? null;
    $_SESSION['email'] = $userData['user']['email'] ?? $email;

    if ($remember) {
        setcookie('user_id', $userData['user']['id'], time() + (7 * 24 * 60 * 60), '/');
        if (!empty($userData['access_token'])) setcookie('access_token', $userData['access_token'], time() + (7 * 24 * 60 * 60), '/');
    }

    // Save session in database (best-effort)
    $pdo = getDBConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO sessions (user_id, session_token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, NOW() + INTERVAL '7 days')");
            $stmt->execute([
                $userData['user']['id'],
                $userData['access_token'] ?? null,
                $_SERVER['REMOTE_ADDR'],
                $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
            ]);
        } catch (PDOException $e) {
            error_log('Session insert error: ' . $e->getMessage());
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Login successful!',
        'data' => [
            'user' => $userData['user'],
            'access_token' => $userData['access_token'] ?? null
        ]
    ]);
    exit;
}

// If Supabase auth failed, fall back to local DB verification (useful for local accounts)
$pdo = getDBConnection();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT id, email, password FROM patients WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $row = $stmt->fetch();
        if ($row && !empty($row['password']) && password_verify($password, $row['password'])) {
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['email'] = $row['email'];

            if ($remember) {
                setcookie('user_id', $row['id'], time() + (7 * 24 * 60 * 60), '/');
            }

            echo json_encode([
                'success' => true,
                'message' => 'Login successful (local)!',
                'data' => ['user' => ['id' => $row['id'], 'email' => $row['email']]]
            ]);
            exit;
        }
    } catch (PDOException $e) {
        error_log('Local login error: ' . $e->getMessage());
    }
}

// Default: invalid credentials
$errorMsg = $authResult['data']['msg'] ?? ($authResult['data']['error'] ?? 'Invalid credentials');
echo json_encode([
    'success' => false,
    'message' => 'Invalid email or password',
    'data' => ['errors' => ['email' => 'Invalid credentials', 'password' => 'Invalid credentials']]
]);
exit;
?>