<?php
header("Content-Type: application/json");
require_once("../connexion.php");  

if (isset($_GET["annCode"]) && isset($_GET["userId"]) && isset($_GET["state"])) {
    $annCode = $_GET["annCode"];
    $userId = $_GET["userId"];
    $state = $_GET["state"];

  
    if ($state === 'accept' || $state === 'refuse') {
        $sql = "UPDATE request SET state = :state WHERE annCode = :annCode AND userId = :userId";
        $stmt = $connexion->prepare($sql);
        
        $stmt->execute([
            ':state' => $state,
            ':annCode' => $annCode,
            ':userId' => $userId
        ]);
        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "Request updated successfully", "state" => $state]);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Request not found or already updated"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid state value. Use 'accept' or 'refuse'"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing required parameters (annCode, userId, state)"]);
}
?>
