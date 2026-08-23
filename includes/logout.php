<?php
session_start();
session_destroy();
setcookie('user_id', '', time() - 3600, '/');
setcookie('access_token', '', time() - 3600, '/');
header('Location: index.html?logout=success');
exit;
?>