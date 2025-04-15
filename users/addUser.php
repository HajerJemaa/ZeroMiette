<?php
header("content-type:application/json");
require_once("../connexion.php");
$resultat=["message"=>"","data"=>null];
//get the data 
$last_Name = $_POST['ln'];
$first_Name = $_POST['fn'];
$user_name = $_POST['un'];
$email = $_POST['mai'];
$pwd = $_POST['pwd'];
$region = $_POST['region'];
$address = $_POST['add'];
$number = $_POST['num'];
$role = $_POST['rad'];
$proof = file_get_contents($_FILES['proof']['tmp_name']);
$description = $_POST['desc'];
$reqsql="insert into users (last_name,first_name,user_name,email,pwd,region,address,number,role,proof,description) values (:ln,:fn,:un,:em,:pwd,:reg,:add,:num,:r,:p,:d)";
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
$r=$rp->execute();
if ($r){
    $resultat["message"]="success";
}else {
    $resultat["message"]="failure";
}
echo json_encode($resultat);
?>