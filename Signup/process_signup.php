<?php
// Fehlermeldungen aktivieren
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/*
 * Service Typ : POST
 * Erstellt einen neuen Eintrag
 */

include('./common.php');

// Überprüfen, ob die Anfrage per POST gesendet wurde
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "POST-Anfrage empfangen.<br>";

    // Daten aus dem POST-Formular auslesen
    $data = [
        'firstname' => htmlspecialchars($_POST['firstname']),
        'lastname' => htmlspecialchars($_POST['lastname']),
        'email' => htmlspecialchars($_POST['email']),
        'password' => htmlspecialchars($_POST['password']) // Passwort sollte später gehasht werden!
    ];

    echo "Daten aus dem Formular:<br>";
    print_r($data); // Debugging: Zeige die POST-Daten an

    /*
     * Funktionen aufrufen
     */
    $dbh = createDatabaseHandle();
    if (!$dbh) {
        die('Datenbankverbindung fehlgeschlagen.');
    } else {
        echo "Datenbankverbindung erfolgreich hergestellt.<br>";
    }

    $out = _executeUserAdd($dbh, $data);
    $out['http_status'] = 200;

    /*
     * AUSGABE 
     */
    header('X-PHP-Response-Code: ' . $out['http_status'], true, $out['http_status']);
    header('X-SX-Server: v=20240101');
    header('Content-Type: application/json; charset=UTF-8', true, $out['http_status']);
    header('Cache-Control: no-cache, must-revalidate');
    echo json_encode($out);

    // Erfolgsmeldung und Weiterleitung
    header('Location: ../Login/login.html?signup=success');
    exit();
} else {
    // Falls die Anfrage nicht per POST gesendet wurde
    http_response_code(405); // Method Not Allowed
    echo json_encode(['message' => 'Nur POST-Anfragen sind erlaubt.']);
}

// Daten in die Datenbank einfügen
function _executeUserAdd($dbh, $data) {
    require_once './mydb.class.php';
    $aQ = array();
    $aQ['firstname'] = $data['firstname'];
    $aQ['lastname'] = $data['lastname'];
    $aQ['email'] = $data['email'];
    $aQ['password'] = password_hash($data['password'], PASSWORD_BCRYPT); // Passwort hashen

    echo "Vorbereitete Daten für die Datenbank:<br>";
    print_r($aQ); // Debugging: Zeige die vorbereiteten Daten an

    $c = new mydb();
    $c->setDB($dbh);
    // SQL-Anweisung
    $ret = $c->_executeQuery('INSERT INTO nutzer (Vorname, Nachname, email, passwort) VALUES (:firstname, :lastname, :email, :password)', $aQ);

    // Rückgabe an die Webseite
    return array(
        'message' => 'Benutzer erstellt',
        'error' => '',
        'data' => $ret
    );
}