// 1. Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '🌓';
});

// 2. Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 3. Modal Content Data
const serviceData = {
    automation: {
        title: "Workflow Automation",
        body: "We use Python, Zapier, and AI agents to automate your CRM, email marketing, and data entry. Typical clients see a 40% reduction in operational costs."
    },
    software: {
        title: "Software Consultation",
        body: "From choosing between AWS and Azure to refactoring legacy code, our senior architects provide 1-on-1 strategy sessions."
    }
};

function openModal(type) {
    const modal = document.getElementById('serviceModal');
    document.getElementById('modalTitle').innerText = serviceData[type].title;
    document.getElementById('modalBody').innerText = serviceData[type].body;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('serviceModal').style.display = "none";
}

// Close modal if clicking outside the box
window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target == modal) modal.style.display = "none";
}

// 4. Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = document.getElementById('formFeedback');
    feedback.innerText = "Processing your request...";
    feedback.classList.remove('hidden');
    
    // Simulate API Call
    setTimeout(() => {
        feedback.innerText = "Thanks, " + document.getElementById('name').value + "! Our team will contact you shortly.";
        this.reset();
    }, 1500);
});