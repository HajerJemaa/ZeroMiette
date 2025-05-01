<?php
header("Content-Type: application/json");
require_once("../connexion.php");
if (isset($_GET["annCode"]) && isset($_GET["requestId"]) && isset($_GET["state"])) {
    $annCode = $_GET["annCode"];
    $requestId = $_GET["requestId"];
    $state = $_GET["state"];
    if (!in_array($state, ["accept", "refuse"])) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid state. Use 'accept' or 'refuse'"]);
        exit();
    }
    $sql = "SELECT * FROM request WHERE annCode = :annCode AND requestId = :requestId";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([":annCode" => $annCode, ":requestId" => $requestId]);
    $request = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($request) {
        if ($request["state"] == "accepted" && $state == "accept") {
            http_response_code(400);
            echo json_encode(["message" => "This request has already been accepted"]);
        } elseif ($request["state"] == "refused" && $state == "refuse") {
            http_response_code(400);
            echo json_encode(["message" => "This request has already been refused"]);
        } else {
            $newState = $state == "accept" ? "accepted" : "refused";
            $updateSql = "UPDATE request SET state = :newState WHERE annCode = :annCode AND requestId = :requestId";
            $updateStmt = $connexion->prepare($updateSql);
            $updateStmt->execute([":newState" => $newState, ":annCode" => $annCode, ":requestId" => $requestId]);
            echo json_encode(["message" => "Request has been $newState"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Request not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing annCode, requestId, or state parameter"]);
}
?>
