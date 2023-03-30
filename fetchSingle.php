<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');

    include "config.php";

    $data = json_decode(file_get_contents("php://input"),true);
    $student_id = $data['sid'];

    $sql = "SELECT * FROM students WHERE id = {$student_id}";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if($stmt->rowCount()){
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }else{
        echo json_encode(array('Message' => 'No Record Found', 'Status' => false));
    }

?>