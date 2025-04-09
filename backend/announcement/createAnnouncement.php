<?php
require_once("../connexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["donId"], $data["content"], $data["deadline"])) {
    $sql = "INSERT INTO announcement (donId, content, img, deadline) VALUES (:donId, :content, :img, :deadline)";
    $stmt = $connexion->prepare($sql);
    
    $stmt->execute([
        ":donId" => $data["donId"],
        ":content" => $data["content"],
        ":img" => isset($data["img"]) ? $data["img"] : null,
        ":deadline" => $data["deadline"]
    ]);

    echo json_encode(["message" => "Announcement created successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
}
?>
