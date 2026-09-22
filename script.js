/* Simple JavaScript Form Validation for Heatwave Early Warning Portal (Exp 4) */

function validateForm(event) {
  // Prevent page refresh on submit
  event.preventDefault();

  // Flag to keep track of validation status
  let isValid = true;

  // Clear previous error messages
  clearErrors();

  // --- Task 2: Validate Observer Name and AWS Station ID ---

  // 1. Observer Name: Min 3 characters, alphabets and spaces only
  const nameInput = document.getElementById("observerName").value.trim();
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  if (nameInput === "") {
    showError("nameError", "Observer Name cannot be blank.");
    isValid = false;
  } else if (!nameRegex.test(nameInput)) {
    showError("nameError", "Name must contain only alphabets and spaces (min 3 characters).");
    isValid = false;
  }

  // 2. AWS Station ID: Format like AWS001 ('AWS' followed by 3 numbers)
  const stationInput = document.getElementById("stationId").value.trim();
  const stationRegex = /^AWS\d{3}$/;
  if (stationInput === "") {
    showError("stationError", "AWS Station ID cannot be blank.");
    isValid = false;
  } else if (!stationRegex.test(stationInput)) {
    showError("stationError", "Station ID must be in format AWS001 (e.g., AWS001, AWS102).");
    isValid = false;
  }

  // --- Task 3: Validate Email and Mobile Number ---

  // 3. Email Address: Valid email format
  const emailInput = document.getElementById("email").value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailInput === "") {
    showError("emailError", "Email address cannot be blank.");
    isValid = false;
  } else if (!emailRegex.test(emailInput)) {
    showError("emailError", "Please enter a valid email address (e.g. user@example.com).");
    isValid = false;
  }

  // 4. Mobile Number: 10-digit Indian number starting with 6, 7, 8, or 9
  const mobileInput = document.getElementById("mobile").value.trim();
  const mobileRegex = /^[6-9]\d{9}$/;
  if (mobileInput === "") {
    showError("mobileError", "Mobile number cannot be blank.");
    isValid = false;
  } else if (!mobileRegex.test(mobileInput)) {
    showError("mobileError", "Mobile number must be a valid 10-digit number starting with 6-9.");
    isValid = false;
  }

  // --- Location Check ---
  const locationInput = document.getElementById("location").value.trim();
  if (locationInput === "") {
    showError("locationError", "Station location cannot be blank.");
    isValid = false;
  }

  // --- Task 4: Validate Weather Observation Data ---

  // 5. Observation Date: Must not be empty
  const obsDateInput = document.getElementById("obsDate").value;
  if (obsDateInput === "") {
    showError("dateError", "Observation Date must not be empty.");
    isValid = false;
  }

  // 6. Maximum Temperature: Must be numeric
  const tempInput = document.getElementById("maxTemp").value;
  if (tempInput === "") {
    showError("tempError", "Maximum Temperature is required.");
    isValid = false;
  } else if (isNaN(tempInput) || tempInput < -10 || tempInput > 65) {
    showError("tempError", "Temperature must be a number between -10°C and 65°C.");
    isValid = false;
  }

  // 7. Humidity: Numeric between 0 and 100 percent
  const humidityInput = document.getElementById("humidity").value;
  if (humidityInput === "") {
    showError("humidityError", "Humidity percentage is required.");
    isValid = false;
  } else if (isNaN(humidityInput) || humidityInput < 0 || humidityInput > 100) {
    showError("humidityError", "Humidity must be a value between 0% and 100%.");
    isValid = false;
  }

  // --- Task 5: Validate Alert Level and Submit Form ---

  // 8. Alert Level Selection
  const alertInput = document.getElementById("alertLevel").value;
  if (alertInput === "") {
    showError("alertError", "Please select a Heatwave Alert Level.");
    isValid = false;
  }

  // Display Success Message if all rules are satisfied
  if (isValid) {
    const successBox = document.getElementById("successMessage");
    successBox.style.display = "block";
    successBox.innerHTML = `
      <h3>Success! Weather Data Validated & Submitted</h3>
      <p><strong>Observer Name:</strong> ${escapeHtml(nameInput)}</p>
      <p><strong>Email:</strong> ${escapeHtml(emailInput)} | <strong>Mobile:</strong> ${escapeHtml(mobileInput)}</p>
      <p><strong>Station ID:</strong> ${escapeHtml(stationInput)} | <strong>Location:</strong> ${escapeHtml(locationInput)}</p>
      <p><strong>Observation Date:</strong> ${escapeHtml(obsDateInput)}</p>
      <p><strong>Max Temp:</strong> ${escapeHtml(tempInput)}°C | <strong>Humidity:</strong> ${escapeHtml(humidityInput)}%</p>
      <p><strong>Alert Level:</strong> ${escapeHtml(alertInput)}</p>
    `;
    
    // Clear form inputs after success
    document.getElementById("heatwaveForm").reset();
  }
}

// Function to display error message under input box
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

// Function to clear all error messages
function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach(el => {
    el.textContent = "";
    el.style.display = "none";
  });

  const successBox = document.getElementById("successMessage");
  if (successBox) {
    successBox.style.display = "none";
    successBox.innerHTML = "";
  }
}

// Helper function to prevent HTML code injection
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
