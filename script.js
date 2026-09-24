/**
 * Portfolio Interactive Scripts
 * Task 3: showPopup is triggered only when a new recommendation is submitted.
 */

// Function to control popup visibility
function showPopup(bool) {
  const popup = document.getElementById('popup');
  if (!popup) return;
  
  if (bool) {
    popup.classList.add('show');
    popup.style.display = 'flex';
  } else {
    popup.classList.remove('show');
    popup.style.display = 'none';
  }
}

// Function to handle adding a new recommendation
function addRecommendation(event) {
  if (event) {
    event.preventDefault();
  }

  const nameInput = document.getElementById('new_name');
  const roleInput = document.getElementById('new_role');
  const messageInput = document.getElementById('new_recommendation');
  const recommendationsContainer = document.getElementById('recommendations-container');

  const message = messageInput ? messageInput.value.trim() : '';
  const name = nameInput && nameInput.value.trim() !== '' ? nameInput.value.trim() : 'Anonymous Colleague';
  const role = roleInput && roleInput.value.trim() !== '' ? roleInput.value.trim() : 'Software Professional';

  // Ensure message is not empty before creating recommendation & showing popup
  if (message !== '') {
    // Generate initials for avatar
    const nameParts = name.split(' ');
    let initials = nameParts[0].charAt(0).toUpperCase();
    if (nameParts.length > 1) {
      initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    }

    // Create new recommendation card element with .recommendation class
    const newCard = document.createElement('div');
    newCard.className = 'recommendation-card recommendation';
    newCard.innerHTML = `
      <div class="quote-icon">“</div>
      <p class="recommendation-text">${escapeHTML(message)}</p>
      <div class="author-info">
        <div class="author-avatar">${initials}</div>
        <div>
          <h4 class="author-name">${escapeHTML(name)}</h4>
          <p class="author-role">${escapeHTML(role)}</p>
        </div>
      </div>
    `;

    // Append new recommendation to the container
    if (recommendationsContainer) {
      recommendationsContainer.appendChild(newCard);
    }

    // Clear form fields
    if (messageInput) messageInput.value = '';
    if (nameInput) nameInput.value = '';
    if (roleInput) roleInput.value = '';

    // Task 3: showPopup is triggered when a new recommendation is submitted
    showPopup(true);
  }
}

// Helper to sanitize text preventing XSS
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Close popup when clicking outside the content
window.addEventListener('click', function (event) {
  const popup = document.getElementById('popup');
  if (event.target === popup) {
    showPopup(false);
  }
});
