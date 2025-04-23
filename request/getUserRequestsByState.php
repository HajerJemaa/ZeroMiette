<?php
require_once("../connexion.php");

$resultat = ["message" => "", "data" => null];

// Vérifier que les paramètres nécessaires existent
if (!isset($_GET['userId']) || !isset($_GET['state'])) {
    $resultat["message"] = "Paramètres 'userId' ou 'state' manquants";
    echo json_encode($resultat);
    exit();
}

$userId = $_GET['userId'];
$state = $_GET['state'];

// Requête SQL : récupérer les demandes du user avec un état donné
$reqsql = "SELECT * FROM request 
        WHERE userId = :userId AND state = :state 
        ORDER BY dateC DESC";

$rp = $connexion->prepare($reqsql);
$rp->bindParam(":userId", $userId);
$rp->bindParam(":state", $state);
$rp->execute();
$res=$rp->fetchAll(PDO::FETCH_ASSOC);
if ($res){
    $resultat["message"]="success";
    $resultat["data"]=$res;
}else {
    $resultat["message"]="failure";
}

echo json_encode($resultat);
?>
