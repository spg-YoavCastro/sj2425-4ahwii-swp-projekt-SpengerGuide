//todo: replace this with actual authentification logic
let isLoggedIn = true;

window.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('navbarLoginElement');
    const logoutButton = document.getElementById('navbarLogoutElement');

    //if user is logged in, hide the "Login" button in the navbar; if not, hide "Abmelden"
    if (isLoggedIn) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
});


// Function to navigate to a local page when a content box is clicked
function navigateToPage(page) {
    // Redirect to the specified local page
    window.location.href = page;
}

function Log() {
    window.location.href = "Login/login.html";
}

// For the arrow navigation (cycling content boxes)
let currentContentIndex = 0;
const contentBoxes = document.querySelectorAll('.center-box'); // Get all content boxes

// Hide all content boxes except the one being displayed
function showContent(index) {
    contentBoxes.forEach((box, i) => {
        if (i === index) {
            box.style.display = 'block'; // Show the current content box
        } else {
            box.style.display = 'none'; // Hide the others
        }
    });
}

// Show the next content box
function nextContent() {
    currentContentIndex = (currentContentIndex + 1) % contentBoxes.length; // Cycle forward
    showContent(currentContentIndex);
}

// Show the previous content box
function prevContent() {
    currentContentIndex = (currentContentIndex - 1 + contentBoxes.length) % contentBoxes.length; // Cycle backward
    showContent(currentContentIndex);
}

// Initialize with the first content box
showContent(currentContentIndex);




//code for background
const backgroundImages = {
    animation: '/images/testBackgroundImg_Animation.jpg',
    betriebsinformatik: '/images/testBackgroundImg_Animation.jpg',
    gamedesign: '/images/testBackgroundImg_Animation.jpg',
    informatik: '/images/testBackgroundImg_Animation.jpg',
    fachschule: '/images/testBackgroundImg_Animation.jpg',
    interiordesign: '/images/testBackgroundImg_Animation.jpg',
    medizininformatik: '/images/testBackgroundImg_Animation.jpg',
    technischesManagement: '/images/testBackgroundImg_Animation.jpg',
};

let currentIndex = 0; // Start at the first center-box
const centerBoxes = document.querySelectorAll('.center-box'); // Get all center-box elements
const contentSection = document.getElementById('content-section'); // The section to update the background

// Update the visible center-box and background image
function updateContent() {
    // Loop through all center-boxes to toggle visibility
    centerBoxes.forEach((box, index) => {
        if (index === currentIndex) {
            // Show the active box
            box.classList.remove('hidden-left', 'hidden-right');
            box.style.display = 'flex'; // Ensure it's visible
        } else {
            // Hide the inactive boxes based on direction
            box.classList.add(index < currentIndex ? 'hidden-left' : 'hidden-right');
            box.style.display = 'none'; // Ensure it's hidden
        }
    });

    // Update the background image based on the active center-box
    const currentBoxId = centerBoxes[currentIndex].id;
    contentSection.style.backgroundImage = `url('${backgroundImages[currentBoxId]}')`;
    contentSection.style.backgroundSize = 'cover';
    contentSection.style.backgroundPosition = 'center';
}

// Navigate to the next content
function nextContent() {
    currentIndex = (currentIndex + 1) % centerBoxes.length; // Increment index, wrap around
    updateContent();
}

// Navigate to the previous content
function prevContent() {
    currentIndex = (currentIndex - 1 + centerBoxes.length) % centerBoxes.length; // Decrement index, wrap around
    updateContent();
}

// Initialize the first view
updateContent();

<script>
// Login-Status prüfen
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('navbarLoginElement');
    const logoutBtn = document.getElementById('navbarLogoutElement');
    
    // Initial: Logout ausblenden
    if (logoutBtn) logoutBtn.style.display = 'none';
    
    // Prüfe Session-Status via AJAX
    fetch('/Spengerguide/Login/session_status.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                if (loginBtn) loginBtn.style.display = 'none';
                if (logoutBtn) logoutBtn.style.display = 'block';
                
                const statusDiv = document.createElement('div');
                statusDiv.innerHTML = `
                    <span style="color: green; margin-right: 15px;">
                        <i class="bi bi-person-check"></i> Eingeloggt als ${data.user_name}
                    </span>`;
                
                const navbar = document.querySelector('.navbar');
                if (navbar) navbar.prepend(statusDiv);
            }
        });
});

// Logout-Funktion
if (document.getElementById('navbarLogoutElement')) {
    document.getElementById('navbarLogoutElement').onclick = function() {
        fetch('/Spengerguide/Login/logout.php')
            .then(() => window.location.reload());
    };
}
</script>