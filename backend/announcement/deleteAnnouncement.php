<?php
require_once("../connexion.php");

if (isset($_GET["annCode"])) {
    $sql = "DELETE FROM announcement WHERE annCode = :annCode";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([":annCode" => $_GET["annCode"]]);

    echo json_encode(["message" => "Announcement deleted successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing annCode parameter"]);
}
?>
