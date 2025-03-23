// Function to handle registration form submission
async function handleRegistrationSubmit(event) {
    event.preventDefault();

    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    // Simple validation
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });

    if (!isValid) return;

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
    submitBtn.disabled = true;

    try {
        // Send data to backend
        const response = await fetch("http://localhost:5000/api/registrations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataObj),
        });

        if (!response.ok) throw new Error("Failed to register!");

        // Success message
        showRegistrationSuccess(formDataObj.eventTitle);

        // Reset form
        form.reset();
    } catch (error) {
        alert("❌ Registration failed! " + error.message);
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Function to show success message
function showRegistrationSuccess(eventName) {
    const alertHtml = `
      <div class="position-fixed top-0 end-0 p-3" style="z-index: 9999">
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header bg-success text-white">
            <strong class="me-auto"><i class="fas fa-check-circle me-2"></i>Registration Successful</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            You have successfully registered for "${eventName}". Check your email for confirmation.
          </div>
        </div>
      </div>
    `;

    const alertContainer = document.createElement('div');
    alertContainer.innerHTML = alertHtml;
    document.body.appendChild(alertContainer);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        const toast = alertContainer.querySelector('.toast');
        const bsToast = new bootstrap.Toast(toast);
        bsToast.hide();
        // Remove from DOM after hiding
        toast.addEventListener('hidden.bs.toast', () => {
            alertContainer.remove();
        });
    }, 5000);
}

// Function to create the registration modal
function createRegistrationModal() {
    if (!document.getElementById('eventRegistrationModal')) {
        const modalHtml = `
        <div class="modal fade" id="eventRegistrationModal" tabindex="-1" aria-labelledby="registrationModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="registrationModalLabel">Register for Event</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="event-registration-form">
                  <input type="hidden" id="eventId" name="eventId">
                  <input type="hidden" id="eventTitle" name="eventTitle">
                  
                  <div class="mb-3">
                    <label for="fullName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="fullName" name="fullName" required>
                  </div>
                  
                  <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                  </div>
                  
                  <div class="mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="phone" name="phone" required>
                  </div>
                  
                  <div class="mb-3">
                    <label for="rollNumber" class="form-label">Roll Number / ID</label>
                    <input type="text" class="form-control" id="rollNumber" name="rollNumber" required>
                  </div>
                  
                  <div class="mb-3">
                    <label for="department" class="form-label">Department</label>
                    <select class="form-select" id="department" name="department" required>
                      <option value="" selected disabled>Select your department</option>
                      <option value="IT">Information Technology</option>
                      <option value="CSE">Computer Science</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="EE">Electrical Engineering</option>
                      <option value="ME">Mechanical Engineering</option>
                      <option value="CE">Civil Engineering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div class="mb-3">
                    <label for="year" class="form-label">Year of Study</label>
                    <select class="form-select" id="year" name="year" required>
                      <option value="" selected disabled>Select your year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div class="mb-3">
                    <label for="question" class="form-label">Why do you want to attend this event?</label>
                    <textarea class="form-control" id="question" name="question" rows="3"></textarea>
                  </div>
                  
                  <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="terms" name="terms" required>
                    <label class="form-check-label" for="terms">I agree to the terms and conditions</label>
                  </div>
                  
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary">Submit Registration</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        `;

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer);
        document.getElementById('event-registration-form').addEventListener('submit', handleRegistrationSubmit);
    }
}

// Initialize the modal on page load
document.addEventListener("DOMContentLoaded", createRegistrationModal);
