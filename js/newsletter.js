document.addEventListener('DOMContentLoaded', function() {
    // Load newsletters
    loadNewsletters();
    
    // Load archive
    loadNewsletterArchive();
    
    // Handle subscription form
    const subscriptionForm = document.getElementById('newsletter-subscription-form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', handleSubscription);
    }
});
document.getElementById("newsletter-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const response = await fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
    });

    const data = await response.json();
    console.log(data); // Check response in browser console
});


function loadNewsletters() {
    const newsletterList = document.getElementById('newsletter-list');
    const loadingElement = document.getElementById('loading-newsletters');
    const noNewslettersElement = document.getElementById('no-newsletters');
    
    fetch('/api/get_newsletters.php')
        .then(response => response.json())
        .then(data => {
            loadingElement.classList.add('d-none');
            
            if (data.success && data.newsletters.length > 0) {
                // Clear the loading indicator
                newsletterList.innerHTML = '';
                
                // Add newsletter cards
                data.newsletters.forEach(newsletter => {
                    const publishDate = new Date(newsletter.publish_date);
                    const formattedDate = publishDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    const card = document.createElement('div');
                    card.className = 'col-md-6 col-lg-4 mb-4';
                    card.innerHTML = `
                        <div class="card h-100 shadow-sm">
                            <div class="position-relative">
                                <img src="${newsletter.thumbnail_path || '/images/newsletter-default.jpg'}" class="card-img-top" alt="${newsletter.title}">
                                ${newsletter.is_featured ? '<span class="badge bg-primary position-absolute top-0 end-0 m-2">Featured</span>' : ''}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${newsletter.title}</h5>
                                <h6 class="text-muted">${newsletter.issue_number}</h6>
                                <p class="card-text">${newsletter.description}</p>
                            </div>
                            <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
                                <small class="text-muted">${formattedDate}</small>
                                <a href="${newsletter.file_path}" class="btn btn-sm btn-outline-primary" target="_blank">Read</a>
                            </div>
                        </div>
                    `;
                    
                    newsletterList.appendChild(card);
                });
            } else {
                // Show no newsletters message
                noNewslettersElement.classList.remove('d-none');
            }
        })
        .catch(error => {
            console.error('Error loading newsletters:', error);
            loadingElement.classList.add('d-none');
            noNewslettersElement.classList.remove('d-none');
        });
}

function loadNewsletterArchive() {
    const archiveContainer = document.getElementById('newsletter-archive');
    const loadingElement = document.getElementById('loading-archive');
    const noArchiveElement = document.getElementById('no-archive');
    
    fetch('/api/get_archive.php')
        .then(response => response.json())
        .then(data => {
            loadingElement.classList.add('d-none');
            
            if (data.success && data.archive.length > 0) {
                // Clear the loading indicator
                archiveContainer.innerHTML = '';
                
                // Add accordions for each year
                data.archive.forEach((yearData, index) => {
                    const yearItem = document.createElement('div');
                    yearItem.className = 'accordion-item';
                    yearItem.innerHTML = `
                        <h2 class="accordion-header" id="heading${yearData.year}">
                            <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${yearData.year}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse${yearData.year}">
                                ${yearData.year}
                            </button>
                        </h2>
                        <div id="collapse${yearData.year}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${yearData.year}" data-bs-parent="#newsletter-archive">
                            <div class="accordion-body">
                                <div class="list-group">
                                    ${yearData.months.map(monthData => `
                                        <a href="/api/download_archive.php?id=${monthData.id}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                            <span>${monthData.month} - ${monthData.title}</span>
                                            <i class="fas fa-download text-primary"></i>
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                    
                    archiveContainer.appendChild(yearItem);
                });
            } else {
                // Show no archive message
                noArchiveElement.classList.remove('d-none');
            }
        })
        .catch(error => {
            console.error('Error loading archive:', error);
            loadingElement.classList.add('d-none');
            noArchiveElement.classList.remove('d-none');
        });
}

function handleSubscription(event) {
    event.preventDefault();
    
    // Get form values
    const nameInput = document.getElementById('subscriber-name');
    const emailInput = document.getElementById('subscriber-email');
    const yearSelect = document.getElementById('subscriber-year');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const subscribeButton = document.getElementById('subscribe-button');
    const alertElement = document.getElementById('subscription-alert');
    
    // Validate form
    if (!nameInput.value || !emailInput.value || !yearSelect.value || !termsCheckbox.checked) {
        showSubscriptionAlert('Please fill in all fields and accept the terms.', 'danger');
        return;
    }
    
    // Disable button and show loading state
    subscribeButton.disabled = true;
    subscribeButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Subscribing...';
    
    // Prepare data
    const subscriptionData = {
        name: nameInput.value,
        email: emailInput.value,
        year: yearSelect.value
    };
    
    // Send API request
    fetch('/api/subscribe.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSubscriptionAlert(data.message, 'success');
            // Reset form
            event.target.reset();
        } else {
            showSubscriptionAlert(data.message || 'Something went wrong. Please try again.', 'danger');
        }
    })
    .catch(error => {
        console.error('Error subscribing:', error);
        showSubscriptionAlert('Error submitting form. Please try again later.', 'danger');
    })
    .finally(() => {
        // Reset button state
        subscribeButton.disabled = false;
        subscribeButton.innerHTML = 'Subscribe';
    });
}

function showSubscriptionAlert(message, type) {
    const alertElement = document.getElementById('subscription-alert');
    
    alertElement.className = `alert alert-${type}`;
    alertElement.textContent = message;
    alertElement.classList.remove('d-none');
    
    // Scroll to alert
    alertElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide alert after 5 seconds
    setTimeout(() => {
        alertElement.classList.add('d-none');
    }, 5000);
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add additional API endpoint for downloading archive newsletters if needed
function downloadArchiveNewsletter(id) {
    window.open(`/api/download_archive.php?id=${id}`, '_blank');
}
function handleSubscription(event) {
    event.preventDefault();

    const nameInput = document.getElementById('subscriber-name');
    const emailInput = document.getElementById('subscriber-email');
    const yearSelect = document.getElementById('subscriber-year');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const subscribeButton = document.getElementById('subscribe-button');
    const alertElement = document.getElementById('subscription-alert');

    if (!nameInput.value || !emailInput.value || !yearSelect.value || !termsCheckbox.checked) {
        showSubscriptionAlert('Please fill in all fields and accept the terms.', 'danger');
        return;
    }

    subscribeButton.disabled = true;
    subscribeButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Subscribing...';

    const subscriptionData = {
        name: nameInput.value,
        email: emailInput.value,
        year: yearSelect.value
    };

    fetch("http://localhost:3000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscriptionData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSubscriptionAlert(data.message, 'success');
            event.target.reset();
        } else {
            showSubscriptionAlert(data.message || 'Subscription failed!', 'danger');
        }
    })
    .catch(error => {
        console.error('Error subscribing:', error);
        showSubscriptionAlert('Server error, try again later.', 'danger');
    })
    .finally(() => {
        subscribeButton.disabled = false;
        subscribeButton.innerHTML = 'Subscribe';
    });
}
