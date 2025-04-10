<?php
session_start();
require_once("../connexion.php");

header("Content-Type: application/json");
$result = ["message" => "", "success" => false];

// Récupérer les données de la requête PUT
$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (!isset($_SESSION['userId']) || !isset($_SESSION['role'])) {
    $result["message"] = "Utilisateur non authentifié.";
    echo json_encode($result);
    exit;
}

$userId = $_SESSION['userId'];
$role = $_SESSION['role'];

if ($role === 'demandeur') {
    if (!isset($_SESSION['annCode'])) {
        $result["message"] = "annCode manquant pour le demandeur.";
        echo json_encode($result);
        exit;
    }

    $annCode = $_SESSION['annCode'];
    $newDescription = $data['description'] ?? null;

    if (!empty($newDescription)) {
        // Préparer la requête pour mettre à jour la description et réinitialiser l'état à 'pending'
        $query = "UPDATE request 
                  SET description = ?, state = 'pending', dateC = CURRENT_TIMESTAMP 
                  WHERE userId = ? AND annCode = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sii", $newDescription, $userId, $annCode);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $result["message"] = "Description mise à jour, état remis à 'pending'.";
            $result["success"] = true;
        } else {
            $result["message"] = "Aucune modification détectée.";
        }
    } else {
        $result["message"] = "Description vide.";
    }

} elseif ($role === 'donneur') {
    $annCode = $putData['annCode'] ?? null;
    $targetUserId = $data['userId'] ?? null;
    $newState = $data['state'] ?? null;

    if (!$annCode || !$targetUserId || !in_array($newState, ['accepted', 'refused'])) {
        $result["message"] = "Paramètres manquants ou état invalide.";
        echo json_encode($result);
        exit;
    }

    // Vérifier si le donneur est bien propriétaire de l'annonce
    $checkQuery = "SELECT annCode FROM annonce WHERE annCode = ? AND donId = ?";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bind_param("ii", $annCode, $userId);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        // Mettre à jour l'état de la demande
        $updateQuery = "UPDATE request SET state = ? WHERE annCode = ? AND userId = ?";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bind_param("sii", $newState, $annCode, $targetUserId);
        $updateStmt->execute();

        if ($updateStmt->affected_rows > 0) {
            $result["message"] = "État de la demande mis à jour.";
            $result["success"] = true;
        } else {
            $result["message"] = "Aucun changement détecté.";
        }
    } else {
        $result["message"] = "Annonce non autorisée.";
    }

} else {
    $result["message"] = "Rôle inconnu.";
}

$conn->close();
echo json_encode($result);
