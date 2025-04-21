<?php
header("Content-Type: application/json");
require_once("../connexion.php");

$resultat = ["message" => "", "data" => null];

if (!isset($_GET['donId']) || !isset($_GET['state'])) {
    $resultat["message"] = "The 'donId' and 'state' parameters are required";
    echo json_encode($resultat);
    exit();
}

$donId = $_GET['donId'];
$state = $_GET['state'];

$reqsql = "SELECT * FROM announcement WHERE donId = :donId AND state = :state ORDER BY deadline ASC";
$rp = $connexion->prepare($reqsql);
$rp->bindParam(":donId", $donId);
$rp->bindParam(":state", $state);
$rp->execute();

$res = $rp->fetchAll(PDO::FETCH_ASSOC);

if ($res) {
    $resultat["message"] = "success";
    $resultat["data"] = $res;
} else {
    $resultat["message"] = "failure";
}

echo json_encode($resultat);
?>
