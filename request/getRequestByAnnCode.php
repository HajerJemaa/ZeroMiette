<?php
header("Content-Type: application/json");
require_once("../connexion.php");

if (isset($_GET["annCode"])) {
    $sql = "SELECT * FROM request WHERE annCode = :annCode";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([":annCode" => $_GET["annCode"]]);
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($requests) {
        echo json_encode($requests);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "No requests found for this annCode"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing annCode parameter"]);
}
?>
