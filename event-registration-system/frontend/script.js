document.querySelector("form").addEventListener("submit", function(event) {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (fullName === "" || email === "" || phone === "") {
        alert("Please fill out all required fields.");
        event.preventDefault();
    }
});
