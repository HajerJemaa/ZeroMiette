<?php
header("content-type:application/json");

require("../connexion.php"); // ou ton fichier de connexion

if (isset($_GET['userId']) && isset($_GET['annCode'])) {
    $userId = $_GET['userId'];
    $annCode = $_GET['annCode'];

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM request WHERE userId = ? AND annCode = ?");
    $stmt->execute([$userId, $annCode]);

    $exists = $stmt->fetchColumn() > 0;
    echo json_encode($exists);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Paramètres manquants"]);
}
