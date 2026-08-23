<?php
/* ============================================
   FORGOT PASSWORD HANDLER
   ============================================ */

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

// Include database connection
require_once '../config/db.php';

// Get and sanitize email
$email = isset($_POST['email']) ? sanitize($_POST['email']) : '';

// Validate email
if (empty($email) || !validateEmail($email)) {
    jsonResponse(false, 'Please enter a valid email address.');
}

try {
    // Check if email exists in database
    $stmt = $pdo->prepare("SELECT id, full_name FROM patients WHERE email = :email");
    $stmt->execute(['email' => $email]);
    
    if ($stmt->rowCount() === 0) {
        jsonResponse(false, 'No account found with this email address.');
    }
    
    $user = $stmt->fetch();
    
    // Generate reset token
    $token = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
    
    // Store token in database
    $stmt = $pdo->prepare("UPDATE patients SET reset_token = :token, reset_expires = :expires WHERE id = :id");
    $stmt->execute([
        'token' => $token,
        'expires' => $expires,
        'id' => $user['id']
    ]);
    
    // In a real application, send email with reset link
    // For now, just return success
    jsonResponse(true, 'Password reset link sent to your email!');
    
} catch (PDOException $e) {
    jsonResponse(false, 'Database error: ' . $e->getMessage());
}
?>