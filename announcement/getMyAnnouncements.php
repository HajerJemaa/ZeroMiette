<?php
header("Content-Type: application/json");
require_once("../connexion.php");

if (isset($_GET["donId"])) {
    $sql = "SELECT annCode, donId, content, img, dateC, deadline FROM announcement WHERE donId = :donId";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([":donId" => $_GET["donId"]]);
    $announcements = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($announcements) {
        echo json_encode($announcements);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "No announcements found for this donor"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing donId parameter"]);
}
?>
