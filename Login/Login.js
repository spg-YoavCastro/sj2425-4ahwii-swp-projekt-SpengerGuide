// Passwort-Sichtbarkeit toggeln
document.getElementById("showPassword").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
});

// Login-Formular Handling
document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault(); // Standard-Formular-Submit verhindern
    
    // Loading-State (optional)
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Wird verarbeitet...";

    try {
        // Formulardaten sammeln
        const formData = new FormData(this);
        
        // Anfrage an den Server senden
        const response = await fetch(this.action, {
            method: "POST",
            body: formData
        });

        // JSON-Antwort verarbeiten
        const result = await response.json();

        // Erfolgsfall
        if (result.status === "success") {
            window.location.href = result.redirect; // Weiterleitung vom Server
        } 
        // Fehlerfall
        else {
            alert(`Fehler: ${result.message}`); // Klare Fehlermeldung
            
            // Optional: Fehler im UI anzeigen
            const errorElement = document.getElementById("login-error");
            if (errorElement) {
                errorElement.textContent = result.message;
            }
        }
    } catch (error) {
        console.error("Netzwerkfehler:", error);
        alert("Verbindung zum Server fehlgeschlagen");
    } finally {
        // Loading-State zurücksetzen
        submitBtn.disabled = false;
        submitBtn.textContent = "Login";
    }

// Im Erfolgsfall:
if (data.status === 'success') {
    if (data.login_update) {
        localStorage.setItem('isLoggedIn', 'true');
    }
    window.location.href = data.redirect;
}


});