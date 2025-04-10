<?php
header("content-Type:application/json");
$resultat=["message"=>"","data"=>null];
require_once("../connexion.php");
$reqsql="select * from users where state=:s";
$rp=$connexion->prepare($reqsql);
$x=$_GET['state'];
$rp->bindParam(":s",$x);
$r=$rp->execute();
$r=$rp->fetchAll(PDO::FETCH_ASSOC);
if ($r){
    $resultat["message"]="success";
    $resultat["data"]=$r;
}else {
    $resultat["message"]="failure";
}

echo json_encode($resultat);
?>