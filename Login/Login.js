function Reg()
{
    window.location.href = "../Signup/signup.html";
}

function pwzeigen() {
    let pw = document.getElementById("password");


    if (pw.type === "text") {
        pw.type = "password";
        
    } else {
        pw.type = "text";
    }
}


function Log() {
    window.location.href = "../index.html"; // Provisorische Funktion bis Luka DB verknüpft
}