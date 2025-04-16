<?php
header("content-Type:application/json");
$response=["message"=>"", "data"=>null];
require_once("../connexion.php");

parse_str(file_get_contents("php://input"), $putData);
if (!isset($putData['userId'])) {
    $response["message"] = "Missing user ID";
    echo json_encode($response);
    exit;
}

$userId = $putData['userId'];

$reqsql = "UPDATE users SET state = 'accepted' WHERE userId = :id";

$rp = $connexion->prepare($reqsql);

$rp->bindParam(':di', $userId);

if ($rp->execute()) {
    $response["message"] = "success";
} else {
    $response["message"] = "failure";
}

echo json_encode($response);
?>