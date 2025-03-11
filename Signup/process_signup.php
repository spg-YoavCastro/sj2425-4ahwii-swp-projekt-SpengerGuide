<?php //by luka & Marius

/* 
 * Service Typ : POST
 * Erstellt einen neuen Eintrag
 */

include('./common.php');

$data = json_decode(file_get_contents('php://input'), true); // JSON wird konvertiert

/*
 * Funktionen aufrufen
 */

$dbh = createDatabaseHandle();
$out = _executeUserAdd($dbh,$data);
$out['http_status'] = 200;

/*
 * AUSGABE 
 */

header('X-PHP-Response-Code: '.$out['http_status'], true, $out['http_status']);
header('X-SX-Server: v=20240101');
header('Content-Type: application/json; charset=UTF-8',true, $out['http_status']);
header('Cache-Control: no-cache, must-revalidate');
echo json_encode($out);
// Daten in die Datenbank einfügen
function _executeUserAdd($dbh,$data){
    require_once './mydb.class.php';
    $aQ = array();
    $aQ['name'] = htmlspecialchars($data['name']);
    $aQ['email'] = htmlspecialchars($data['email']);
    $aQ['passwort'] = htmlspecialchars($data['passwort']); // Auslesen der Daten
   
    $c  = new mydb();
    $c->setDB($dbh);
// SQL-Anweisung
    $ret = $c->_executeQuery('INSERT into Benutzer (Name, Email, Passwort) VALUES (:name, :email, :passwort)', $aQ);
    
    // Rückgabe an die Webseite;
    return array(
            'message'       => 'Benutzer erstellt',
            'error'         => '',
            'data'          => $ret
            );
}