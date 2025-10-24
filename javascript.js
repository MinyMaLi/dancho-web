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