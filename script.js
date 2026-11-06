
/**
 * Portfolio Salma El Bardi - Data Engineering & IA
 * Interactive Behaviors & Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
    const rootHtml = document.documentElement;

    // --------------------------------------------------------------------------
    // 0. Translation System & Language Switcher (FR / EN)
    // --------------------------------------------------------------------------
    const TRANSLATIONS = {
        fr: {
            pageTitle: "Salma El Bardi | Élève Ingénieure en Data Science & Intelligence Artificielle",
            metaDesc: "Portfolio de Salma El Bardi - Élève ingénieure en 5ᵉ année à l'ENSA Fès. Data Science, Machine Learning, Data Engineering et IA. À la recherche d'un stage PFE.",
            themeDarkTitle: "Passer en mode sombre",
            themeLightTitle: "Passer en mode clair",
            copyEmailTitle: "Copier l'adresse email",
            backToTopAria: "Retour en haut de page",
            mobileMenuOpenAria: "Ouvrir le menu",
            mobileMenuCloseAria: "Fermer le menu",
            contactSuccess: (name) => `Merci <strong>${name}</strong> ! Votre message a été préparé avec succès. Salma vous répondra sous 24h.`
        },
        en: {
            pageTitle: "Salma El Bardi | Data Science & AI Student Engineer",
            metaDesc: "Portfolio of Salma El Bardi - 5th-year engineering student at ENSA Fez. Data Science, Machine Learning, Data Engineering, and AI. Seeking a graduation internship (PFE).",
            themeDarkTitle: "Switch to dark mode",
            themeLightTitle: "Switch to light mode",
            copyEmailTitle: "Copy email address",
            backToTopAria: "Back to top",
            mobileMenuOpenAria: "Open menu",
            mobileMenuCloseAria: "Close menu",
            contactSuccess: (name) => `Thank you <strong>${name}</strong>! Your message has been prepared successfully. Salma will reply within 24h.`
        }
    };

    let currentLang = 'fr'; // French is default
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    function applyLanguage(lang) {
        currentLang = (lang === 'en') ? 'en' : 'fr';
        rootHtml.setAttribute('lang', currentLang);

        // Persist language choice in localStorage
        try {
            localStorage.setItem('portfolio_lang', currentLang);
        } catch (e) {
            // Ignore if localStorage unavailable
        }

        // 1. Update active state of pill switch buttons
        langButtons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === currentLang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });

        // 2. Translate all elements marked with data-fr and data-en
        document.querySelectorAll('[data-fr][data-en]').forEach(el => {
            const translation = el.getAttribute(`data-${currentLang}`);
            if (translation !== null) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });

        // 3. Translate input / textarea placeholders marked with data-fr-placeholder and data-en-placeholder
        document.querySelectorAll('[data-fr-placeholder][data-en-placeholder]').forEach(el => {
            const placeholder = el.getAttribute(`data-${currentLang}-placeholder`);
            if (placeholder) {
                el.placeholder = placeholder;
            }
        });

        // 4. Update dynamic links (href) based on active language (e.g. CVs)
        document.querySelectorAll('[data-fr-href][data-en-href]').forEach(el => {
            const href = el.getAttribute(`data-${currentLang}-href`);
            if (href) {
                el.setAttribute('href', href);
            }
        });

        // 5. Update dynamic download filenames based on active language
        document.querySelectorAll('[data-fr-download][data-en-download]').forEach(el => {
            const download = el.getAttribute(`data-${currentLang}-download`);
            if (download) {
                el.setAttribute('download', download);
            }
        });

        // 6. Update document title and meta description
        if (TRANSLATIONS[currentLang]) {
            document.title = TRANSLATIONS[currentLang].pageTitle;
            const metaDescEl = document.querySelector('meta[name="description"]');
            if (metaDescEl) {
                metaDescEl.setAttribute('content', TRANSLATIONS[currentLang].metaDesc);
            }

            // Update Theme button label based on language
            const isLight = rootHtml.classList.contains('light');
            if (themeToggleBtn) {
                const themeTitle = isLight ? TRANSLATIONS[currentLang].themeDarkTitle : TRANSLATIONS[currentLang].themeLightTitle;
                themeToggleBtn.setAttribute('title', themeTitle);
                themeToggleBtn.setAttribute('aria-label', themeTitle);
            }

            // Update Copy email button
            const copyEmailBtn = document.getElementById('copy-email-btn');
            if (copyEmailBtn) {
                copyEmailBtn.setAttribute('title', TRANSLATIONS[currentLang].copyEmailTitle);
                copyEmailBtn.setAttribute('aria-label', TRANSLATIONS[currentLang].copyEmailTitle);
            }

            // Update back to top button
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                backToTopBtn.setAttribute('aria-label', TRANSLATIONS[currentLang].backToTopAria);
            }
        }
    }

    // Attach click listeners to language switch buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang && selectedLang !== currentLang) {
                applyLanguage(selectedLang);
            }
        });
    });

    // Default behavior: French ("FR") by default, or restore previous user preference
    const savedLang = localStorage.getItem('portfolio_lang');
    applyLanguage(savedLang === 'en' ? 'en' : 'fr');

    // --------------------------------------------------------------------------
    // 1. Theme Switcher (Dark / Light Mode)
    // --------------------------------------------------------------------------
    function applyTheme(theme) {
        if (theme === 'light') {
            rootHtml.classList.remove('dark');
            rootHtml.classList.add('light');
            localStorage.setItem('theme', 'light');
            if (themeToggleBtn) {
                const title = currentLang === 'en' ? 'Switch to dark mode' : 'Passer en mode sombre';
                themeToggleBtn.setAttribute('title', title);
                themeToggleBtn.setAttribute('aria-label', title);
            }
        } else {
            rootHtml.classList.remove('light');
            rootHtml.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            if (themeToggleBtn) {
                const title = currentLang === 'en' ? 'Switch to light mode' : 'Passer en mode clair';
                themeToggleBtn.setAttribute('title', title);
                themeToggleBtn.setAttribute('aria-label', title);
            }
        }
    }

    // Initialize button state based on current active class
    const initialTheme = rootHtml.classList.contains('light') ? 'light' : 'dark';
    applyTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyLight = rootHtml.classList.contains('light');
            applyTheme(isCurrentlyLight ? 'dark' : 'light');
        });
    }

    // --------------------------------------------------------------------------
    // 2. Mobile Drawer Navigation
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
    // 3. Active Navigation on Scroll
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
    // 4. Back to Top Button
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
    // 5. Copy Email to Clipboard
    // --------------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'salma15bardi@gmail.com';
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
    // 6. Contact Form Simulation
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formNotification = document.getElementById('form-notification');

    if (contactForm && formNotification) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fallbackName = currentLang === 'en' ? 'Visitor' : 'Visiteur';
            const name = document.getElementById('form-name')?.value || fallbackName;

            formNotification.className = 'form-alert success';
            formNotification.style.display = 'block';
            if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].contactSuccess) {
                formNotification.innerHTML = TRANSLATIONS[currentLang].contactSuccess(name);
            } else {
                formNotification.innerHTML = `Merci <strong>${name}</strong> ! Votre message a été préparé avec succès. Salma vous répondra sous 24h.`;
            }

            contactForm.reset();

            setTimeout(() => {
                formNotification.style.display = 'none';
            }, 6000);
        });
    }
});
