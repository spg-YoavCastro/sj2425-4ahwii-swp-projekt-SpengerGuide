<?php
/*
 * Allgemeine Definitionen und Konstanten, die in jeden Einstiegspunkt einbezogen werden sollen
 * Verwendung: include('./def.php');
 */

/* Schutz */
if (strpos($_SERVER['PHP_SELF'],'def.php')) {
    Header("Location: ./"); 
    die();
}

/* Fehlerberichterstattung aktivieren */
error_reporting(E_ALL | E_STRICT); 

/* Datenbankkonstanten definieren */
define ('DB_HOST', '127.0.0.1');
define ('DB_USER', 'root');
define ('DB_PASS', '');
define ('DB_NAME', 'test');

/* Funktion zur Ausgabe von Debug-Informationen */
function srv_debug($var){
    echo $var;
}

/* Hilfsfunktionen zum Bereinigen eingehender Daten, die NUR GET/POST unterstützen
 * Verwendung: $var = checkParamString('g','nameofgetvariable');
 */

/* Funktion zum Überprüfen von String-Parametern */
function checkParamString($method, $paramName){
    switch($method){
        case 'g': 
            return filter_input(INPUT_GET, $paramName, FILTER_SANITIZE_STRING);
        case 'p': 
            return filter_input(INPUT_POST, $paramName, FILTER_SANITIZE_STRING);
        default: 
            return null;
    }
}

/* Funktion zum Überprüfen von Integer-Parametern */
function checkParamInt($method, $paramName){
    switch($method){
        case 'g': 
            return filter_input(INPUT_GET, $paramName, FILTER_SANITIZE_NUMBER_INT);
        case 'p': 
            return filter_input(INPUT_POST, $paramName, FILTER_SANITIZE_NUMBER_INT);
        default: 
            return null;
    }
}

/* Funktion zur Validierung von CSS-Strings */
function validateCSS($cssString) {
    // Den CSS-String in einzelne Zeilen aufteilen
    $lines = explode("\n", $cssString);

    // Reguläre Ausdrücke zum Abgleichen gängiger CSS-Syntaxmuster
    $patterns = [
        '/^[\s]*@(import|charset|namespace)[^;]*;/i', // Passt auf @import, @charset, @namespace Regeln
        '/^[\s]*@[a-z-]+[^{]*\{/i',                   // Passt auf andere @ Regeln
        '/^[\s]*[.#]?[a-z][a-z0-9_:-]*\s*{/i',        // Passt auf Selektoren
        '/^[\s]*}/',                                  // Passt auf schließende geschweifte Klammern
        '/^[\s]*[a-z-]+\s*:[^;]+;/i',                 // Passt auf Eigenschaft: Wert; Deklarationen
        '/\/\*(.|[\r\n])*?\*\//'                      // Passt auf mehrzeilige Kommentare
    ];

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '') {
            continue; // Leere Zeilen überspringen
        }
        $valid = false;
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $line)) {
                $valid = true;
                break;
            }
        }
        if (!$valid) {
            echo 'CSS ist nicht gültig: Ungültige Syntax in Zeile - ' . $line;
            return false;
        }
    }
    echo 'CSS ist gültig!';
    return true;
}

/* Funktion zum Erstellen eines Datenbank-Handles */
function createDatabaseHandle(){
    /* Initialisierung des PDO-Datenbankverbindungshandles */
    $dsn = 'mysql:dbname='.DB_NAME.';host='.DB_HOST;
    try {
        $dbh = new PDO($dsn, DB_USER, DB_PASS);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $dbh->exec('Set names utf8;');
    } catch (PDOException $e) {
        srv_debug('Verbindung fehlgeschlagen: ' . $e->getMessage());
        die();
    }
    return $dbh;
}




