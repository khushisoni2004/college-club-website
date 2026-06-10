// This code adds real-time registration functionality to event cards

// Function to handle registration form submission
function handleRegistrationSubmit(event) {
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
    
    if (!isValid) {
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
    submitBtn.disabled = true;
    
    // Simulate server request with timeout
    setTimeout(() => {
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('eventRegistrationModal'));
      modal.hide();
      
      // Show success message
      showRegistrationSuccess(formDataObj.eventTitle);
      
      // Reset form
      form.reset();
    }, 1500);
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
  
  // Function to generate the registration modal
  function createRegistrationModal() {
    // Create modal element if it doesn't exist
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
                    <div class="invalid-feedback">Please enter your full name</div>
                  </div>
                  
                  <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                    <div class="invalid-feedback">Please enter a valid email address</div>
                  </div>
                  
                  <div class="mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" id="phone" name="phone" required>
                    <div class="invalid-feedback">Please enter your phone number</div>
                  </div>
                  
                  <div class="mb-3">
                    <label for="rollNumber" class="form-label">Roll Number / ID</label>
                    <input type="text" class="form-control" id="rollNumber" name="rollNumber" required>
                    <div class="invalid-feedback">Please enter your roll number or ID</div>
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
                    <div class="invalid-feedback">Please select your department</div>
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
                    <div class="invalid-feedback">Please select your year of study</div>
                  </div>
                  
                  <div class="mb-3">
                    <label for="question" class="form-label">Why do you want to attend this event?</label>
                    <textarea class="form-control" id="question" name="question" rows="3"></textarea>
                  </div>
                  
                  <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="terms" name="terms" required>
                    <label class="form-check-label" for="terms">
                      I agree to the terms and conditions
                    </label>
                    <div class="invalid-feedback">You must agree before submitting</div>
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
      
      // Add event listener for the form submission
      document.getElementById('event-registration-form').addEventListener('submit', handleRegistrationSubmit);
    }
  }
  
  // Function to modify the event cards to include registration buttons
  function updateEventCards() {
    // Create the registration modal
    createRegistrationModal();
    
    // Get all event cards
    const eventCards = document.querySelectorAll('.card');
    
    eventCards.forEach(card => {
      // Get event details
      const eventId = card.dataset.eventId || Math.floor(Math.random() * 10000); // Fallback to random ID if not set
      const eventTitle = card.querySelector('.card-title').textContent.trim();
      
      // Find or create register button container
      let cardFooter = card.querySelector('.card-footer');
      
      if (!cardFooter) {
        cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer text-center py-3';
        card.appendChild(cardFooter);
      }
      
      // Create register button if it doesn't exist
      if (!cardFooter.querySelector('.register-btn')) {
        const registerBtn = document.createElement('button');
        registerBtn.className = 'btn btn-primary register-btn';
        registerBtn.innerHTML = '<i class="fas fa-user-plus me-2"></i>Register Now';
        registerBtn.dataset.eventId = eventId;
        registerBtn.dataset.eventTitle = eventTitle;
        
        // Add click event
        registerBtn.addEventListener('click', function() {
          // Set event details in the form
          document.getElementById('eventId').value = this.dataset.eventId;
          document.getElementById('eventTitle').value = this.dataset.eventTitle;
          
          // Update modal title
          document.getElementById('registrationModalLabel').textContent = `Register for ${this.dataset.eventTitle}`;
          
          // Show modal
          const registrationModal = new bootstrap.Modal(document.getElementById('eventRegistrationModal'));
          registrationModal.show();
        });
        
        cardFooter.appendChild(registerBtn);
      }
    });
  }
  
  // Function to create sample event cards if they don't exist (for testing)
  function createSampleEventCards() {
    const upcomingContainer = document.getElementById('upcoming-events-container');
    const pastContainer = document.getElementById('past-events-container');
    
    // Only create sample cards if containers are empty
    if (upcomingContainer && upcomingContainer.children.length <= 1) {
      const upcomingEventsHtml = `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100" data-event-id="1001">
            <div class="card-header bg-primary text-white">
              <span class="badge bg-info float-end">Hackathon</span>
              <h6 class="mb-0">March 25-26, 2025</h6>
            </div>
            <div class="card-body">
              <h5 class="card-title">CodeFest 2025</h5>
              <p class="card-text">Our annual 24-hour hackathon where students can showcase their coding and problem-solving skills.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100" data-event-id="1002">
            <div class="card-header bg-primary text-white">
              <span class="badge bg-warning float-end">Workshop</span>
              <h6 class="mb-0">April 5, 2025</h6>
            </div>
            <div class="card-body">
              <h5 class="card-title">Web Development Bootcamp</h5>
              <p class="card-text">Learn modern web development techniques with hands-on practice sessions.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100" data-event-id="1003">
            <div class="card-header bg-primary text-white">
              <span class="badge bg-success float-end">Webinar</span>
              <h6 class="mb-0">April 12, 2025</h6>
            </div>
            <div class="card-body">
              <h5 class="card-title">AI and the Future of IT</h5>
              <p class="card-text">Join our expert panel to discuss how AI is transforming the IT landscape.</p>
            </div>
          </div>
        </div>
      `;
      upcomingContainer.innerHTML += upcomingEventsHtml;
    }
    
    if (pastContainer && pastContainer.children.length <= 1) {
      const pastEventsHtml = `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100" data-event-id="2001">
            <div class="card-header bg-secondary text-white">
              <span class="badge bg-danger float-end">Coding</span>
              <h6 class="mb-0">February 15, 2025</h6>
            </div>
            <div class="card-body">
              <h5 class="card-title">Competitive Coding Challenge</h5>
              <p class="card-text">A coding competition that tested participants' algorithm and data structure knowledge.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100" data-event-id="2002">
            <div class="card-header bg-secondary text-white">
              <span class="badge bg-info float-end">Hackathon</span>
              <h6 class="mb-0">January 20, 2025</h6>
            </div>
            <div class="card-body">
              <h5 class="card-title">Hack for Social Good</h5>
              <p class="card-text">Students developed solutions for social problems in this 12-hour hackathon.</p>
            </div>
          </div>
        </div>
      `;
      pastContainer.innerHTML += pastEventsHtml;
    }
  }
  
  // Initialize everything when the DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Create sample cards for testing if needed
    createSampleEventCards();
    
    // Add registration buttons to event cards
    updateEventCards();
    
    // Hide the "no upcoming events" alert if we have events
    const upcomingContainer = document.getElementById('upcoming-events-container');
    if (upcomingContainer && upcomingContainer.querySelectorAll('.card').length > 0) {
      const noUpcomingAlert = document.getElementById('no-upcoming-events');
      if (noUpcomingAlert) {
        noUpcomingAlert.style.display = 'none';
      }
    }
    
    // Hide the "no past events" alert if we have events
    const pastContainer = document.getElementById('past-events-container');
    if (pastContainer && pastContainer.querySelectorAll('.card').length > 0) {
      const noPastAlert = document.getElementById('no-past-events');
      if (noPastAlert) {
        noPastAlert.style.display = 'none';
      }
    }
    
    // Update register button in event detail modal
    const registerEventBtn = document.getElementById('register-event-btn');
    if (registerEventBtn) {
      registerEventBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get event details from the modal
        const modal = document.getElementById('eventDetailModal');
        const eventTitle = modal.querySelector('.modal-title').textContent;
        const eventId = modal.dataset.eventId || Math.floor(Math.random() * 10000);
        
        // Set event details in the registration form
        document.getElementById('eventId').value = eventId;
        document.getElementById('eventTitle').value = eventTitle;
        
        // Update registration modal title
        document.getElementById('registrationModalLabel').textContent = `Register for ${eventTitle}`;
        
        // Hide event detail modal
        bootstrap.Modal.getInstance(modal).hide();
        
        // Show registration modal
        const registrationModal = new bootstrap.Modal(document.getElementById('eventRegistrationModal'));
        registrationModal.show();
      });
    }
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
      submitBtn.innerHTML = 'Submitting...';
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
        alert("Registration failed! " + error.message);
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
  }
  
    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.dataset.filter;
        
        // Implement filtering logic here
        console.log(`Filtering by: ${filterValue}`);
      });
    });
  });