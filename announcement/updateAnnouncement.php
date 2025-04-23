<?php
header("Content-Type: application/json");
require_once("../connexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["annCode"], $data["title"],$data["content"], $data["deadline"],$data["quantity"])) {
    $sql = "UPDATE announcement SET title = :title, content = :content, img = :img, deadline = :deadline ,quantity= :quantity WHERE annCode = :annCode";
    $stmt = $connexion->prepare($sql);
    
    $stmt->execute([
        ":annCode" => $data["annCode"],
        ":title" => $data["title"],
        ":content" => $data["content"],
        ":img" => isset($data["img"]) ? $data["img"] : null,
        ":deadline" => $data["deadline"],
        ":quantity" => $data["quantity"],
        
    ]);

    echo json_encode(["message" => "Announcement updated successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
}
?>
