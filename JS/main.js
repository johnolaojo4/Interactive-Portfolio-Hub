// 1. Scroll for Navigation Links
document.querySelectorAll('.nav-links a, .btn-main').forEach(link => {
    link.addEventListener('click', function(e) {
        
        if (this.hash !== "") {
            const targetId = this.hash;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 2. Copy Email Function 
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