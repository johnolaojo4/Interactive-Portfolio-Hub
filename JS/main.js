// 1. Copy Email Function 
function copyEmail() {
    const email = "johnoalojoo4@gmail.com"; 
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.querySelector('.btn-dark');
        const originalText = btn.innerText;
        
        btn.innerText = "Email Copied!";
        btn.style.backgroundColor = "#2ecc71"; 
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "#111";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// 2. Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll("header, section, footer");
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
        if (current && link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// 3. Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/**
 * Global History Manager
 * Syncs calculations across all calculator sub-projects
 */

// Function to add a calculation to the global list
function saveToGlobalHistory(type, result) {
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    
    const newEntry = {
        type: type, // e.g., "Scientific", "BMI"
        content: result,
        timestamp: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Keep last 5 entries for preview
    history.unshift(newEntry);
    if (history.length > 5) history.pop();

    localStorage.setItem('calcHistory', JSON.stringify(history));
}

// Function to render the history on the Hub page
function renderGlobalHistory() {
    const list = document.getElementById('global-history-list');
    if (!list) return;

    const history = JSON.parse(localStorage.getItem('calcHistory')) || [];

    if (history.length === 0) {
        list.innerHTML = '<li class="empty-msg">No recent calculations.</li>';
        return;
    }

    list.innerHTML = history.map(item => `
        <li class="history-item" style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
            <span><strong>${item.type}:</strong> ${item.content}</span>
            <span style="color: var(--text-muted); font-size: 0.8rem;">${item.timestamp}</span>
        </li>
    `).join('');
}

// Initialize on Hub load
document.addEventListener('DOMContentLoaded', renderGlobalHistory);