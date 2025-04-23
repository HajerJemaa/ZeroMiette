<?php
header("Content-Type: application/json");
require_once("../connexion.php");
$resultat=["message"=>"" , "data"=>null];
if(!isset($_GET['state'])){
    $resultat["message"] = "Paramètres 'state' manquants";
    echo json_encode($resultat);
    exit();    
}

$state=$_GET['state'];
$reqsql="SELECT * FROM announcement WHERE state = :state ORDER BY deadline ASC";
$rp = $connexion->prepare($reqsql);
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