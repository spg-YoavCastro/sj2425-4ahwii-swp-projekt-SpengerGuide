// Function to navigate to a local page when a content box is clicked
function navigateToPage(page) {
    // Redirect to the specified local page
    window.location.href = page;
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