<?php
require_once("../connexion.php");

if (isset($_GET["annCode"])) {
    $sql = "SELECT annCode, donId, content, img, dateC, deadline FROM announcement WHERE annCode = :annCode";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([":annCode" => $_GET["annCode"]]);
    $announcement = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($announcement) {
        echo json_encode($announcement);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Announcement not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing annCode parameter"]);
}
?>
