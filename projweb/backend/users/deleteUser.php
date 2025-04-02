<?php
header("content-type:application/json");
require_once("connexion.php");
$resultat=["message"=>"","data"=>null];
//récupère le body
$i=$_GET['id'];
$body =file_get_contents("php://input");
$donnees= json_decode($body, true);
$reqsql="select * from users where id = :i";
$rp =$connexion->prepare($reqsql); 
$rp->bindParam(":i",$i);
$r=$rp->execute();
$r=$rp->fetchAll(PDO::FETCH_ASSOC);
if ($r){
    $resultat["message"]="success";
    $reqsql2="delete from product where id = :i";
    $rp2 =$connexion->prepare($reqsql2); 
    $rp2->bindParam(":i",$i);
    $r2=$rp2->execute();
}else {
    $resultat["message"]="echec";
}
echo json_encode($resultat);
?>