<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    include "config.php";

    $sql = "SELECT * FROM students";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if($stmt->rowCount()){
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }else{
        echo json_encode(array('Message' => 'No Record Found', 'Status' => false));
    }
?>