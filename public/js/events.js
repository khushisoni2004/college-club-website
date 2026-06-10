// events.js - Data and logic for the #Include IT Technical Club events page

// Sample events data
const eventsData = [
    // HACKATHONS
    {
        id: 1,
        title: "CodeFusion 2025",
        type: "hackathon",
        date: "2025-05-15",
        time: "09:00",
        location: "SGSITS Main Auditorium",
        description: "A 36-hour hackathon focusing on AI and Machine Learning solutions for real-world problems. Teams of 2-4 can participate to win exciting prizes and internship opportunities.",
        image: "hackathon1.jpg",
        registrationLink: "https://includesgsits.tech/codefusion",
        featured: true,
        status: "upcoming"
    },
    {
        id: 2,
        title: "HackIT 2024",
        type: "hackathon",
        date: "2024-11-18",
        time: "10:00",
        location: "IT Department, SGSITS",
        description: "A 24-hour hackathon dedicated to cybersecurity and ethical hacking. Learn how to protect digital infrastructure while competing for cash prizes.",
        image: "hackathon2.jpg",
        registrationLink: "https://includesgsits.tech/hackit",
        featured: false,
        status: "past"
    },
    {
        id: 3,
        title: "InnovateX",
        type: "hackathon",
        date: "2024-09-25",
        time: "08:30",
        location: "Virtual Event",
        description: "An online hackathon focused on innovative solutions for sustainable development. Participants can join from anywhere in the world.",
        image: "hackathon3.jpg",
        registrationLink: "https://includesgsits.tech/innovatex",
        featured: false,
        status: "past"
    },
    {
        id: 4,
        title: "BlockchainBuild",
        type: "hackathon",
        date: "2024-07-12",
        time: "09:00",
        location: "SGSITS Central Lab",
        description: "A specialized hackathon for blockchain enthusiasts. Build decentralized applications and smart contracts during this intensive 48-hour event.",
        image: "hackathon4.jpg",
        registrationLink: "https://includesgsits.tech/blockchainbuild",
        featured: false,
        status: "past"
    },
    {
        id: 5,
        title: "GreenTech Challenge",
        type: "hackathon",
        date: "2024-05-05",
        time: "10:00",
        location: "IT Department, SGSITS",
        description: "Develop technological solutions for environmental challenges. This hackathon focuses on sustainability and eco-friendly innovations.",
        image: "hackathon5.jpg",
        registrationLink: "https://includesgsits.tech/greentech",
        featured: false,
        status: "past"
    },
    {
        id: 6,
        title: "HealthHack",
        type: "hackathon",
        date: "2024-03-15",
        time: "09:00",
        location: "Virtual Event",
        description: "An online hackathon for developing healthcare solutions. Work on medical applications, diagnostics tools, and healthcare management systems.",
        image: "hackathon6.jpg",
        registrationLink: "https://includesgsits.tech/healthhack",
        featured: false,
        status: "past"
    },
    {
        id: 7,
        title: "GameDev Jam",
        type: "hackathon",
        date: "2025-04-05",
        time: "10:00",
        location: "Computer Lab 3, IT Department",
        description: "A game development hackathon where participants create original games in 48 hours. Open for both beginners and experienced developers.",
        image: "hackathon7.jpg",
        registrationLink: "https://includesgsits.tech/gamedevjam",
        featured: true,
        status: "upcoming"
    },
    
    // CODING CONTESTS
    {
        id: 8,
        title: "CodeWars 2025",
        type: "coding",
        date: "2025-03-30",
        time: "14:00",
        location: "Online (CodeForces Platform)",
        description: "A competitive coding contest with multiple rounds testing algorithmic and problem-solving skills. Compete individually to climb the leaderboard.",
        image: "coding1.jpg",
        registrationLink: "https://includesgsits.tech/codewars",
        featured: true,
        status: "upcoming"
    },
    {
        id: 9,
        title: "Byte Battle",
        type: "coding",
        date: "2024-10-12",
        time: "10:00",
        location: "IT Department Labs",
        description: "A fast-paced coding competition with time constraints. Solve problems efficiently to win exciting prizes and recognition.",
        image: "coding2.jpg",
        registrationLink: "https://includesgsits.tech/bytebattle",
        featured: false,
        status: "past"
    },
    {
        id: 10,
        title: "Algo Arena",
        type: "coding",
        date: "2024-08-18",
        time: "09:00",
        location: "Virtual Event",
        description: "Test your algorithmic skills in this online coding competition. Multiple difficulty levels available for beginners to experts.",
        image: "coding3.jpg",
        registrationLink: "https://includesgsits.tech/algoarena",
        featured: false,
        status: "past"
    },
    {
        id: 11,
        title: "Debug Derby",
        type: "coding",
        date: "2024-06-25",
        time: "11:00",
        location: "Computer Lab 2, IT Department",
        description: "A unique contest focused on debugging skills. Find and fix bugs in provided code within the time limit.",
        image: "coding4.jpg",
        registrationLink: "https://includesgsits.tech/debugderby",
        featured: false,
        status: "past"
    },
    {
        id: 12,
        title: "Python Challenge",
        type: "coding",
        date: "2024-04-16",
        time: "10:00",
        location: "Online (HackerRank Platform)",
        description: "A Python-specific coding contest testing your proficiency with the language. From basic syntax to advanced libraries.",
        image: "coding5.jpg",
        registrationLink: "https://includesgsits.tech/pythonchallenge",
        featured: false,
        status: "past"
    },
    {
        id: 13,
        title: "Frontend Faceoff",
        type: "coding",
        date: "2024-02-20",
        time: "14:00",
        location: "IT Department, SGSITS",
        description: "A contest for frontend developers. Create responsive and beautiful interfaces based on provided designs and requirements.",
        image: "coding6.jpg",
        registrationLink: "https://includesgsits.tech/frontendfaceoff",
        featured: false,
        status: "past"
    },
    {
        id: 14,
        title: "DataStructure Duel",
        type: "coding",
        date: "2025-04-10",
        time: "09:00",
        location: "Computer Labs, IT Department",
        description: "A competition focused on data structures and their implementations. Test your knowledge of efficient data organization and manipulation.",
        image: "coding7.jpg",
        registrationLink: "https://includesgsits.tech/dsduel",
        featured: true,
        status: "upcoming"
    },
    
    // WORKSHOPS
    {
        id: 15,
        title: "Cloud Computing Workshop",
        type: "workshop",
        date: "2025-04-18",
        time: "10:00",
        location: "IT Seminar Hall, SGSITS",
        description: "A comprehensive workshop on cloud platforms like AWS, Azure, and Google Cloud. Learn deployment, scaling, and management of cloud resources.",
        image: "workshop1.jpg",
        registrationLink: "https://includesgsits.tech/cloudworkshop",
        featured: true,
        status: "upcoming"
    },
    {
        id: 16,
        title: "Machine Learning Fundamentals",
        type: "workshop",
        date: "2024-10-05",
        time: "09:00",
        location: "IT Department, SGSITS",
        description: "Introduction to machine learning algorithms and frameworks. Hands-on experience with datasets and model training.",
        image: "workshop2.jpg",
        registrationLink: "https://includesgsits.tech/mlworkshop",
        featured: false,
        status: "past"
    },
    {
        id: 17,
        title: "Web Development Bootcamp",
        type: "workshop",
        date: "2024-09-15",
        time: "10:00",
        location: "Computer Lab 1, IT Department",
        description: "A two-day intensive workshop covering frontend and backend development. Build a complete web application from scratch.",
        image: "workshop3.jpg",
        registrationLink: "https://includesgsits.tech/webdevbootcamp",
        featured: false,
        status: "past"
    },
    {
        id: 18,
        title: "Cybersecurity Essentials",
        type: "workshop",
        date: "2024-07-20",
        time: "09:30",
        location: "IT Seminar Hall, SGSITS",
        description: "Learn essential cybersecurity practices, vulnerability assessment, and penetration testing techniques in this hands-on workshop.",
        image: "workshop4.jpg",
        registrationLink: "https://includesgsits.tech/cybersecurityworkshop",
        featured: false,
        status: "past"
    },
    {
        id: 19,
        title: "Mobile App Development",
        type: "workshop",
        date: "2024-06-08",
        time: "10:00",
        location: "Computer Lab 3, IT Department",
        description: "A workshop on developing mobile applications for Android and iOS using cross-platform frameworks like React Native and Flutter.",
        image: "workshop5.jpg",
        registrationLink: "https://includesgsits.tech/mobileappworkshop",
        featured: false,
        status: "past"
    },
    {
        id: 20,
        title: "Database Design and Optimization",
        type: "workshop",
        date: "2024-04-22",
        time: "09:00",
        location: "IT Department, SGSITS",
        description: "Learn database design principles, normalization, indexing, and query optimization techniques for better performance.",
        image: "workshop6.jpg",
        registrationLink: "https://includesgsits.tech/databaseworkshop",
        featured: false,
        status: "past"
    },
    {
        id: 21,
        title: "DevOps and CI/CD Pipeline",
        type: "workshop",
        date: "2025-03-25",
        time: "10:00",
        location: "Online Workshop",
        description: "Introduction to DevOps practices and implementing Continuous Integration/Continuous Deployment pipelines using Jenkins, GitHub Actions, etc.",
        image: "workshop7.jpg",
        registrationLink: "https://includesgsits.tech/devopsworkshop",
        featured: true,
        status: "upcoming"
    },
    
    // WEBINARS
    {
        id: 22,
        title: "Careers in Data Science",
        type: "webinar",
        date: "2025-05-05",
        time: "17:00",
        location: "Online (Zoom)",
        description: "Industry experts share insights about career paths in data science, required skills, and job opportunities in this growing field.",
        image: "webinar1.jpg",
        registrationLink: "https://includesgsits.tech/datasciencewebinar",
        featured: true,
        status: "upcoming"
    },
    {
        id: 23,
        title: "Blockchain Technology and Future",
        type: "webinar",
        date: "2024-11-10",
        time: "18:00",
        location: "Online (Microsoft Teams)",
        description: "Explore the future of blockchain beyond cryptocurrencies. Learn about enterprise applications, smart contracts, and emerging trends.",
        image: "webinar2.jpg",
        registrationLink: "https://includesgsits.tech/blockchainwebinar",
        featured: false,
        status: "past"
    },
    {
        id: 24,
        title: "Artificial Intelligence Ethics",
        type: "webinar",
        date: "2024-09-20",
        time: "16:30",
        location: "Online (Zoom)",
        description: "Discussion on ethical considerations in AI development and deployment. Addressing bias, transparency, and responsible AI practices.",
        image: "webinar3.jpg",
        registrationLink: "https://includesgsits.tech/aiethicswebinar",
        featured: false,
        status: "past"
    },
    {
        id: 25,
        title: "Tech Interview Preparation",
        type: "webinar",
        date: "2024-08-05",
        time: "17:00",
        location: "Online (Google Meet)",
        description: "Tips and strategies for technical interviews at top tech companies. Includes coding challenges, system design, and behavioral questions.",
        image: "webinar4.jpg",
        registrationLink: "https://includesgsits.tech/techinterviewwebinar",
        featured: false,
        status: "past"
    },
    {
        id: 26,
        title: "Open Source Contribution",
        type: "webinar",
        date: "2024-07-15",
        time: "18:00",
        location: "Online (Zoom)",
        description: "Learn how to contribute to open-source projects. Finding beginner-friendly issues, making pull requests, and working with the community.",
        image: "webinar5.jpg",
        registrationLink: "https://includesgsits.tech/opensourcewebinar",
        featured: false,
        status: "past"
    },
    {
        id: 27,
        title: "Quantum Computing Basics",
        type: "webinar",
        date: "2024-05-30",
        time: "17:30",
        location: "Online (Microsoft Teams)",
        description: "Introduction to quantum computing concepts, current state of technology, and potential applications in the near future.",
        image: "webinar6.jpg",
        registrationLink: "https://includesgsits.tech/quantumwebinar",
        featured: false,
        status: "past"
    },
    {
        id: 28,
        title: "Entrepreneurship in Tech",
        type: "webinar",
        date: "2025-04-15",
        time: "18:00",
        location: "Online (Zoom)",
        description: "Successful tech entrepreneurs share their journey, challenges, and insights for students interested in starting their own tech ventures.",
        image: "webinar7.jpg",
        registrationLink: "https://includesgsits.tech/entrepreneurshipwebinar",
        featured: true,
        status: "upcoming"
    }
];

