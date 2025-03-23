const fetch = require("node-fetch");

// Function to test API endpoints
async function testAPI() {
    console.log("🚀 Running API Tests...");

    try {
        // 📌 Test Registration API (POST)
        const registerResponse = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullName: "John Doe",
                email: "johndoe@example.com",
                phone: "9876543210",
                rollNumber: "CS123",
                department: "Computer Science",
                year: "Final Year",
                reason: "I love hackathons",
                eventId: "EVT001",
                eventTitle: "CodeFusion 2025"
            }),
        });

        const registerData = await registerResponse.json();
        console.log("✅ Registration Response:", registerData);

        // 📌 Test Fetch All Registrations API (GET)
        const getResponse = await fetch("http://localhost:5000/api/event-registration");
        const getData = await getResponse.json();
        console.log("✅ Fetch Registrations Response:", getData);
        
    } catch (error) {
        console.error("❌ API Test Failed:", error);
    }
}

// Run the API Test
testAPI();
