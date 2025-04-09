<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "aasha";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$username = $_POST['username'];
$password = $_POST['password'];

// Simple query to check login
$sql = "SELECT * FROM mentors WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    // Login successful
    header("Location: mentor-dashboard.html");
    exit();
} else {
    echo "<script>alert('Invalid Credentials'); window.location.href='mentor-login.html';</script>";
}

$conn->close();
?>