// Function to format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to display events
function displayEvents() {
    const upcomingEventsContainer = document.getElementById('upcoming-events-container');
    const pastEventsContainer = document.getElementById('past-events-container');
    const noUpcomingEvents = document.getElementById('no-upcoming-events');
    const noPastEvents = document.getElementById('no-past-events');
    
    // Clear containers
    upcomingEventsContainer.innerHTML = '';
    pastEventsContainer.innerHTML = '';
    
    // Filter upcoming and past events
    const upcomingEvents = eventsData.filter(event => event.status === 'upcoming');
    const pastEvents = eventsData.filter(event => event.status === 'past');
    
    // Display upcoming events
    if (upcomingEvents.length > 0) {
        noUpcomingEvents.style.display = 'none';
        upcomingEvents.forEach(event => {
            const eventCard = createEventCard(event);
            upcomingEventsContainer.appendChild(eventCard);
        });
    } else {
        noUpcomingEvents.style.display = 'block';
    }
    
    // Display past events
    if (pastEvents.length > 0) {
        noPastEvents.style.display = 'none';
        pastEvents.forEach(event => {
            const eventCard = createEventCard(event);
            pastEventsContainer.appendChild(eventCard);
        });
    } else {
        noPastEvents.style.display = 'block';
    }
    
    // Initialize pagination for past events
    initializePagination(pastEvents, pastEventsContainer);
}

