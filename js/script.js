// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  const header = document.querySelector('header');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      header.classList.toggle('menu-open');
    });
  }
  
  // Tab functionality for profile page
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
  
  // Form validation for login and registration
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const contactForm = document.getElementById('contactForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would typically send the data to your server
      console.log('Login submitted:', { email, password });
      alert('Login successful! Redirecting...');
      window.location.href = 'profile.html';
    });
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const terms = document.getElementById('terms').checked;
      
      if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!terms) {
        alert('You must agree to the terms and conditions');
        return;
      }
      
      // Here you would typically send the data to your server
      console.log('Registration submitted:', { username, email, password });
      alert('Registration successful! Redirecting to login...');
      window.location.href = 'login.html';
    });
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would typically send the data to your server
      console.log('Contact form submitted:', { name, email, subject, message });
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // Prevent selecting more than 3 games in registration
  const gameSelect = document.getElementById('game-preference');
  if (gameSelect) {
    gameSelect.addEventListener('change', function() {
      const selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
      if (selectedOptions.length > 3) {
        alert('You can select up to 3 games only');
        // Remove the last selected option
        this.selectedOptions[this.selectedOptions.length - 1].selected = false;
      }
    });
  }
});