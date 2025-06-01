function Log() {
    window.location.href = "../Login/login.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const frageForm = document.getElementById('frageForm');
    const fragenListe = document.getElementById('fragen'); // This now points to the <ul> element

    // Function to load questions (simulated)
    function loadQuestions() {
        const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        fragenListe.innerHTML = ''; // Clear existing list

        if (storedQuestions.length === 0) {
            fragenListe.innerHTML = `
                <li class="col">
                    <div class="card p-4 text-center text-muted">
                        <p class="mb-0"><i class="bi bi-chat-dots-fill me-2"></i>No questions asked yet. Be the first!</p>
                    </div>
                </li>
            `;
            return;
        }

        storedQuestions.forEach((q, index) => {
            const listItem = document.createElement('li');
            // Using Bootstrap grid classes for each question item
            listItem.className = 'col animate-fade-in'; // Each question will be a column in the row
            listItem.innerHTML = `
                <div class="card p-4 h-100"> <div class="d-flex w-100 justify-content-between align-items-start mb-2">
                        <h5 class="mb-0 question-text">${q.text}</h5>
                    </div>
                    <p class="mb-0 text-muted question-meta">
                        <small>
                            <i class="bi bi-person-circle"></i> Asked by <span class="fw-bold">${q.user || 'Anonymous'}</span>
                        </small>
                        <small class="ms-auto">
                            <i class="bi bi-clock"></i> ${q.timestamp}
                        </small>
                    </p>
                </div>
            `;
            fragenListe.prepend(listItem); // Add new questions at the top
        });
    }

    // Handle form submission
    frageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const frageText = document.getElementById('frage').value.trim();

        if (frageText) {
            const now = new Date();
            const newQuestion = {
                text: frageText,
                timestamp: now.toLocaleString('de-DE', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }), // German locale format
                user: 'Current User' // Replace with actual logged-in user's name
            };

            const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
            storedQuestions.push(newQuestion);
            localStorage.setItem('questions', JSON.stringify(storedQuestions));

            document.getElementById('frage').value = ''; // Clear textarea
            loadQuestions(); // Reload questions to show the new one
        }
    });

    // Initial load of questions when the page loads
    loadQuestions();
});

// The Log function from your original code was not used in the HTML and might be redundant
// if login is handled by the common script. Keeping it for completeness if needed elsewhere.
function Log() {
    window.location.href = "../Login/login.html";
}