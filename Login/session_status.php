<?php
session_start();
header('Content-Type: application/json');

$response = [
    'loggedIn' => isset($_SESSION['user_id']),
    'user' => null
];

if (isset($_SESSION['user_id'])) {
    $response['user'] = [
        'name' => $_SESSION['user_name'] ?? 'Benutzer',
        'email' => $_SESSION['user_email'] ?? ''
    ];
}

echo json_encode($response);
?>