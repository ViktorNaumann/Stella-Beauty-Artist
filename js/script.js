// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// Video play functionality
document.querySelectorAll('.video-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        const video = overlay.parentElement.querySelector('video');
        if (video) {
            video.play();
            overlay.style.display = 'none';
            video.setAttribute('controls', 'true');
        }
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const email = formData.get('email');
    const service = formData.get('service');
    const appointmentDate = formData.get('appointmentDate');
    const message = formData.get('message');
    
    // Basic validation
    if (!firstname || !lastname || !email || !service || !message) {
        showNotification('Bitte fülle alle Pflichtfelder aus.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Bitte gib eine gültige E-Mail-Adresse ein.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Nachricht wird gesendet...', 'info');
    
    // Here you would normally send the data to your server
    setTimeout(() => {
        showNotification('Vielen Dank für deine Nachricht! Ich melde mich bald bei dir.', 'success');
        contactForm.reset();
    }, 2000);
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add slide-in animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Enhanced Intersection Observer for scroll animations
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add the appropriate animation class based on element's data attribute
            const animationType = element.getAttribute('data-animate') || 'fade-in-up';
            element.classList.add(animationType);
            
            // Add delay classes for staggered animations
            const delay = element.getAttribute('data-delay');
            if (delay) {
                element.classList.add(`animate-delay-${delay}`);
            }
            
            // Unobserve after animation starts to improve performance
            scrollAnimationObserver.unobserve(element);
            
            // Clean up will-change property after animation completes
            setTimeout(() => {
                element.style.willChange = 'auto';
            }, 1000);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

// Enhanced scroll animation system
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll(`
        .about-text,
        .about-image,
        .service-card,
        .gallery-item:not(.certificate-card),
        .contact-info,
        .contact-form,
        .hero-highlights .highlight-item,
        .trust-elements .trust-item,
        .quote,
        .certificates-grid .certificate-card
    `);
    
    elementsToAnimate.forEach((element, index) => {
        // Skip elements that should not animate (logo, slideshow images, etc.)
        if (element.closest('.nav-logo') || 
            element.classList.contains('slideshow-image') ||
            element.closest('#heroSlideshow')) {
            return;
        }
        
        // Add base animation class
        element.classList.add('scroll-animate');
        
        // Determine animation type based on element type and position
        let animationType = 'fade-in-up';
        
        // Special animation types for different elements
        if (element.classList.contains('about-text')) {
            animationType = 'fade-in-left';
        } else if (element.classList.contains('about-image')) {
            animationType = 'fade-in-right';
        } else if (element.classList.contains('contact-info')) {
            animationType = 'fade-in-left';
        } else if (element.classList.contains('contact-form')) {
            animationType = 'fade-in-right';
        } else if (element.classList.contains('quote')) {
            animationType = 'scale-in';
        } else if (element.classList.contains('highlight-item') || 
                   element.classList.contains('trust-item')) {
            animationType = 'fade-in-up';
            // Add staggered delays for highlight items
            const delay = (index % 3) + 1;
            element.setAttribute('data-delay', delay);
        }
        
        element.setAttribute('data-animate', animationType);
        scrollAnimationObserver.observe(element);
    });
    
    // Special handling for service cards with staggered animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        card.setAttribute('data-animate', 'fade-in-up');
        card.setAttribute('data-delay', (index + 1));
        scrollAnimationObserver.observe(card);
    });
    
    // Special handling for gallery items with alternating animations
    const galleryItems = document.querySelectorAll('.gallery-item:not(.certificate-card)');
    galleryItems.forEach((item, index) => {
        item.classList.add('scroll-animate');
        
        // Alternate between left and right animations
        const animationType = index % 2 === 0 ? 'fade-in-left' : 'fade-in-right';
        item.setAttribute('data-animate', animationType);
        
        // Add slight delay for staggered effect
        const delayGroup = Math.floor(index / 2) + 1;
        if (delayGroup <= 5) {
            item.setAttribute('data-delay', delayGroup);
        }
        
        scrollAnimationObserver.observe(item);
    });
    
    // Certificate cards with special scale animation
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        card.setAttribute('data-animate', 'scale-in');
        
        // Staggered delays for certificates
        const delay = (index % 5) + 1;
        card.setAttribute('data-delay', delay);
        
        scrollAnimationObserver.observe(card);
    });
});

// Before/After hover effect
document.querySelectorAll('.before-after-container').forEach(container => {
    container.addEventListener('mouseenter', () => {
        const after = container.querySelector('.after');
        after.style.transform = 'translateX(0)';
    });
    
    container.addEventListener('mouseleave', () => {
        const after = container.querySelector('.after');
        after.style.transform = 'translateX(0)';
    });
});

