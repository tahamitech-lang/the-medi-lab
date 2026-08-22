<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

require_once '../config/db.php';

$email = isset($_POST['email']) ? sanitize($_POST['email']) : '';

if (empty($email) || !validateEmail($email)) {
    jsonResponse(false, 'Please enter a valid email address.');
}

try {
    $stmt = $pdo->prepare("SELECT id, full_name FROM patients WHERE email = :email");
    $stmt->execute(['email' => $email]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(false, 'No account found with this email address.');
    }
    
    $user = $stmt->fetch();
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
    
    $stmt = $pdo->prepare("UPDATE patients SET reset_token = :token, reset_expires = :expires WHERE id = :id");
    $stmt->execute(['token' => $token, 'expires' => $expires, 'id' => $user['id']]);
    
    jsonResponse(true, 'Password reset link sent to your email!');
    
} catch (PDOException $e) {
    jsonResponse(false, 'Database error: ' . $e->getMessage());
}
?>