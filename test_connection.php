<?php
include 'db_connect.php';

if ($conn->ping()) {
    echo "Connection is active!";
} else {
    echo "Error: " . $conn->error;
}
?>
