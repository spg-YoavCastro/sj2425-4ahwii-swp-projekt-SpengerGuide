<?php
session_start([
    'cookie_path' => '/Spengerguide/'
]);

header('Content-Type: application/json');

$response = [
    'loggedIn' => false,
    'user' => null
];

if (isset($_SESSION['user_id'])) {
    $response = [
        'loggedIn' => true,
        'user' => [
            'name' => $_SESSION['user_name'],
            'email' => $_SESSION['user_email']
        ]
    ];
}

echo json_encode($response);
?>