// Form input animations
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value) {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    });
    
    // Handle select fields differently
    if (input.tagName === 'SELECT') {
        input.addEventListener('change', () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    }
});

// Lazy loading for images (simple implementation)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Skip slideshow images - they have their own opacity control
                if (img.classList.contains('slideshow-image')) {
                    imageObserver.unobserve(img);
                    return;
                }
                
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        // Skip slideshow images from lazy loading
        if (!img.classList.contains('slideshow-image')) {
            imageObserver.observe(img);
        }
    });
});

// Active navigation highlight based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading screen (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Hero Slideshow für vorhandene Bilder
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slideshow-image');
    const dots = document.querySelectorAll('.dot');
    const slideshowContainer = document.getElementById('heroSlideshow');
    let currentSlide = 0;
    let autoSlideInterval;
    
    if (images.length === 0 || dots.length === 0) return;

    function showSlide(index) {
        // Entferne active-Klasse von allen Bildern und Dots
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Setze neues aktives Bild und Dot
        images[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % images.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        showSlide(currentSlide);
    }

    // Dots klickbar machen
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Automatischer Wechsel alle 2 Sekunden
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 2000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    // Touch/Swipe functionality für Hero Slideshow
    if (slideshowContainer) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        slideshowContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        slideshowContainer.addEventListener('touchmove', function(e) {
            const currentX = e.changedTouches[0].screenX;
            const currentY = e.changedTouches[0].screenY;
            const diffX = currentX - touchStartX;
            const diffY = currentY - touchStartY;
            
            // Nur horizontales Swipen ermöglichen
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
            }
        }, { passive: false });

        slideshowContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            // Minimum Swipe-Distanz
            const minSwipeDistance = 50;
            
            // Horizontales Swipen erkennen
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    // Swipe nach rechts - vorheriges Bild
                    prevSlide();
                } else {
                    // Swipe nach links - nächstes Bild
                    nextSlide();
                }
                // Auto-Slide Timer zurücksetzen nach manuellem Wischen
                resetAutoSlide();
            }
        });

        // Mouse/Desktop Swipe support (optional)
        let mouseDown = false;
        let mouseStartX = 0;

        slideshowContainer.addEventListener('mousedown', function(e) {
            mouseDown = true;
            mouseStartX = e.clientX;
            slideshowContainer.style.cursor = 'grabbing';
        });

        slideshowContainer.addEventListener('mousemove', function(e) {
            if (!mouseDown) return;
            e.preventDefault();
        });

        slideshowContainer.addEventListener('mouseup', function(e) {
            if (!mouseDown) return;
            mouseDown = false;
            slideshowContainer.style.cursor = 'grab';
            
            const diffX = e.clientX - mouseStartX;
            const minSwipeDistance = 50;
            
            if (Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                resetAutoSlide();
            }
        });

        slideshowContainer.addEventListener('mouseleave', function() {
            if (mouseDown) {
                mouseDown = false;
                slideshowContainer.style.cursor = 'grab';
            }
        });

        // Cursor-Stil setzen
        slideshowContainer.style.cursor = 'grab';
    }
});

// Contact form field focus effects
document.querySelectorAll('.form-group').forEach(group => {
    const input = group.querySelector('input, textarea, select');
    const label = group.querySelector('label');
    
    if (input) {
        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            group.classList.remove('focused');
            if (!input.value) {
                group.classList.remove('filled');
            } else {
                group.classList.add('filled');
            }
        });
    }
});

// Social media link tracking (for analytics)
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // You can add analytics tracking here
        console.log('Social media link clicked:', link.href);
    });
});

// Gallery image modal (basic lightbox)
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        openLightbox(img.src, img.alt);
    });
});

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const image = lightbox.querySelector('img');
    image.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.remove();
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.parentElement) {
            lightbox.remove();
        }
    });
}

// Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const currentIndexSpan = document.getElementById('currentIndex');
    const totalCertificatesSpan = document.getElementById('totalCertificates');
    
    let currentCertificateIndex = 0;
    const certificateImages = [];
    
    // Collect all certificate images
    certificateCards.forEach((card, index) => {
        const img = card.querySelector('img');
        if (img) {
            certificateImages.push({
                src: img.src,
                alt: img.alt || `Zertifikat ${index + 1}`
            });
        }
    });

    // Set total certificates count
    if (totalCertificatesSpan) {
        totalCertificatesSpan.textContent = certificateImages.length;
    }

    // Function to show certificate at specific index
    function showCertificate(index) {
        if (index < 0) index = certificateImages.length - 1;
        if (index >= certificateImages.length) index = 0;
        
        currentCertificateIndex = index;
        
        if (modalImg && certificateImages[index]) {
            modalImg.src = certificateImages[index].src;
            modalImg.alt = certificateImages[index].alt;
        }
        
        if (currentIndexSpan) {
            currentIndexSpan.textContent = index + 1;
        }
    }

    // Add click event to each certificate card
    certificateCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (modal && modalImg) {
                currentCertificateIndex = index;
                showCertificate(index);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable body scrolling
        });
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                showCertificate(currentCertificateIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showCertificate(currentCertificateIndex + 1);
            }
        }
    });

    // Touch/Swipe functionality for mobile
    if (modal && modalImg) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        let isDragging = false;

        modalImg.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isDragging = false;
        });

        modalImg.addEventListener('touchmove', function(e) {
            isDragging = true;
            const currentX = e.changedTouches[0].screenX;
            const currentY = e.changedTouches[0].screenY;
            const diffX = currentX - touchStartX;
            const diffY = currentY - touchStartY;
            
            // Verhindere Standard-Scrolling
            e.preventDefault();
            
            // Visuelles Feedback beim Swipen
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontales Swipen - für Navigation zwischen Zertifikaten
                modalImg.style.transform = `translateX(${diffX * 0.5}px)`;
            } else {
                // Vertikales Swipen - für Schließen
                modalImg.style.transform = `translateY(${diffY * 0.5}px)`;
                // Opacity verringern beim nach unten/oben ziehen
                const opacity = Math.max(0.3, 1 - Math.abs(diffY) / 500);
                modalImg.style.opacity = opacity;
            }
            modalImg.style.transition = 'none';
        }, { passive: false });

        modalImg.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            // Minimum Swipe-Distanz
            const minSwipeDistance = 70;
            
            // Bestimme ob horizontales oder vertikales Swipen
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontales Swipen - durch Zertifikate navigieren
                if (Math.abs(diffX) > minSwipeDistance) {
                    modalImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                    
                    if (diffX > 0) {
                        // Swipe nach rechts - vorheriges Zertifikat
                        modalImg.style.transform = 'translateX(100%)';
                        modalImg.style.opacity = '0';
                        
                        setTimeout(() => {
                            showCertificate(currentCertificateIndex - 1);
                            modalImg.style.transition = 'none';
                            modalImg.style.transform = 'translateX(-100%)';
                            modalImg.style.opacity = '0';
                            
                            setTimeout(() => {
                                modalImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                                modalImg.style.transform = 'translateX(0)';
                                modalImg.style.opacity = '1';
                            }, 50);
                        }, 300);
                    } else {
                        // Swipe nach links - nächstes Zertifikat
                        modalImg.style.transform = 'translateX(-100%)';
                        modalImg.style.opacity = '0';
                        
                        setTimeout(() => {
                            showCertificate(currentCertificateIndex + 1);
                            modalImg.style.transition = 'none';
                            modalImg.style.transform = 'translateX(100%)';
                            modalImg.style.opacity = '0';
                            
                            setTimeout(() => {
                                modalImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                                modalImg.style.transform = 'translateX(0)';
                                modalImg.style.opacity = '1';
                            }, 50);
                        }, 300);
                    }
                } else {
                    // Zu kurzer Swipe - zurück zur ursprünglichen Position
                    modalImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                    modalImg.style.transform = 'translateX(0)';
                    modalImg.style.opacity = '1';
                }
            } else {
                // Vertikales Swipen - Modal schließen
                if (Math.abs(diffY) > minSwipeDistance) {
                    modalImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                    
                    if (diffY > 0) {
                        // Swipe nach unten - Modal schließen
                        modalImg.style.transform = 'translateY(100vh)';
                    } else {
                        // Swipe nach oben - Modal schließen
                        modalImg.style.transform = 'translateY(-100vh)';
                    }
                    
                    modalImg.style.opacity = '0';
                    
                    // Modal nach Animation schließen
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        // Reset transform
                        modalImg.style.transform = 'translateY(0)';
                        modalImg.style.opacity = '1';
                        modalImg.style.transition = '';
                    }, 300);
                } else {
                    // Zu kurzer Swipe - zurück zur ursprünglichen Position
                    modalImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                    modalImg.style.transform = 'translateY(0)';
                    modalImg.style.opacity = '1';
                }
            }
        });
    }
});


