// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if the link is an internal anchor
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Offset for the sticky navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animate skill bars on scroll
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');
    let animated = false;
    
    function checkIfInView() {
        if(animated) return;
        
        const windowHeight = window.innerHeight;
        const elementTop = skillSection.getBoundingClientRect().top;
        
        if(elementTop < windowHeight - 100) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                // Reset width first to trigger animation
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            
            animated = true;
            // Remove scroll listener once animated
            window.removeEventListener('scroll', checkIfInView);
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', checkIfInView);
    // Check immediately in case the section is already in view
    checkIfInView();
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple form validation
            if(!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill out all fields');
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message
            alert(`Thank you for your message, ${nameInput.value}! I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Add a simple animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add active class to navigation links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if(pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
    
    // Add a simple back-to-top button functionality
    // First, let's dynamically create the button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '&uarr;';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 99;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when the button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 