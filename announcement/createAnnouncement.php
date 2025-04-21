<?php
require_once("../connexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["donId"], $data["title"],$data["content"], $data["deadline"],$data["quantity"])) {
    $sql = "INSERT INTO announcement (donId,title ,content, img, deadline,quantity) VALUES (:donId,:title, :content, :img, :deadline,:quantity)";
    $stmt = $connexion->prepare($sql);
    
    $stmt->execute([
        ":donId" => $data["donId"],
        ":title" => $data["title"],
        ":content" => $data["content"],
        ":img" => isset($data["img"]) ? $data["img"] : null,
        ":deadline" => $data["deadline"],
        ":quantity" => $data["quantity"]
    ]);

    echo json_encode(["message" => "Announcement created successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
}
?>
