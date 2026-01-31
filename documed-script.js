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

// Image modal functionality
const images = [
    { src: 'screenshots/dash-documed.png', title: 'Dashboard' },
    { src: 'screenshots/patient-list.png', title: 'Patient List' },
    { src: 'screenshots/patient.png', title: 'Patient Details' },
    { src: 'screenshots/hospital.png', title: 'Hospital View' },
    { src: 'screenshots/users.png', title: 'User Management' },
    { src: 'screenshots/audit-logs.png', title: 'Audit Logs' }
];

let currentImageIndex = 0;

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    modal.classList.add('active');
    updateModalImage();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Loop around if at the ends
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    updateModalImage();
}

function updateModalImage() {
    const modalContent = document.querySelector('.modal-content');
    const currentImage = images[currentImageIndex];
    
    // Replace placeholder with actual image
    modalContent.innerHTML = `
        <img src="${currentImage.src}" 
             alt="${currentImage.title}" 
             style="max-width: 100%; max-height: 80vh; height: auto; width: auto; display: block; margin: 0 auto; border-radius: 8px; border: 2px solid rgba(100, 255, 218, 0.2); object-fit: contain;">
        <p style="text-align: center; color: var(--text-color); margin-top: 1rem; font-size: 1.2rem;">
            ${currentImage.title}
        </p>
    `;
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal.classList.contains('active')) {
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', function() {
    // Add initial animation state to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-item');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => cardsObserver.observe(card));
});

// Add hover effect to gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Prevent default behavior for project links if they're placeholder
document.querySelectorAll('.project-link, .project-button').forEach(link => {
    if (link.getAttribute('href') === '#') {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // You can add a notification or modal here
            console.log('This is a demo link');
        });
    }
});