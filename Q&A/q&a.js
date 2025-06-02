// q&a.js

// Diese Funktion wird nicht direkt im HTML aufgerufen, sondern ist hier für den Fall, dass sie noch gebraucht wird.
// Der Login-Flow wird hauptsächlich über das Script im <head> der HTML-Datei gesteuert.
function Log() {
    window.location.href = "../Login/login.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const frageForm = document.getElementById('frageForm');
    const frageTextArea = document.getElementById('frage'); // Direkter Zugriff auf die Textarea
    const fragenListe = document.getElementById('fragen');

    /**
     * Ruft den aktuell eingeloggten Benutzernamen ab.
     * Versucht zuerst, ihn aus dem 'loginStatusDiv' zu extrahieren.
     * Wenn nicht gefunden, wird ein anonymer Name zurückgegeben.
     * @returns {string} Der Benutzername oder 'Anonym'.
     */
    function getLoggedInUserName() {
        const loginStatusDiv = document.getElementById('loginStatusDiv');
        if (loginStatusDiv) {
            const statusText = loginStatusDiv.textContent;
            const match = statusText.match(/Eingeloggt als (.+)/);
            if (match && match[1]) {
                return match[1].trim();
            }
        }
        return 'Anonym'; // Standardwert, wenn kein Benutzername gefunden werden kann
    }

    /**
     * Lädt Fragen vom Server und zeigt sie an.
     * Verwendet den korrigierten Pfad zum PHP-Skript.
     */
    function loadQuestions() {
        // Korrekter Pfad: q&a.js liegt in Q&A/, load_questions.php liegt in Q&A/questions/
        fetch('questions/load_questions.php')
            .then(response => {
                if (!response.ok) {
                    // Wenn der Server einen Fehlercode zurückgibt (z.B. 404, 500)
                    throw new Error(`Netzwerkantwort war nicht ok. Status: ${response.status}`);
                }
                return response.json(); // Versucht, die Antwort als JSON zu parsen
            })
            .then(questions => {
                fragenListe.innerHTML = ''; // Vorhandene Liste leeren

                if (questions.length === 0) {
                    fragenListe.innerHTML = `
                        <li class="col">
                            <div class="card p-4 text-center text-muted">
                                <p class="mb-0"><i class="bi bi-chat-dots-fill me-2"></i>Noch keine Fragen gestellt. Sei der Erste!</p>
                            </div>
                        </li>
                    `;
                    return;
                }

                // Fragen durchlaufen und anzeigen
                questions.forEach(q => {
                    const listItem = document.createElement('li');
                    listItem.className = 'col animate-fade-in';
                    listItem.innerHTML = `
                        <div class="card p-4 h-100">
                            <div class="d-flex w-100 justify-content-between align-items-start mb-2">
                                <h5 class="mb-0 question-text">${q.text}</h5>
                            </div>
                            <p class="mb-0 text-muted question-meta">
                                <small>
                                    <i class="bi bi-person-circle"></i> Gefragt von <span class="fw-bold">${q.user || 'Anonym'}</span>
                                </small>
                                <small class="ms-auto">
                                    <i class="bi bi-clock"></i> ${q.timestamp}
                                </small>
                            </p>
                        </div>
                    `;
                    fragenListe.prepend(listItem); // Neue Fragen oben hinzufügen
                });
            })
            .catch(error => {
                console.error("Fehler beim Laden der Fragen:", error);
                // Zeigt eine Fehlermeldung auf der Webseite an
                fragenListe.innerHTML = `
                    <li class="col">
                        <div class="card p-4 text-center text-danger">
                            <p class="mb-0"><i class="bi bi-exclamation-triangle-fill me-2"></i>Fehler beim Laden der Fragen vom Server: ${error.message}.</p>
                            <p class="mb-0"><small>Bitte überprüfe die Konsole für Details.</small></p>
                        </div>
                    </li>
                `;
            });
    }

    // Event-Listener für das Absenden des Formulars
    frageForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        const frageText = frageTextArea.value.trim(); // Trimmt Leerzeichen am Anfang/Ende

        if (frageText) {
            const now = new Date();
            const userName = getLoggedInUserName(); // Holt den Benutzernamen
            
            const newQuestion = {
                text: frageText,
                timestamp: now.toLocaleString('de-DE', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                user: userName
            };

            // Frage an den Server senden
            // Korrekter Pfad: q&a.js liegt in Q&A/, save_question.php liegt in Q&A/questions/
            fetch('save_question.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Wichtig, damit PHP den JSON-Body lesen kann
                },
                body: JSON.stringify(newQuestion), // Das Fragenobjekt als JSON senden
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Netzwerkantwort war nicht ok. Status: ${response.status}`);
                }
                return response.json(); // Erwarte eine JSON-Antwort vom Server
            })
            .then(data => {
                if (data.success) {
                    frageTextArea.value = ''; // Textarea leeren
                    loadQuestions(); // Fragen neu laden, um die neue Frage anzuzeigen
                } else {
                    console.error("Fehler beim Speichern der Frage auf dem Server:", data.message);
                    alert("Es gab ein Problem beim Speichern deiner Frage: " + (data.message || "Unbekannter Fehler."));
                }
            })
            .catch(error => {
                console.error("Fetch-Fehler beim Senden der Frage:", error);
                alert("Fehler beim Senden der Frage an den Server. Details in der Konsole.");
            });
        } else {
            alert('Bitte gib eine Frage ein, bevor du sie absendest.');
        }
    });

    // Initialer Ladevorgang der Fragen beim Laden der Seite
    loadQuestions();
});