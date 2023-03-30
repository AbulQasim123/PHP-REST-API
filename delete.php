<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    $data = json_decode(file_get_contents("php://input"),true);
    $id = $data['sid'];

    include "config.php";
    
    $sql = "DELETE FROM students WHERE id = {$id}";
    $stmt = $conn->prepare($sql);
    if($stmt->execute()){
        echo json_encode(array('Message' => "Student Record Deleted", 'Status' => true));
    }else{
        echo json_encode(array('Message' => "Record Not Deleted", 'Status' => false));
    }
?>