// Function to create event card
function createEventCard(event) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4 event-card';
    col.dataset.type = event.type;
    col.dataset.status = event.status;
    
    // Set event type badge color
    let badgeClass = 'bg-secondary';
    switch(event.type) {
        case 'hackathon':
            badgeClass = 'bg-danger';
            break;
        case 'coding':
            badgeClass = 'bg-success';
            break;
        case 'workshop':
            badgeClass = 'bg-warning';
            break;
        case 'webinar':
            badgeClass = 'bg-info';
            break;
    }
    
    // Format event type for display
    let eventTypeDisplay = event.type.charAt(0).toUpperCase() + event.type.slice(1);
    
    col.innerHTML = `
        <div class="card h-100 ${event.featured ? 'border-primary' : ''}">
            <div class="card-img-top position-relative">
                <img src="/images/${event.image}" class="img-fluid" alt="${event.title}">
                <span class="position-absolute top-0 end-0 badge ${badgeClass} m-2">${eventTypeDisplay}</span>
                ${event.featured ? '<span class="position-absolute top-0 start-0 badge bg-primary m-2">Featured</span>' : ''}
            </div>
            <div class="card-body">
                <h5 class="card-title">${event.title}</h5>
                <p class="card-text text-muted">
                    <i class="far fa-calendar-alt me-2"></i>${formatDate(event.date)}
                    <br>
                    <i class="far fa-clock me-2"></i>${event.time}
                    <br>
                    <i class="fas fa-map-marker-alt me-2"></i>${event.location}
                </p>
                <p class="card-text">${event.description.substring(0, 100)}...</p>
            </div>
            <div class="card-footer bg-transparent border-top-0">
                <button class="btn btn-outline-primary view-details" data-event-id="${event.id}">View Details</button>
            </div>
        </div>
    `;
    
    // Add event listener to view details button
    col.querySelector('.view-details').addEventListener('click', () => {
        showEventDetails(event);
    });
    
    return col;
}

