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

