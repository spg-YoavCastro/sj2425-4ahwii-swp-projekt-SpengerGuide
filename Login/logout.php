<?php
session_start([
    'cookie_path' => '/Spengerguide/'
]);

// Session komplett zerstören
$_SESSION = [];
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
session_destroy();

header('Content-Type: application/json');
echo json_encode(['status' => 'success']);
?>