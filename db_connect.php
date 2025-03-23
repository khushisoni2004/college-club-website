<?php
$servername = "localhost";
$username = "root";  // Default for XAMPP
$password = "";      // Default is blank
$database = "final#include"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Database connection successful!";
}
?>
