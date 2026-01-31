document.getElementById('year').textContent = new Date().getFullYear();

const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const icon = modeToggle.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    icon.classList.remove('bx-sun');
    icon.classList.add('bx-moon');
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.remove('bx-moon');
        icon.classList.add('bx-sun');
        localStorage.setItem('theme', 'dark');
    }
});

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mouse spotlight effect on project cards
const projectCards = document.querySelectorAll('.project-card, .experience-item');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});