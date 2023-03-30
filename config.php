<?php
    $dsn = "mysql:host=localhost;dbname=php_rest_api";
    $root = "root";
    $pass = "";
    try {
        $conn = new PDO($dsn,$root,$pass);
        // echo "Connection Successfull.";
    } catch (\Exception $e) {
        $e->getMessage();
    }
    
?>