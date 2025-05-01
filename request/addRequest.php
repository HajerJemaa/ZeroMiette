<?php
header("content-type:application/json");
require_once("../connexion.php");

$resultat = ["message" => "", "data" => null];

// Récupération du corps de la requête
$body = file_get_contents("php://input");
$donnees = json_decode($body, true);

// Vérification si toutes les données nécessaires sont présentes
if (!isset($donnees['annCode']) || !isset($donnees['userId']) || !isset($donnees['description'])) {
    $resultat["message"] = "Données manquantes";
    echo json_encode($resultat);
    exit();
}
// Vérification d'existence
$check = $connexion->prepare("SELECT COUNT(*) FROM request WHERE annCode = :annCode AND userId = :userId");
$check->execute([
    ":annCode" => $donnees['annCode'],
    ":userId" => $donnees['userId'] 
]);

$exists = $check->fetchColumn();

if ($exists > 0) {
    $resultat["message"] = "Demande déjà existante";
    echo json_encode($resultat);
    exit();
}

// Requête SQL pour insérer une nouvelle demande
$reqsql = "INSERT INTO request (annCode, userId, description, quantity) VALUES (:annCode, :userId, :description,:quantity)";
$rp = $connexion->prepare($reqsql);

// Liaison des paramètres
$rp->bindParam(":annCode", $donnees['annCode']);
$rp->bindParam(":userId", $donnees['userId']);
$rp->bindParam(":description", $donnees['description']);
$rp->bindParam(":quantity", $donnees['quantity']);

// Exécution de la requête
$r = $rp->execute();

// Vérification du résultat de l'insertion
if ($r) {
    $resultat["message"] = "success";
    $resultat["data"] = [
        "annCode" => $donnees['annCode'],
        "userId" => $donnees['userId'],
        "description" => $donnees['description'],
        "quantity" => $donnees['quantity']
    ];
} else {
    $resultat["message"] = "failure";
}

// Retourner la réponse en JSON
echo json_encode($resultat);
?>
