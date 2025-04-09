<?php
include 'db/dbconnect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username']; // form ke name="username" se aaya hai
    $email = $_POST['email'];
    $password = $_POST['password']; // Plain password, no hash

    // Insert into students table with correct column names
    $stmt = $conn->prepare("INSERT INTO students (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);
    $stmt->execute();

    if ($stmt->affected_rows === 1) {
        echo "<script>alert('Signup successful'); window.location.href='login.html';</script>";
    } else {
        echo "<script>alert('Signup failed'); window.location.href='signup.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>