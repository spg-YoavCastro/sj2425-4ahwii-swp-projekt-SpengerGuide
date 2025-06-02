<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$response = ['success' => false, 'message' => ''];

// Pfad, in dem die Fragen gespeichert werden sollen.
// Da save_question.php in Q&A/ liegt und die Fragen dort gespeichert werden,
// ist '.' (aktuelles Verzeichnis) der korrekte Pfad.
$save_directory = './'; 

// Sicherstellen, dass das Verzeichnis existiert
if (!is_dir($save_directory)) {
    if (!mkdir($save_directory, 0777, true)) {
        $response['message'] = 'Fehler: Speicherverzeichnis konnte nicht erstellt werden.';
        echo json_encode($response);
        exit;
    }
}

// Den empfangenen JSON-Body lesen
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    $response['message'] = 'Ungültiges JSON-Format gesendet.';
    echo json_encode($response);
    exit;
}

// Überprüfen, ob die erforderlichen Daten vorhanden sind
if (isset($data['text']) && isset($data['user']) && isset($data['timestamp'])) {
    $question_text = $data['text'];
    $user = $data['user'];
    $timestamp = $data['timestamp'];

    // Dateiname generieren (z.B. question_timestamp_random.txt)
    // Verwenden von microtime für eine höhere Einzigartigkeit
    $filename = $save_directory . 'question_' . uniqid() . '_' . time() . '.txt';
    
    $file_content = "Frage: " . $question_text . "\n";
    $file_content .= "Benutzer: " . $user . "\n";
    $file_content .= "Zeitstempel: " . $timestamp . "\n";

    if (file_put_contents($filename, $file_content)) {
        $response['success'] = true;
        $response['message'] = 'Frage erfolgreich gespeichert.';
    } else {
        $response['message'] = 'Fehler beim Schreiben der Frage in die Datei.';
    }
} else {
    $response['message'] = 'Ungültige Daten empfangen. Text, Benutzer oder Zeitstempel fehlen.';
}

echo json_encode($response);
?>