<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');

    $data = json_decode(file_get_contents("php://input"),true);
    // $nameSearch = $data['nameSearch'];

    $nameSearch = isset($_GET['search']) ? $_GET['search']: die();


    include "config.php";

    $sql = "SELECT * FROM students WHERE name LIKE '%{$nameSearch}%' OR age LIKE '%{$nameSearch}%' OR city LIKE '%{$nameSearch}%'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    if($stmt->rowCount()){
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }else{
        echo json_encode(array('Message' => 'No Search Found', 'Status' => false));
    }
?>