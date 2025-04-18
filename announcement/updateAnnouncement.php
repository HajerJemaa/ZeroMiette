<?php
header("Content-Type: application/json");
require_once("../connexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["annCode"], $data["content"], $data["deadline"])) {
    $sql = "UPDATE announcement SET content = :content, deadline = :deadline WHERE annCode = :annCode";
    $stmt = $connexion->prepare($sql);
    
    $stmt->execute([
        ":annCode" => $data["annCode"],
        ":content" => $data["content"],
        ":deadline" => $data["deadline"]
    ]);

    echo json_encode(["message" => "Announcement updated successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
}
?>
