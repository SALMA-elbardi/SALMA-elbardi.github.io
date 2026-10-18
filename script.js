/**
 * Portfolio Salma El Bardi - Data Engineering & IA
 * Interactive Behaviors & Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Mobile Drawer Navigation
    // --------------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // --------------------------------------------------------------------------
    // 2. Active Navigation on Scroll
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --------------------------------------------------------------------------
    // 3. Back to Top Button
    // --------------------------------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (!backToTopBtn) return;
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --------------------------------------------------------------------------
    // 4. Copy Email to Clipboard
    // --------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'salma.elbardi@example.com';
            try {
                await navigator.clipboard.writeText(email);
                copyEmailBtn.classList.add('copied');
                setTimeout(() => {
                    copyEmailBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                // Fallback for non-secure contexts
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                copyEmailBtn.classList.add('copied');
                setTimeout(() => {
                    copyEmailBtn.classList.remove('copied');
                }, 2000);
            }
        });
    }

    // --------------------------------------------------------------------------
    // 5. Contact Form Simulation
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formNotification = document.getElementById('form-notification');

    if (contactForm && formNotification) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name')?.value || 'Visiteur';
            
            formNotification.className = 'form-alert success';
            formNotification.style.display = 'block';
            formNotification.innerHTML = `Merci <strong>${name}</strong> ! Votre message a été préparé avec succès. Salma vous répondra sous 24h.`;

            contactForm.reset();

            setTimeout(() => {
                formNotification.style.display = 'none';
            }, 6000);
        });
    }
});
