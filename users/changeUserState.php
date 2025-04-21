<?php
header("content-Type:application/json");
$response=["message"=>"", "data"=>null];
require_once("../connexion.php");

$putData=json_decode(file_get_contents("php://input"),true);

if (!isset($putData['userId'])) {
    $response["message"] = "Missing user ID";
    echo json_encode($response);
    exit;
}

$userId = $putData['userId'];

$reqsql = "UPDATE users SET state = 'accepted' WHERE userId = :id";

$rp = $connexion->prepare($reqsql);

$rp->bindParam(':id', $userId);
$r=$rp->execute();

if ($r) {
    $response["message"] = "success";
} else {
    $response["message"] = "failure";
}

echo json_encode($response);
?>