// Function to initialize pagination
function initializePagination(events, container) {
    const eventsPerPage = 6;
    const totalPages = Math.ceil(events.length / eventsPerPage);
    const paginationContainer = document.getElementById('pagination-container');
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    paginationContainer.innerHTML = '';
    
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.className = 'pagination';
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = 'page-item disabled';
    prevLi.innerHTML = '<a class="page-link" href="#" tabindex="-1">Previous</a>';
    ul.appendChild(prevLi);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = i === 1 ? 'page-item active' : 'page-item';
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', function(e) {
            e.preventDefault();
            displayPage(events, container, i, eventsPerPage);
            
            // Update active class
            document.querySelectorAll('#pagination-container .page-item').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update previous/next buttons
            prevLi.classList.toggle('disabled', i === 1);
            nextLi.classList.toggle('disabled', i === totalPages);
        });
        ul.appendChild(li);
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item';
    nextLi.innerHTML = '<a class="page-link" href="#">Next</a>';
    ul.appendChild(nextLi);
    
    nav.appendChild(ul);
    paginationContainer.appendChild(nav);
    
    // Display first page
    displayPage(events, container, 1, eventsPerPage);
}

// Function to display a specific page of events
function displayPage(events, container, page, eventsPerPage) {
    const start = (page - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    const pageEvents = events.slice(start, end);
    
    container.innerHTML = '';
    pageEvents.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}

// Function to show event details in modal
function showEventDetails(event) {
    const modalTitle = document.getElementById('eventDetailModalLabel');
    const modalContent = document.getElementById('event-detail-content');
    const registerBtn = document.getElementById('register-event-btn');
    
    modalTitle.textContent = event.title;
    
    // Format event type for display
    let eventTypeDisplay = event.type.charAt(0).toUpperCase() + event.type.slice(1);
    
    // Set badge color
    let badgeClass = 'bg-secondary';
    switch(event.type) {
        case 'hackathon':
            badgeClass = 'bg-danger';
            break;
        case 'coding':
            badgeClass = 'bg-success';
            break;
        case 'workshop':
            badgeClass = 'bg-warning';
            break;
        case 'webinar':
            badgeClass = 'bg-info';
            break;
    }
    
    modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-6 mb-3">
                <img src="/images/${event.image}" class="img-fluid rounded" alt="${event.title}">
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <span class="badge ${badgeClass}">${eventTypeDisplay}</span>
                    ${event.featured ? '<span class="badge bg-primary ms-2">Featured</span>' : ''}
                </div>
                <p>
                    <strong><i class="far fa-calendar-alt me-2"></i>Date:</strong> ${formatDate(event.date)}<br>
                    <strong><i class="far fa-clock me-2"></i>Time:</strong> ${event.time}<br>
                    <strong><i class="fas fa-map-marker-alt me-2"></i>Location:</strong> ${event.location}
                </p>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <h5>About this Event</h5>
                <p>${event.description}</p>
            </div>
        </div>
    `;
    
    // Update register button
    registerBtn.href = event.registrationLink;
    if (event.status === 'past') {
        registerBtn.textContent = 'Event Completed';
        registerBtn.classList.remove('btn-primary');
        registerBtn.classList.add('btn-secondary');
        registerBtn.disabled = true;
    } else {
        registerBtn.textContent = 'Register Now';
        registerBtn.classList.remove('btn-secondary');
        registerBtn.classList.add('btn-primary');
        registerBtn.disabled = false;
    }
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
    modal.show();
}

// Filter events based on category
function filterEvents(filterType) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        if (filterType === 'all' || 
            (filterType === 'upcoming' && card.dataset.status === 'upcoming') ||
            (filterType === 'past' && card.dataset.status === 'past') ||
            card.dataset.type === filterType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.filter-btn[data-filter="${filterType}"]`).classList.add('active');
}

// Search functionality
function searchEvents(query) {
    const eventCards = document.querySelectorAll('.event-card');
    const searchQuery = query.toLowerCase();
    
    eventCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text:last-child').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display events
    displayEvents();
    
    // Set up filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            filterEvents(filterType);
        });
    });
    
    // Set up search functionality
    const searchInput = document.getElementById('event-search');
    searchInput.addEventListener('input', function() {
        searchEvents(this.value);
    });
    
    // Check if user is admin (for demo purposes)
    const isAdmin = false; // Set to true to show admin features
    if (isAdmin) {
        document.getElementById('admin-event-section').classList.remove('d-none');
        
        // Set up event listener for add event button
        document.getElementById('add-event-btn').addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('addEventModal'));
            modal.show();
        });
        
        // Set up event listener for save event button
        document.getElementById('save-event-btn').addEventListener('click', function() {
            // Implementation for saving new event would go here
            const modal = bootstrap.Modal.getInstance(document.getElementById('addEventModal'));
            modal.hide();
            
            // Show success message
            alert('Event saved successfully!');
        });
    }
});