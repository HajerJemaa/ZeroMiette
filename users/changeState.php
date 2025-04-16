<?php
header("content-Type:application/json");
$resultat=["message"=>""];
require_once("../connexion.php");

parse_str(file_get_contents("php://input"), $putData);
if (!isset($putData['userId'])) {
    $resultat["message"] = "Missing user ID";
    echo json_encode($resultat);
    exit;
}

$userId = $putData['userId'];
$State = $putData['state'];

$reqsql = "UPDATE users SET state = :s, address = :address WHERE userId = :id";

$rp = $connexion->prepare($sql);

$stmt->bindParam(':s', $State);
$stmt->bindParam(':di', $userId);

if ($stmt->execute()) {
    $resultat["message"] = "User State updated successfully";
} else {
    $resultat["message"] = "Failed to update user State";
}

echo json_encode($resultat);
?>