document.addEventListener('DOMContentLoaded', function() {
    // Initialize site-wide functionality
    initNavigation();
    handleFormSubmissions();
    
    // Check if we're on the homepage
    if (document.querySelector('.hero-section')) {
        loadFeaturedContent();
    }
});

function initNavigation() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function handleFormSubmissions() {
    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[name="email"]').value;
            const name = this.querySelector('input[name="name"]')?.value || '';
            
            fetch('api/subscribe_newsletter.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, name })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification('Thank you for subscribing!', 'success');
                    this.reset();
                } else {
                    showNotification(data.message || 'Something went wrong.', 'error');
                }
            })
            .catch(error => {
                showNotification('Error submitting form. Please try again.', 'error');
                console.error('Error:', error);
            });
        });
    }
}

function loadFeaturedContent() {
    // Load latest events for homepage
    fetch('api/get_events.php?featured=true')
        .then(response => response.json())
        .then(data => {
            const featuredEvents = document.querySelector('.featured-events');
            if (featuredEvents && data.events) {
                renderEvents(data.events, featuredEvents);
            }
        })
        .catch(error => console.error('Error loading featured events:', error));
        
    // Load activities preview
    fetch('api/get_activities.php?limit=3')
        .then(response => response.json())
        .then(data => {
            const activitiesSection = document.querySelector('.activities-preview');
            if (activitiesSection && data.activities) {
                renderActivities(data.activities, activitiesSection);
            }
        })
        .catch(error => console.error('Error loading activities:', error));
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }, 10);
}

function renderEvents(events, container) {
    container.innerHTML = '';
    
    events.forEach(event => {
        const eventDate = new Date(event.event_date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-image">
                ${event.image_url ? 
                   `<img src="${event.image_url}" alt="${event.title}">` : 
                   '<div class="no-image">No Image</div>'}
            </div>
            <div class="event-info">
                <h3>${event.title}</h3>
                <div class="event-date">${formattedDate}</div>
                <div class="event-location">${event.location || ''}</div>
                <p>${event.description}</p>
            </div>
        `;
        
        container.appendChild(eventCard);
    });
}

function renderActivities(activities, container) {
    container.innerHTML = '';
    
    activities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.className = 'activity-card';
        activityCard.innerHTML = `
            <div class="activity-image">
                ${activity.image_url ? 
                   `<img src="${activity.image_url}" alt="${activity.name}">` : 
                   '<div class="no-image">No Image</div>'}
            </div>
            <div class="activity-info">
                <h3>${activity.name}</h3>
                <div class="activity-type">${activity.activity_type || ''}</div>
                <p>${activity.description}</p>
            </div>
        `;
        
        container.appendChild(activityCard);
    });
}