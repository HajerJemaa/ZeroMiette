<?php
header("content-type:application/json");
// Appel du fichier de connexion
require_once("../connexion.php");
$resultat = ["message" => "", "data" => null];

// Récupérer l'ID de l'utilisateur et le code de l'annonce passés dans l'URL
$userId = $_GET['userId'];
$annCode = $_GET['annCode'];

// Vérifier si la demande avec cet ID et ce code d'annonce existe
$reqsql = "SELECT * FROM request WHERE userId = :userId AND annCode = :annCode";
// Préparer la requête SQL
$rp = $connexion->prepare($reqsql); 
// Lier les paramètres userId et annCode dans la requête SQL
$rp->bindParam(":userId", $userId);
$rp->bindParam(":annCode", $annCode);
// Exécuter la requête
$r = $rp->execute();
// Récupérer les résultats de la requête
$r = $rp->fetchAll(PDO::FETCH_ASSOC);

// Si la demande existe, procéder à la suppression
if ($r) {
    $reqsql2 = "DELETE FROM request WHERE userId = :userId AND annCode = :annCode";
    $rp2 = $connexion->prepare($reqsql2); 
    $rp2->bindParam(":userId", $userId);
    $rp2->bindParam(":annCode", $annCode);
    $r2 = $rp2->execute();
    
    // Vérifier si la requête a été exécutée avec succès
    if ($r2) {
        $resultat["message"] = "success";
    } else {
        $resultat["message"] = "failure";    
    }
} else {
    // Si la demande n'existe pas
    $resultat["message"] = "request not found";
}

// Retourner le résultat sous forme de JSON
echo json_encode($resultat);
?>
