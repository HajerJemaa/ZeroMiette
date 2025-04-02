<?php
header("content-Type:application/json");
$resultat=["message"=>"","data"=>null];
require_once("../connexion.php");
$reqsql="select * from users where state='accepted'";
$rp=$connexion->prepare($reqsql);
$r=$rp->execute();
$r=$rp->fetchAll(PDO::FETCH_ASSOC);
if ($r){
    $resultat["message"]="succes";
    $resultat["data"]=$r;
}else {
    $resultat["message"]="echec";
}

echo json_encode($resultat);
?>