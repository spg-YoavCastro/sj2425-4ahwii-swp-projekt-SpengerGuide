// Passwort-Sichtbarkeit toggeln
document.getElementById("showPassword").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
});

// Formular-Validierung
document.querySelector("form").addEventListener("submit", function(e) {
    if (!this.checkValidity()) {
        e.preventDefault();
        alert("Bitte füllen Sie alle Felder aus!");
    }
});