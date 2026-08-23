<?php
// =============================================
// SUPABASE CONFIGURATION
// =============================================

// 🔑 IMPORTANT: Apni Supabase credentials yahan paste karein
define('SUPABASE_URL', 'https://YOUR_PROJECT_ID.supabase.co');
define('SUPABASE_ANON_KEY', 'YOUR_ANON_KEY_HERE');
define('SUPABASE_SERVICE_KEY', 'YOUR_SERVICE_ROLE_KEY_HERE');

// Database connection settings (Supabase Pooler)
define('DB_HOST', 'aws-0-us-east-1.pooler.supabase.com');
define('DB_PORT', '5432');
define('DB_NAME', 'postgres');
define('DB_USER', 'postgres.YOUR_PROJECT_ID');
define('DB_PASS', 'YOUR_DATABASE_PASSWORD');

// =============================================
// PDO CONNECTION
// =============================================

function getDBConnection() {
    try {
        $dsn = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME;
        $pdo = new PDO($dsn, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database Connection Error: " . $e->getMessage());
        return null;
    }
}

// =============================================
// SUPABASE AUTH FUNCTIONS
// =============================================

function supabaseAuthSignup($email, $password, $userData) {
    $url = SUPABASE_URL . '/auth/v1/signup';
    
    $data = [
        'email' => $email,
        'password' => $password,
        'data' => $userData
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'status' => $httpCode,
        'data' => json_decode($response, true)
    ];
}

function supabaseAuthLogin($email, $password) {
    $url = SUPABASE_URL . '/auth/v1/token?grant_type=password';
    
    $data = [
        'email' => $email,
        'password' => $password
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'status' => $httpCode,
        'data' => json_decode($response, true)
    ];
}
?>