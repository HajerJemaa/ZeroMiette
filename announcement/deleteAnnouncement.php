<?php
header("Content-Type: application/json");
require_once("../connexion.php");

if (isset($_GET["annCode"])) {
    $annCode = $_GET["annCode"];

    // Step 1: Get image URL for the announcement
    $stmt = $connexion->prepare("SELECT img FROM announcement WHERE annCode = :annCode");
    $stmt->execute([":annCode" => $annCode]);
    $announcement = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($announcement) {
        $img_url = $announcement["img"];

        // Step 2: Convert URL to file path
        // Example: http://localhost/backend/don/abc.jpg → C:/xampp/htdocs/backend/don/abc.jpg
        $img_path = str_replace("http://localhost", "C:/xampp/htdocs", $img_url);

        // Step 3: Delete the image file if it exists
        if (file_exists($img_path)) {
            unlink($img_path);
        }

        // Step 4: Delete the announcement from database
        $stmt = $connexion->prepare("DELETE FROM announcement WHERE annCode = :annCode");
        $stmt->execute([":annCode" => $annCode]);

        echo json_encode(["message" => "Announcement and image deleted successfully"]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Announcement not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing annCode parameter"]);
}
?>
