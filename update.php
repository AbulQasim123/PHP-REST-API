<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    $data = json_decode(file_get_contents("php://input"),true);

    $id = $data['sid'];
    $name = $data['sname'];
    $age = $data['sage'];
    $city = $data['scity'];

    include "config.php";
    
    $sql = "UPDATE students SET name = '{$name}', age = {$age}, city = '{$city}' WHERE id = {$id}";
    $stmt = $conn->prepare($sql);
    if($stmt->execute()){
        echo json_encode(array('Message' => 'Student Record Updated', 'Status' => true));
    }else{
        echo json_encode(array('Message' => 'Record Not Updated', 'Status' => false));
    }
?>