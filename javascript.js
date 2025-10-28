// Language toggle functionality
document.getElementById('lang-toggle').addEventListener('click', function() {
    const currentLang = this.getAttribute('data-lang');
    const newLang = currentLang === 'cs' ? 'en' : 'cs';
    this.setAttribute('data-lang', newLang);
    this.textContent = newLang === 'cs' ? 'EN' : 'CS';
    document.documentElement.lang = newLang;

    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-' + newLang + ']');
    elements.forEach(el => {
        el.textContent = el.getAttribute('data-' + newLang);
    });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple email simulation (replace with actual backend integration)
    const mailtoLink = `mailto:info@moje-orisky.cz?subject=Contact from ${name}&body=Email: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = mailtoLink;

    // Reset form
    this.reset();
    alert('Zpráva byla odeslána! (Message sent!)');
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Lightbox: open clicked image in fullscreen overlay
(function() {
    // create lightbox elements
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
        <div class="box" role="dialog" aria-modal="true">
            <button class="close" aria-label="Close">✕</button>
            <img alt="" />
            <div class="caption" aria-hidden="false"></div>
        </div>
    `;
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('img');
    const lbCaption = lb.querySelector('.caption');
    const lbClose = lb.querySelector('.close');

    function openLightbox(src, alt) {
        lbImg.src = src;
        lbImg.alt = alt || '';
        lbCaption.textContent = alt || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
        lbClose.focus();
    }
    function closeLightbox() {
        lb.classList.remove('open');
        lbImg.src = '';
        document.body.style.overflow = '';
    }

    // close handlers
    lb.addEventListener('click', (e) => {
        if (e.target === lb) closeLightbox();
    });
    lbClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
    });

    // bind to thumbs (products, gallery and banner)
    function bindThumbs() {
        const thumbs = document.querySelectorAll('.product img, .gallery-grid img, .banner-thumb');
        thumbs.forEach(img => {
            img.style.touchAction = 'manipulation';
            img.addEventListener('click', () => openLightbox(img.src, img.alt));
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(img.src, img.alt);
                }
            });
            // make focusable for keyboard users
            img.tabIndex = 0;
        });
    }

    // initial bind and re-bind on DOM changes (basic)
    bindThumbs();
    const observer = new MutationObserver(bindThumbs);
    observer.observe(document.body, { childList: true, subtree: true });
})();