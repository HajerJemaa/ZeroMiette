<?php
header("content-type:application/json");
require_once("../connexion.php");
$resultat=["message"=>"","data"=>null];
$reqsql="select * from users where userid=:t";
$rp=$connexion->prepare($reqsql);
$x=$_GET['id'];
$rp->bindParam(":t",$x);
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