<?php
header("content-type:application/json");
require_once("connexion.php");
$resultat=["message"=>"","data"=>null];
//récupère le body
$body =file_get_contents("php://input");
$donnees= json_decode($body, true);
$reqsql="insert into users (last_name,first_name,user_name,email,pwd,region,address,number,role,proof,description,state) values (:ln,:fn,:un,:em,:pwd,:reg,:add,:num,:r,:p,:d,:s)";
$rp =$connexion->prepare($reqsql); 
$rp->bindParam(":ln",$donnees['last_name']);
$rp->bindParam(":fn",$donnees['first_name']);
$rp->bindParam(":un",$donnees['user_name']);
$rp->bindParam(":em",$donnees['email']);
$rp->bindParam(":pwd",$donnees['pwd']);
$rp->bindParam(":reg",$donnees['region']);
$rp->bindParam(":add",$donnees['address']);
$rp->bindParam(":num",$donnees['number']);
$rp->bindParam(":r",$donnees['role']);
$rp->bindParam(":p",$donnees['proof']);
$rp->bindParam(":d",$donnees['description']);
$rp->bindParam(":s",$donnees['state']);
$r=$rp->execute();
if ($r){
    $resultat["message"]="succes";
}else {
    $resultat["message"]="echec";
}
echo json_encode($resultat);
?>