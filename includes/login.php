<?php
/* ============================================
   LOGIN HANDLER
   ============================================ */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

require_once '../config/db.php';

$email = isset($_POST['email']) ? sanitize($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$remember = isset($_POST['remember']) ? (bool)$_POST['remember'] : false;

$errors = [];

if (empty($email) || !validateEmail($email)) {
    $errors['email'] = 'Please enter a valid email address.';
}
if (empty($password)) {
    $errors['password'] = 'Password is required.';
}

if (!empty($errors)) {
    jsonResponse(false, 'Validation errors', ['errors' => $errors]);
}

try {
    $stmt = $pdo->prepare("SELECT id, full_name, email, password FROM patients WHERE email = :email");
    $stmt->execute(['email' => $email]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(false, 'Invalid email or password.');
    }
    
    $user = $stmt->fetch();
    
    if (!verifyPassword($password, $user['password'])) {
        jsonResponse(false, 'Invalid email or password.');
    }
    
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_name'] = $user['full_name'];
    $_SESSION['logged_in'] = true;
    
    if ($remember) {
        $token = bin2hex(random_bytes(32));
        setcookie('remember_token', $token, time() + (86400 * 30), '/', '', false, true);
        try {
            $stmt = $pdo->prepare("UPDATE patients SET remember_token = :token WHERE id = :id");
            $stmt->execute(['token' => $token, 'id' => $user['id']]);
        } catch (PDOException $e) {}
    }
    
    // Update last login
    try {
        $stmt = $pdo->prepare("UPDATE patients SET last_login = NOW() WHERE id = :id");
        $stmt->execute(['id' => $user['id']]);
    } catch (PDOException $e) {}
    
    jsonResponse(true, 'Login successful!', ['user_id' => $user['id'], 'email' => $user['email'], 'full_name' => $user['full_name']]);
    
} catch (PDOException $e) {
    jsonResponse(false, 'Database error: ' . $e->getMessage());
}
?>