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
