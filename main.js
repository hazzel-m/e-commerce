
/**
 * ShopEasy - E-commerce Website JavaScript
 * Author: Lovable
 * Date: 2023
 */

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').innerText = new Date().getFullYear();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('show');
      
      mobileMenu.classList.toggle('show');
      mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });
  }

  // Hero Slider
  initializeHeroSlider();

  // Testimonials Slider
  initializeTestimonialsSlider();

  // Stats Counter Animation
  initializeStatsCounter();

  // FAQ Accordion
  initializeFaqAccordion();

  // Form Validation
  initializeFormValidation();
});

/**
 * Initialize Hero Slider
 */
function initializeHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.hero-slider .prev');
  const nextBtn = document.querySelector('.hero-slider .next');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const slideInterval = 5000; // Change slide every 5 seconds
  let slideTimer;

  // Function to change slide
  const goToSlide = (index) => {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    
    if (dots.length > 0) {
      dots[currentSlide].classList.add('active');
    }
    
    // Reset the timer
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideInterval);
  };

  // Function to go to next slide
  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  // Function to go to previous slide
  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  // Set up click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Set up click events for navigation buttons
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Start the slideshow
  slideTimer = setInterval(nextSlide, slideInterval);
}

/**
 * Initialize Testimonials Slider
 */
function initializeTestimonialsSlider() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  
  if (testimonials.length === 0) return;
  
  let currentTestimonial = 0;
  const testimonialInterval = 6000; // Change testimonial every 6 seconds
  let testimonialTimer;

  // Function to change testimonial
  const goToTestimonial = (index) => {
    // Remove active class from all testimonials and dots
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current testimonial and dot
    currentTestimonial = (index + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
    
    if (dots.length > 0) {
      dots[currentTestimonial].classList.add('active');
    }
    
    // Reset the timer
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(nextTestimonial, testimonialInterval);
  };

  // Function to go to next testimonial
  const nextTestimonial = () => {
    goToTestimonial(currentTestimonial + 1);
  };

  // Function to go to previous testimonial
  const prevTestimonial = () => {
    goToTestimonial(currentTestimonial - 1);
  };

  // Set up click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToTestimonial(index);
    });
  });

  // Set up click events for navigation buttons
  if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
  if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

  // Start the slideshow
  testimonialTimer = setInterval(nextTestimonial, testimonialInterval);
}

/**
 * Initialize Stats Counter Animation
 */
function initializeStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length === 0) return;
  
  let animated = false;
  
  const animateStats = () => {
    if (animated) return;
    
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      const duration = 2000; // 2 seconds
      const step = target / (duration / 20); // Update every 20ms
      let current = 0;
      
      const updateStat = () => {
        current += step;
        if (current > target) {
          current = target;
          clearInterval(interval);
        }
        stat.textContent = Math.floor(current);
      };
      
      const interval = setInterval(updateStat, 20);
    });
    
    animated = true;
  };
  
  // Check if element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  // Animate on scroll
  const handleScroll = () => {
    if (stats.length > 0 && isInViewport(stats[0])) {
      animateStats();
      window.removeEventListener('scroll', handleScroll);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on page load
}

/**
 * Initialize FAQ Accordion
 */
function initializeFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

/**
 * Initialize Form Validation
 */
function initializeFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Validate form
    let valid = true;
    
    // Reset previous error states
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      group.classList.remove('error');
    });
    
    // Validate name
    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required');
      valid = false;
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Email is required');
      valid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      valid = false;
    }
    
    // Validate subject
    if (subjectInput.value.trim() === '') {
      showError(subjectInput, 'Subject is required');
      valid = false;
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
      showError(messageInput, 'Message is required');
      valid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
      valid = false;
    }
    
    if (valid) {
      // Form is valid, show success toast
      showToast('Message Sent!', 'We\'ll get back to you as soon as possible.', 'success');
      
      // Reset form
      contactForm.reset();
      
      // In a real application, you would submit the form data to a server here
    }
  });
  
  // Helper function to show error message
  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

/**
 * Show Toast Notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, warning, info)
 */
function showToast(title, message, type = 'info') {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Set icon based on toast type
  let icon;
  switch (type) {
    case 'success':
      icon = 'check-circle';
      break;
    case 'error':
      icon = 'times-circle';
      break;
    case 'warning':
      icon = 'exclamation-circle';
      break;
    default:
      icon = 'info-circle';
  }
  
  // Set toast content
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas fa-${icon}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Append toast to container
  toastContainer.appendChild(toast);
  
  // Set timeout to remove toast
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  }, 5000);
  
  // Add event listener for close button
  const closeButton = toast.querySelector('.toast-close');
  closeButton.addEventListener('click', () => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 300);
  });
}

/**
 * Add to Cart Functionality (for future implementation)
 */
function addToCart(productId, productName, price) {
  // This is a placeholder for future cart functionality
  showToast('Added to Cart', `${productName} has been added to your cart.`, 'success');
  
  // Update cart count
  const cartCount = document.querySelectorAll('.cart-count');
  cartCount.forEach(count => {
    count.textContent = parseInt(count.textContent, 10) + 1;
  });
}
