<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$questions = [];
// Korrigierter Lese-Pfad: Gehe einen Ordner nach oben.
// load_questions.php liegt in Q&A/questions/, die Fragen liegen in Q&A/.
$load_directory = '../'; 

if (file_exists($load_directory) && is_dir($load_directory)) {
    // Alle .txt-Dateien im übergeordneten Ordner (Q&A/) lesen
    // Annahme: Dateinamen beginnen mit 'question_'
    $files = glob($load_directory . 'question_*.txt'); 
    
    // Sortiere die Dateien nach Änderungsdatum, die neuesten zuerst (optional)
    usort($files, function($a, $b) {
        return filemtime($b) - filemtime($a);
    });

    foreach ($files as $file) {
        $content = file_get_contents($file);
        
        $lines = explode("\n", $content);
        $question_text = '';
        $user = '';
        $timestamp = '';

        foreach ($lines as $line) {
            if (str_starts_with($line, 'Frage: ')) {
                $question_text = trim(substr($line, strlen('Frage: ')));
            } elseif (str_starts_with($line, 'Benutzer: ')) {
                $user = trim(substr($line, strlen('Benutzer: ')));
            } elseif (str_starts_with($line, 'Zeitstempel: ')) {
                $timestamp = trim(substr($line, strlen('Zeitstempel: ')));
            }
        }

        if ($question_text) { // Füge die Frage nur hinzu, wenn Text vorhanden ist
            $questions[] = [
                'text' => $question_text,
                'user' => $user,
                'timestamp' => $timestamp
            ];
        }
    }
} else {
    // Optional: Logge eine Fehlermeldung, wenn der Ordner nicht gefunden wird
    error_log("Der Fragenordner '$load_directory' wurde nicht gefunden oder ist kein Verzeichnis.");
}

echo json_encode($questions);
?>