document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 0. Splash Loader Fade-out
    // ==========================================
    const splashLoader = document.getElementById('splash-loader');
    if (splashLoader) {
        setTimeout(() => {
            splashLoader.classList.add('fade-out');
        }, 2500);
    }

    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('.navbar');

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('open');
            mobileToggle.classList.toggle('active');
            
            // Toggle hamburger icon animation states
            const bars = mobileToggle.querySelectorAll('.bar');
            if (mobileToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('open');
                mobileToggle.classList.remove('active');
                const bars = mobileToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // ==========================================
    // 2. Count-Up Stats Animation (Intersection Observer)
    // ==========================================
    const statItems = document.querySelectorAll('.stat-item');
    
    const startCountAnimation = (element, targetValue) => {
        let currentValue = 0;
        const duration = 1500; // Total count-up duration in ms
        const stepTime = Math.max(Math.floor(duration / targetValue), 15);
        const increment = targetValue > 100 ? Math.ceil(targetValue / 100) : 1;
        const numberElement = element.querySelector('.stat-number');

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            numberElement.textContent = currentValue;
        }, stepTime);
    };

    // Run statistical count-up right after splash screen fades out (2.6 seconds)
    setTimeout(() => {
        statItems.forEach(item => {
            const targetValue = parseInt(item.getAttribute('data-target'), 10);
            startCountAnimation(item, targetValue);
        });
    }, 2600);



    // ==========================================
    // 6. Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch form data fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation check
            if (!name || !email || !message) {
                formFeedback.textContent = 'Please fill out all required fields.';
                formFeedback.className = 'form-feedback error';
                return;
            }

            // Simulate form submission status
            formFeedback.textContent = 'Submitting message... Please wait.';
            formFeedback.className = 'form-feedback';
            formFeedback.style.display = 'block';

            setTimeout(() => {
                formFeedback.textContent = `Thank you, ${name}! Your inquiry regarding '${subject}' has been simulated successfully. We'll be in touch soon.`;
                formFeedback.className = 'form-feedback success';
                contactForm.reset();
            }, 1000);
        });
    }

    // ==========================================
    // 6. Instagram Scroller Indicator & Navigation
    // ==========================================
    const scrollers = document.querySelectorAll('.facility-gallery-scroller');
    scrollers.forEach(scroller => {
        const track = scroller.querySelector('.gallery-track');
        const dots = scroller.querySelectorAll('.indicator-dot');
        const prevBtn = scroller.querySelector('.prev-btn');
        const nextBtn = scroller.querySelector('.next-btn');
        
        if (track) {
            if (dots.length > 0) {
                track.addEventListener('scroll', () => {
                    const scrollPos = track.scrollLeft;
                    const width = track.offsetWidth;
                    const activeIndex = Math.round(scrollPos / width);
                    
                    dots.forEach((dot, index) => {
                        if (index === activeIndex) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                });
            }
            
            if (prevBtn && nextBtn) {
                nextBtn.addEventListener('click', () => {
                    track.scrollLeft += track.offsetWidth;
                });
                
                prevBtn.addEventListener('click', () => {
                    track.scrollLeft -= track.offsetWidth;
                });
            }
        }
    });

    // ==========================================
    // 7. Gallery Lightbox Modal
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        // Create modal elements dynamically
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <span class="modal-close">&times;</span>
            <img class="modal-content" src="" alt="Enlarged Image">
            <div class="modal-caption"></div>
        `;
        document.body.appendChild(modal);
        
        const modalImg = modal.querySelector('.modal-content');
        const modalCaption = modal.querySelector('.modal-caption');
        const modalClose = modal.querySelector('.modal-close');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                modal.classList.add('active');
                modalImg.src = img.src;
                modalCaption.textContent = img.alt;
            });
        });
        
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 8. Interactive Timeline Events & Details
    // ==========================================
    const hiddenItems = document.querySelectorAll('.timeline-item.hidden-event');
    const toggleTimelineBtn = document.getElementById('btn-toggle-timeline');
    if (toggleTimelineBtn && hiddenItems.length > 0) {
        let isTimelineExpanded = false;
        toggleTimelineBtn.addEventListener('click', () => {
            isTimelineExpanded = !isTimelineExpanded;
            hiddenItems.forEach(item => {
                if (isTimelineExpanded) {
                    item.classList.add('show-event');
                } else {
                    item.classList.remove('show-event');
                }
            });
            
            const btnSpan = toggleTimelineBtn.querySelector('span');
            const btnSvg = toggleTimelineBtn.querySelector('svg');
            if (isTimelineExpanded) {
                btnSpan.textContent = 'Collapse History';
                btnSvg.style.transform = 'rotate(180deg)';
            } else {
                btnSpan.textContent = 'Expand Full History';
                btnSvg.style.transform = 'none';
                
                // Scroll back to the top of the timeline section
                const timelineSection = document.getElementById('timeline');
                if (timelineSection) {
                    timelineSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    const detailToggles = document.querySelectorAll('.btn-timeline-toggle');
    detailToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const contentDiv = toggle.parentElement;
            const detailsDiv = contentDiv.querySelector('.timeline-details');
            if (detailsDiv) {
                const isExpanded = detailsDiv.classList.contains('expanded');
                
                // Collapse other expanded timeline details to keep layout tidy
                document.querySelectorAll('.timeline-details.expanded').forEach(expandedEl => {
                    if (expandedEl !== detailsDiv) {
                        expandedEl.classList.remove('expanded');
                        const otherToggle = expandedEl.parentElement.querySelector('.btn-timeline-toggle');
                        if (otherToggle) {
                            otherToggle.classList.remove('active');
                            otherToggle.querySelector('span').textContent = 'Read Details';
                        }
                    }
                });
                
                if (isExpanded) {
                    detailsDiv.classList.remove('expanded');
                    toggle.classList.remove('active');
                    toggle.querySelector('span').textContent = 'Read Details';
                } else {
                    detailsDiv.classList.add('expanded');
                    toggle.classList.add('active');
                    toggle.querySelector('span').textContent = 'Hide Details';
                }
            }
        });
    });

    // ==========================================
    // 9. Competition Excellence Clouds Toggling
    // ==========================================
    const cloudBtns = document.querySelectorAll('.cloud-btn');
    const compPanes = document.querySelectorAll('.comp-pane');

    cloudBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes from buttons
            cloudBtns.forEach(b => b.classList.remove('active'));
            // Add active to current button
            btn.classList.add('active');

            const compId = btn.getAttribute('data-comp');
            
            // Hide all panes
            compPanes.forEach(pane => {
                pane.classList.remove('active');
            });

            // Show selected pane
            const targetPane = document.getElementById(`pane-${compId}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});

