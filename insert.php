<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods');

    $data = json_decode(file_get_contents("php://input"),true);

    $name = $data['sname'];
    $age = $data['sage'];
    $city = $data['scity'];

    include "config.php";

    $sql = "INSERT INTO students(name,age,city) VALUES ('{$name}',{$age} ,'{$city}')";
    $stmt = $conn->prepare($sql);
    if($stmt->execute()){
        echo json_encode(array('Message' => 'Student Record Inserted', 'Status' => true));
    }else{
        echo json_encode(array('Message' => 'No Record Inserted', 'Status' => false));
    }
?>