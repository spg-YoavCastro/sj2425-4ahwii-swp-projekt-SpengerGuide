<?php
// ==================== KONFIGURATION ====================
$db_host = "127.0.0.1";
$db_user = "root";
$db_pass = "";
$db_name = "test";
$db_table = "nutzer"; // Deine Tabelle

// ==================== SESSION START ====================
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ==================== DATENBANKVERBINDUNG ====================
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Datenbankverbindung fehlgeschlagen: " . $conn->connect_error);
}

// ==================== LOGIK ====================
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Eingaben säubern
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password']; // Rohpasswort (wird gehasht verglichen)

    // SQL mit Prepared Statement
    $sql = "SELECT id, Vorname, Nachname, email, passwort FROM $db_table WHERE email = ?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        die("SQL-Fehler: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        
        // Passwortprüfung
        if (password_verify($password, $user['passwort'])) {
            // Login erfolgreich
            $_SESSION['user'] = [
                'id' => $user['id'],
                'vorname' => $user['Vorname'],
                'nachname' => $user['Nachname'],
                'email' => $user['email']
            ];
            
            header("Location: dashboard.php");
            exit();
        }
    }
    
    // Login fehlgeschlagen
    $_SESSION['login_error'] = "Falsche Email oder Passwort!";
    header("Location: login.html");
    exit();
}

// Falls direkt aufgerufen
header("Location: login.html");
exit();
?>