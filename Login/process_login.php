<?php
session_start();
header('Content-Type: application/json'); // Wichtig für AJAX

// Debugging
file_put_contents('login.log', print_r($_POST, true), FILE_APPEND);

// Datenbankverbindung
$db = new mysqli("127.0.0.1", "root", "", "test");
if ($db->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Datenbankverbindung fehlgeschlagen']));
}

// Login-Logik
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $db->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // 1. Prüfe ob Nutzer existiert
    $stmt = $db->prepare("SELECT id, passwort FROM nutzer WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        // Nutzer nicht gefunden
        echo json_encode([
            'status' => 'error',
            'message' => 'Kein Konto mit dieser E-Mail gefunden'
        ]);
        exit();
    }

    // 2. Passwort prüfen
    $user = $result->fetch_assoc();
    if (!password_verify($password, $user['passwort'])) {
        // Falsches Passwort
        echo json_encode([
            'status' => 'error', 
            'message' => 'Falsches Passwort'
        ]);
        exit();
    }

    // 3. Erfolg
    $_SESSION['user_id'] = $user['id'];
    echo json_encode([
        'status' => 'success',
        'redirect' => '/Spengerguide/dashboard.php' // Weiterleitungsziel
    ]);
    exit();
}

// Fallback
echo json_encode(['status' => 'error', 'message' => 'Ungültige Anfrage']);
?>