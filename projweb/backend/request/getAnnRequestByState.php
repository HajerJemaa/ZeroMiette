<?php
header("Content-Type: application/json");
require_once("../connexion.php");
$resultat=["message"=>"" , "data"=>null];
if(!isset($_GET['annCode']) || !isset($_GET['state'])){
    $resultat["message"] = "Paramètres 'annCode' ou 'state' manquants";
    echo json_encode($resultat);
    exit();
    
}
$annCode=$_GET['annCode'];
$state=$_GET['state'];
$reqsql="SELECT * FROM request WHERE annCode = :annCode AND state = :state ORDER BY dateC ASC";
$rp = $connexion->prepare($reqsql);
$rp->bindParam(":annCode",$annCode);
$rp->bindParam(":state",$state);
$rp->execute();
$res=$rp->fetchAll(PDO::FETCH_ASSOC);
if($res){
    $resultat["message"]="success";
    $resultat["data"]=$res;
}else {
    $resultat["message"]="failure";
}

echo json_encode($resultat);
?>