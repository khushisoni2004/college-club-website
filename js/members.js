// Member data arrays
const seniors = [
    { name: "Rashiii✨ Mam", role: "Senior", image: "rashi.jpeg", linkedin: "#" },
    { name: "Rashmi Mam", role: "Senior", image: "", linkedin: "#" },
    { name: "Rishi Raghuwanshi Sir", role: "Senior", image: "rishi.jpeg", linkedin: "#" },
    { name: "Sahi Sangtani Sir", role: "Senior", image: "profile.jpg", linkedin: "#" },
    { name: "Sanskar Sharma", role: "Senior", image: "sanskar.jpeg", linkedin: "#" },
    { name: "Teesha Dembla", role: "Senior", image: "teesha.jpeg", linkedin: "#" },
    { name: "Vanshul Sir", role: "Senior IT", image: "vanshul.jpeg", linkedin: "#" },
    { name: "Vishal Mandele", role: "Senior", image: "vishal.jpeg", linkedin: "#" },
    { name: "Yash Rughwani Sir", role: "Senior", image: "yashraghuwanshi.jpeg", linkedin: "#" },
    { name: "Kaustubh Sir", role: "Senior", image: "profile.jpg", linkedin: "#" },
    { name: "Kishan Sir", role: "Senior", image: "kishan.jpeg", linkedin: "#" },
    { name: "Kurnika Bhawel Mam", role: "Senior", image: "profile.jpg", linkedin: "#" },
    { name: "Manasvi", role: "Senior", image: "manasvi.jpeg", linkedin: "#" },
    { name: "Moksha Sir", role: "Senior", image: "profile.jpg", linkedin: "#" },
    { name: "Muskan Gupta Mam", role: "Senior", image: "profile.jpg", linkedin: "#" },
    { name: "Pavesh Sir", role: "Senior IT", image: "", linkedin: "#" },
    { name: "Piyush Sir", role: "Senior", image: "piyush.jpeg", linkedin: "#" },
    { name: "Raghav Agrawal", role: "Senior", image: "raghavagrawal.jpeg", linkedin: "#" },
    { name: "Raj Verma Sir", role: "Senior IT", image: "raj.jpeg", linkedin: "#" },
    { name: "Abhishek Verma", role: "Senior", image: "abhishek.jpeg", linkedin: "#" },
    { name: "Adarsh Langde", role: "Senior", image: "adarsh.jpeg", linkedin: "#" },
    { name: "Apoorva Mam", role: "Senior", image: "apoorva.jpeg", linkedin: "#" },
    { name: "Arin Zingade", role: "Senior", image: "arin.jpej", linkedin: "#" },
    { name: "Dipanshu Namdev", role: "Senior", image: "deepanshu.jpeg", linkedin: "#" },
    { name: "Faraz Khan", role: "Senior", image: "profile.jpg", linkedin: "#" },
    { name: "Isha", role: "Senior", image: "profile.jpg", linkedin: "#" },
    { name: "Kanishk Sir", role: "Senior", image: "kanishkgupta.jpeg", linkedin: "#" },
    { name: "Kanishka", role: "Senior IT", image: "kanishkagupta.jpeg", linkedin: "#" },
    { name: "Raghav Birla", role: "Senior IT", image: "raghavbirla.jpeg", linkedin: "#" }
];

const juniors = [
    { name: "Hemant Dixit", role: "Junior IT", image: "hemantdixit.jpeg", linkedin: "#" },
    { name: "Hitakshi Gupta", role: "Junior IT", image: "profile.jpg", linkedin: "#" },
    { name: "Murtaza Sadriwala", role: "Junior IT", image: "murtaza.jpeg", linkedin: "#" },
    { name: "Neel Desai", role: "Junior IT", image: "neeldesai.jpeg", linkedin: "#" },
    { name: "Ojasv", role: "Junior IT", image: "profile.jpg", linkedin: "#" },
    { name: "Saloni Jain", role: "Junior IT", image: "salonijain.jpeg", linkedin: "#" },
    { name: "Sushil Sethiya", role: "Junior IT", image: "profile.jpg", linkedin: "#" },
    { name: "Vaibhav Singh Tomar", role: "Junior IT", image: "profile.jpg", linkedin: "#" },
    { name: "Yameesh Nayak", role: "Junior IT", image: "yameesh.jpeg", linkedin: "#" },
    { name: "Aditya Rathore", role: "Junior IT", image: "profile.jpg", linkedin: "#" },
    { name: "Atharva Jain", role: "Junior IT", image: "atharav.jpeg", linkedin: "#" },
    { name: "Dilpreet Singh Gill", role: "Junior IT", image: "dilpreet.jpeg", linkedin: "#" }
];

