// --- Navigation & Theme ---
function scrollToSection(id) {
    const target = document.getElementById(id);
    const navHeight = 75;
    window.scrollTo({
        top: target.offsetTop - navHeight,
        behavior: 'smooth'
    });
}

document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('light-theme');
};

// --- Project Estimator ---
const checks = document.querySelectorAll('.service-check');
const totalDisplay = document.getElementById('total-price');

checks.forEach(c => {
    c.onchange = () => {
        let total = 0;
        checks.forEach(check => {
            if(check.checked) total += parseInt(check.dataset.price);
        });
        totalDisplay.innerText = `$${total.toLocaleString()}`;
    };
});

// --- Appointment System ---
const slots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];
const slotBox = document.getElementById('time-slots');
const bookBtn = document.getElementById('book-btn');

slots.forEach(time => {
    const div = document.createElement('div');
    div.className = 'slot';
    div.innerText = time;
    div.onclick = () => {
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
        div.classList.add('selected');
        bookBtn.disabled = false;
    };
    slotBox.appendChild(div);
});

bookBtn.onclick = () => {
    document.getElementById('success-overlay').classList.remove('hidden');
};

function closeSuccess() {
    document.getElementById('success-overlay').classList.add('hidden');
}

// --- Service Modals ---
const modalData = {
    automation: { title: "Workflow Automation", body: "We use high-level Python scripts and AI triggers to automate redundant data entry, email filtering, and CRM updates." },
    software: { title: "Software Consultation", body: "Our senior architects analyze your current tech stack to identify vulnerabilities, scalability issues, and cost-saving migrations." },
    digital: { title: "Digital Solutions", body: "From SaaS platforms to complex portals, we build responsive, lightning-fast digital environments." }
};

function openModal(id) {
    document.getElementById('modalTitle').innerText = modalData[id].title;
    document.getElementById('modalBody').innerText = modalData[id].body;
    document.getElementById('serviceModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

// Close modal if clicking background
window.onclick = (e) => {
    if(e.target == document.getElementById('serviceModal')) closeModal();
};

// --- Live Chat ---
function toggleChat() {
    document.getElementById('chat-widget').classList.toggle('chat-closed');
    document.getElementById('chat-body').classList.toggle('hidden');
}

function sendChat(e) {
    e.stopPropagation();
    const input = document.getElementById('chat-input');
    const history = document.getElementById('chat-history');
    if(!input.value) return;

    history.innerHTML += `<div class="message user">${input.value}</div>`;
    const val = input.value.toLowerCase();
    input.value = "";

    setTimeout(() => {
        let res = "That's great! One of our engineers will jump in soon.";
        if(val.includes("price") || val.includes("cost")) res = "Small projects start at $500. Check the estimator above!";
        history.innerHTML += `<div class="message bot">${res}</div>`;
        history.scrollTop = history.scrollHeight;
    }, 1000);
}
