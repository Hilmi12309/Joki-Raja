  document.addEventListener('DOMContentLoaded', function() {
  // Tab Switching Functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Profile Picture Upload
  const avatarUpload = document.getElementById('avatar-upload');
  const profilePicture = document.getElementById('profile-picture');
  
  if (avatarUpload) {
    avatarUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          profilePicture.src = event.target.result;
          // Here you would typically upload the image to your server
          console.log('Profile picture updated');
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Edit Personal Information Button
  const editPersonalBtn = document.getElementById('edit-personal-btn');
  if (editPersonalBtn) {
    editPersonalBtn.addEventListener('click', function() {
      // Switch to settings tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      document.querySelector('.tab-btn[data-tab="settings"]').classList.add('active');
      document.getElementById('settings-tab').classList.add('active');
      
      // Scroll to personal information section
      document.getElementById('settings-username').focus();
    });
  }
  
  // Edit Game Preferences Button
  const editGamesBtn = document.getElementById('edit-games-btn');
  if (editGamesBtn) {
    editGamesBtn.addEventListener('click', function() {
      // Switch to settings tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      document.querySelector('.tab-btn[data-tab="settings"]').classList.add('active');
      document.getElementById('settings-tab').classList.add('active');
      
      // Scroll to game preferences section
      document.getElementById('main-game-select').focus();
    });
  }
  
  // Form Submission
  const accountSettingsForm = document.getElementById('account-settings-form');
  if (accountSettingsForm) {
    accountSettingsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const username = document.getElementById('settings-username').value;
      const email = document.getElementById('settings-email').value;
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const mainGame = document.getElementById('main-game-select').value;
      
      // Validate passwords if changed
      if (newPassword && newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
      }
      
      // Here you would typically send the data to your server
      console.log('Account settings updated:', {
        username,
        email,
        currentPassword,
        newPassword,
        mainGame
      });
      
      // Update displayed information
      document.getElementById('profile-username').textContent = username;
      document.getElementById('display-username').textContent = username;
      document.getElementById('display-email').textContent = email;
      document.getElementById('main-game').textContent = document.getElementById('main-game-select').options[document.getElementById('main-game-select').selectedIndex].text;
      
      // Get selected other games
      const otherGamesCheckboxes = document.querySelectorAll('input[name="other-games"]:checked');
      const otherGames = Array.from(otherGamesCheckboxes).map(cb => {
        return cb.parentElement.textContent.trim();
      }).join(', ');
      
      document.getElementById('other-games').textContent = otherGames || 'None';
      
      alert('Your changes have been saved successfully!');
    });
  }
  
  // Order Details Button
  const orderDetailsButtons = document.querySelectorAll('.details-btn');
  orderDetailsButtons.forEach(button => {
    button.addEventListener('click', function() {
      const orderId = this.closest('.order-card').querySelector('.order-id').textContent;
      alert(`Showing details for ${orderId}\n\nThis would typically open a detailed order view or modal.`);
    });
  });
  
  // Reorder Button
  const reorderButtons = document.querySelectorAll('.reorder-btn');
  reorderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const gameName = this.closest('.order-card').querySelector('.game-info h3').textContent;
      const serviceName = this.closest('.order-card').querySelector('.game-info p').textContent;
      alert(`Redirecting to order page for:\n\n${gameName} - ${serviceName}`);
      // window.location.href = 'order.html?game=' + encodeURIComponent(gameName);
    });
  });
  
  // Message Booster Button
  const messageButtons = document.querySelectorAll('.message-btn');
  messageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const boosterName = this.closest('.boost-card').querySelector('.detail-value').textContent;
      alert(`Opening chat with ${boosterName}`);
      // This would typically open a chat interface
    });
  });
  
  // Track Progress Button
  const trackButtons = document.querySelectorAll('.track-btn');
  trackButtons.forEach(button => {
    button.addEventListener('click', function() {
      const gameName = this.closest('.boost-card').querySelector('.game-info h3').textContent;
      alert(`Showing detailed progress for ${gameName} boost`);
      // This would typically show more detailed progress information
    });
  });
  
  // Cancel Boost Button
  const cancelButtons = document.querySelectorAll('.cancel-btn');
  cancelButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (confirm('Are you sure you want to cancel this boost? Partial progress may be lost.')) {
        const boostCard = this.closest('.boost-card');
        boostCard.style.opacity = '0.5';
        boostCard.style.pointerEvents = 'none';
        this.textContent = 'Canceling...';
        
        // Simulate server request
        setTimeout(() => {
          alert('Boost canceled successfully. Any applicable refund will be processed.');
          boostCard.remove();
          updateActiveBoostsCount();
        }, 1500);
      }
    });
  });
  
  function updateActiveBoostsCount() {
    const activeBoosts = document.querySelectorAll('.boost-card').length;
    document.getElementById('active-boosts').textContent = activeBoosts;
  }
  
  // Simulate progress updates for demo purposes
  setInterval(() => {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill && parseInt(progressFill.style.width) < 100) {
      const currentWidth = parseInt(progressFill.style.width) || 65;
      const newWidth = Math.min(currentWidth + 1, 100);
      progressFill.style.width = `${newWidth}%`;
      
      const progressInfo = progressFill.closest('.boost-progress').querySelector('.progress-info');
      if (progressInfo) {
        progressInfo.querySelector('span:first-child').textContent = `Current Progress: ${newWidth}%`;
        
        if (newWidth === 100) {
          progressInfo.querySelector('span:last-child').textContent = 'Completed!';
          progressFill.closest('.boost-card').querySelector('.boost-status').textContent = 'Completed';
          progressFill.closest('.boost-card').querySelector('.boost-status').className = 'boost-status completed';
          updateActiveBoostsCount();
        }
      }
    }
  }, 5000);
});