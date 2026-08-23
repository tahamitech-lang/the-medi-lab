<?php
header('Content-Type: application/json');
require_once 'session.php';

// session.php calls session_start();
$logged = isLoggedIn();

echo json_encode([
    'logged_in' => $logged
]);
exit;
