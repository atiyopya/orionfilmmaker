// Initialize Lucide Icons
lucide.createIcons();

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-links a');
const navLinks = document.querySelectorAll('.nav-links a');
const fadeElements = document.querySelectorAll('.fade-in-up');

// Sticky Navbar & Active Links
window.addEventListener('scroll', () => {
    // Navbar styling on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    // Special case for bottom of page to ensure Contact stays active
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        current = 'contact';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

closeMenuBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Intersection Observer for Scroll Animations
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Form Submission Prevention (For Demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i data-lucide="check"></i> Gönderildi!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
            lucide.createIcons();
        }, 3000);
    });
}

// Video Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = videoModal.querySelector('.modal-overlay');
    const videoFrame = document.getElementById('videoFrame');
    const videoLoading = document.getElementById('videoLoading');
    const modalDriveLink = document.getElementById('modalDriveLink');
    const playButtons = document.querySelectorAll('.btn-play');

    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.portfolio-card');
            const driveLinkObj = card.querySelector('.drive-link');
            if (!driveLinkObj) return;

            const driveUrl = driveLinkObj.href;
            const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);

            if (match && match[1]) {
                const fileId = match[1];
                // Show loading spinner
                videoLoading.classList.remove('hidden');
                // Set Drive fallback link
                modalDriveLink.href = driveUrl;
                // Set iframe source
                videoFrame.src = `https://drive.google.com/file/d/${fileId}/preview`;
                // Refresh icons for the new modal elements
                lucide.createIcons();
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Hide spinner when iframe loads
    videoFrame.addEventListener('load', () => {
        videoLoading.classList.add('hidden');
    });

    const closeVideoModal = () => {
        videoModal.classList.remove('active');
        videoFrame.src = ''; // Stop video playback
        videoLoading.classList.remove('hidden'); // Reset spinner for next time
        document.body.style.overflow = 'auto';
    };

    closeModalBtn.addEventListener('click', closeVideoModal);
    modalOverlay.addEventListener('click', closeVideoModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
});