/**
 * Renders member cards to the specified container
 * @param {Array} members - Array of member objects
 * @param {string} containerId - ID of the container to render members into
 */
function renderMembers(members, containerId) {
    const container = document.getElementById(containerId);
    
    // Clear existing content if any
    container.innerHTML = '';
    
    members.forEach(member => {
        const div = document.createElement("div");
        div.className = "member";
        
        // Handle missing images by using default profile image
        const imageUrl = member.image ? member.image : "profile.jpg";
        
        div.innerHTML = `
            <img src="${imageUrl}" alt="${member.name}" onerror="this.src='profile.jpg'">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
            <a href="${member.linkedin}" target="_blank">
                <i class="fab fa-linkedin"></i> LinkedIn
            </a>
        `;
        container.appendChild(div);
    });
}

/**
 * Enables filtering of members by name
 * @param {string} searchTerm - The search term to filter by
 */
function filterMembers(searchTerm) {
    if (!searchTerm) {
        renderMembers(seniors, "seniors");
        renderMembers(juniors, "juniors");
        return;
    }
    
    const filteredSeniors = seniors.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredJuniors = juniors.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    renderMembers(filteredSeniors, "seniors");
    renderMembers(filteredJuniors, "juniors");
    
    // Update section titles to show results count
    document.querySelector('h2:nth-of-type(1)').textContent = 
        `Seniors & Faculty (${filteredSeniors.length})`;
    document.querySelector('h2:nth-of-type(2)').textContent = 
        `Juniors (${filteredJuniors.length})`;
}

/**
 * Sort members by name alphabetically
 * @param {string} order - 'asc' for ascending, 'desc' for descending
 */
function sortMembersByName(order = 'asc') {
    const sortedSeniors = [...seniors].sort((a, b) => {
        if (order === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    
    const sortedJuniors = [...juniors].sort((a, b) => {
        if (order === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    
    renderMembers(sortedSeniors, "seniors");
    renderMembers(sortedJuniors, "juniors");
}

/**
 * Initialize the page by adding search and sort functionality
 */
function initializeMembersPage() {
    // Render initial members lists
    renderMembers(seniors, "seniors");
    renderMembers(juniors, "juniors");
    
    // Add search functionality
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box mb-4 mt-3';
    searchBox.innerHTML = `
        <div class="input-group">
            <span class="input-group-text">
                <i class="fas fa-search"></i>
            </span>
            <input type="text" class="form-control" id="memberSearch" 
                   placeholder="Search members...">
        </div>
    `;
    
    // Add sort functionality
    const sortControls = document.createElement('div');
    sortControls.className = 'sort-controls mb-4';
    sortControls.innerHTML = `
        <div class="btn-group">
            <button class="btn btn-outline-primary" id="sortAsc">
                <i class="fas fa-sort-alpha-down"></i> A-Z
            </button>
            <button class="btn btn-outline-primary" id="sortDesc">
                <i class="fas fa-sort-alpha-up"></i> Z-A
            </button>
        </div>
    `;
    
    // Insert search and sort at the top of the container
    const container = document.querySelector('.container');
    container.insertBefore(sortControls, container.firstChild);
    container.insertBefore(searchBox, container.firstChild);
    
    // Update section titles to show member counts
    document.querySelector('h2:nth-of-type(1)').textContent = 
        `Seniors & Faculty (${seniors.length})`;
    document.querySelector('h2:nth-of-type(2)').textContent = 
        `Juniors (${juniors.length})`;
    
    // Add event listeners
    document.getElementById('memberSearch').addEventListener('input', e => {
        filterMembers(e.target.value);
    });
    
    document.getElementById('sortAsc').addEventListener('click', () => {
        sortMembersByName('asc');
    });
    
    document.getElementById('sortDesc').addEventListener('click', () => {
        sortMembersByName('desc');
    });
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeMembersPage);