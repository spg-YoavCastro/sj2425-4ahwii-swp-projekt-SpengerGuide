<?php 

/* 
 * Service Typ : POST
 * Erstellt einen neuen Eintrag
 */

include('./common.php');

// Überprüfen, ob die Anfrage per POST gesendet wurde
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Daten aus dem POST-Formular auslesen
    $data = [
        'Vorname' => htmlspecialchars($_POST['Vorname']),
        'Nachname' => htmlspecialchars($_POST['Nachname']),
        'email' => htmlspecialchars($_POST['email']),
        'passwort' => htmlspecialchars($_POST['passwort']) // Passwort sollte später gehasht werden!
    ];

    /*
     * Funktionen aufrufen
     */
    $dbh = createDatabaseHandle();
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
} else {
    // Falls die Anfrage nicht per POST gesendet wurde
    http_response_code(405); // Method Not Allowed
    echo json_encode(['message' => 'Nur POST-Anfragen sind erlaubt.']);
}

// Daten in die Datenbank einfügen
function _executeUserAdd($dbh, $data) {
    require_once './mydb.class.php';
    $aQ = array();
    $aQ['Vorname'] = $data['Vorname'];
    $aQ['Nachname'] = $data['Nachname'];
    $aQ['email'] = $data['email'];
    $aQ['passwort'] = password_hash($data['passwort'], PASSWORD_BCRYPT); // Passwort hashen

    $c = new mydb();
    $c->setDB($dbh);
    // SQL-Anweisung
    $ret = $c->_executeQuery('INSERT INTO nutzer (Vorname, Nachname, email, passwort) VALUES (:Vorname, :Nachname, :email, :passwort)', $aQ);

    // Rückgabe an die Webseite
    return array(
        'message' => 'Benutzer erstellt',
        'error' => '',
        'data' => $ret
    );
}