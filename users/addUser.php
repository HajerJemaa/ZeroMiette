<?php
header("content-type:application/json");
require_once("../connexion.php");
$response=["message"=>"","data"=>null];

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

$hashedpwd = password_hash($pwd, PASSWORD_DEFAULT);

$reqsql="insert into users (last_name,first_name,user_name,email,pwd,region,address,number,role,proof,description) values (:ln,:fn,:un,:em,:pwd,:reg,:add,:num,:r,:p,:d)";

$rp =$connexion->prepare($reqsql); 

$rp->bindParam(":ln",$last_Name);
$rp->bindParam(":fn",$first_Name);
$rp->bindParam(":un",$user_name);
$rp->bindParam(":em",$email);
$rp->bindParam(":pwd",$hashedpwd);
$rp->bindParam(":reg",$region);
$rp->bindParam(":add",$address);
$rp->bindParam(":num",$number);
$rp->bindParam(":r",$role);
$rp->bindParam(":p",$proof);
$rp->bindParam(":d",$description);

$r=$rp->execute();

if ($r){
    $response["message"]="success";
}else {
    $response["message"]="failure";
}

echo json_encode($response);
?>