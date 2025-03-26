<?php
session_start(); // Session starten


// Daten aus dem Formular
$email = $_POST['email'];
$password = $_POST['password'];

// Benutzer in der Datenbank suchen
$sql = "SELECT * FROM nutzer WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Passwort überprüfen
    if (password_verify($password, $user['passwort'])) {
        // Login erfolgreich
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        header("Location: ../startpage.html"); // Weiterleitung
        exit();
    } else {
        echo "Falsches Passwort!";
    }
} else {
    echo "Benutzer nicht gefunden!";
}

$stmt->close();
$conn->close();
?>