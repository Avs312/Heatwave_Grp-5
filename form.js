/**
 * Heatwave Intelligence System (HIS) - Form Script
 * Handles real-time form validation, character counter, dynamic feedback, and reset.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hisForm');
  const textarea = document.getElementById('incidentDetails');
  const charCounter = document.getElementById('charCounter');
  const feedbackContainer = document.getElementById('formFeedback');

  // 1. Live Character Counter for Textarea
  if (textarea && charCounter) {
    const maxLength = textarea.getAttribute('maxlength') || 300;
    textarea.addEventListener('input', () => {
      const currentLength = textarea.value.length;
      charCounter.textContent = `${currentLength} / ${maxLength} characters`;
      
      if (currentLength >= maxLength - 20) {
        charCounter.style.color = '#dc2626';
      } else {
        charCounter.style.color = '#64748b';
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
  const obsTimeInput = document.getElementById("obsTime");

  if (!obsTimeInput) return;

  // Helper function to format Date object into YYYY-MM-DDTHH:mm (local timezone)
  const formatDateTimeLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const now = new Date();

  // Calculate the start of the 1-week window (7 days ago)
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const formattedNow = formatDateTimeLocal(now);
  const formattedOneWeekAgo = formatDateTimeLocal(oneWeekAgo);

  // Set initial default value and range boundaries
  obsTimeInput.value = formattedNow; // Default to current time
  obsTimeInput.max = formattedNow;   // Prevent future dates
  obsTimeInput.min = formattedOneWeekAgo; // Restrict to 1 week in the past
});

  // Helper: Clear inline errors
  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    if (feedbackContainer) {
      feedbackContainer.style.display = 'none';
      feedbackContainer.className = 'form-feedback';
      feedbackContainer.innerHTML = '';
    }
  }

  // Helper: Show field error
  function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) field.classList.add('input-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  // 2. Form Submission & Validation Handler
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clearErrors();

      let isValid = true;

      // Validate Reporter Name
      const nameInput = document.getElementById('fullName');
      if (nameInput && !nameInput.value.trim()) {
        showError('fullName', 'nameError', 'Full name is required.');
        isValid = false;
      }

      // Validate Email
      const emailInput = document.getElementById('email');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim()))) {
        showError('email', 'emailError', 'Please enter a valid email address.');
        isValid = false;
      }

      // Validate Phone Number
      const phoneInput = document.getElementById('phone');
      const phonePattern = /^\+?[0-9\s\-]{8,15}$/;
      if (phoneInput && phoneInput.value.trim() && !phonePattern.test(phoneInput.value.trim())) {
        showError('phone', 'phoneError', 'Please enter a valid phone number (e.g. +91 9876543210).');
        isValid = false;
      }

      // Validate Region Selection
      const regionSelect = document.getElementById('region');
      if (regionSelect && !regionSelect.value) {
        showError('region', 'regionError', 'Please select a region.');
        isValid = false;
      }

      // If validation fails, scroll to first error
      if (!isValid) {
        const firstError = document.querySelector('.input-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
      }

      // Collect Form Data for Display
      const formData = new FormData(form);
      const name = formData.get('fullName') || 'N/A';
      const email = formData.get('email') || 'N/A';
      const region = regionSelect ? regionSelect.options[regionSelect.selectedIndex].text : 'N/A';
      const alertType = formData.get('alertType') || 'Standard Notice';
      const tempReading = formData.get('temperature') || 'Not provided';
      const details = formData.get('incidentDetails') || 'No additional comments provided.';

      // Render Confirmation Feedback
      if (feedbackContainer) {
        feedbackContainer.className = 'form-feedback success';
        feedbackContainer.style.display = 'block';
        feedbackContainer.innerHTML = `
          <h3 style="margin-top:0; color:#166534;">Form Submitted Successfully!</h3>
          <p style="margin-bottom:0.75rem;">Thank you, <strong>${escapeHtml(name)}</strong>. Your report/subscription has been registered in the Heatwave Intelligence System.</p>
          <div style="background:#ffffff; border:1px solid #bbf7d0; padding:1rem; border-radius:6px; font-size:0.9rem; color:#1e293b;">
            <p style="margin:0 0 0.4rem 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin:0 0 0.4rem 0;"><strong>Target Region:</strong> ${escapeHtml(region)}</p>
            <p style="margin:0 0 0.4rem 0;"><strong>Alert Level Requested:</strong> ${escapeHtml(alertType)}</p>
            <p style="margin:0 0 0.4rem 0;"><strong>Local Temp Observation:</strong> ${escapeHtml(tempReading)}°C</p>
            <p style="margin:0;"><strong>Report Details:</strong> ${escapeHtml(details)}</p>
          </div>
        `;
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Reset input fields after successful submission
      form.reset();
      if (charCounter && textarea) {
        charCounter.textContent = `0 / ${textarea.getAttribute('maxlength') || 300} characters`;
        charCounter.style.color = '#64748b';
      }
    });

    // 3. Reset Button Event Listener
    form.addEventListener('reset', () => {
      setTimeout(() => {
        clearErrors();
        if (charCounter && textarea) {
          charCounter.textContent = `0 / ${textarea.getAttribute('maxlength') || 300} characters`;
          charCounter.style.color = '#64748b';
        }
      }, 10);
    });
  }
});

// Helper utility to prevent HTML injection in preview output
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}