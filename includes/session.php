<?php
session_start();

function isLoggedIn() {
    if (isset($_SESSION['user_id'])) {
        return true;
    }
    
    // Check remember me cookie
    if (isset($_COOKIE['user_id']) && isset($_COOKIE['access_token'])) {
        $_SESSION['user_id'] = $_COOKIE['user_id'];
        $_SESSION['access_token'] = $_COOKIE['access_token'];
        return true;
    }
    
    return false;
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: index.html');
        exit;
    }
}

function getCurrentUser() {
    global $pdo;
    if (isLoggedIn()) {
        $stmt = $pdo->prepare("SELECT * FROM patients WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        return $stmt->fetch();
    }
    return null;
}
?>