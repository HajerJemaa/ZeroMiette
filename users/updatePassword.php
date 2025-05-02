<?php
header("content-type:application/json");

require_once("../connexion.php");

$response=["message"=>"","data"=>null];

$putData=json_decode(file_get_contents("php://input"),true);

/*
if (!isset($putData['userId'])) {
    $response["message"] = "Missing user ID";
    echo json_encode($response);
    exit;
}*/

$id=$putData['userId'];
$pwd=$putData['pwd'];

$hashedpwd = password_hash($pwd, PASSWORD_BCRYPT);

$reqsql="Update users set pwd = :pass where userid = :id";

$rp =$connexion->prepare($reqsql); 

$rp->bindParam(":id",$id);
$rp->bindParam(":pass",$hashedpwd);

$r=$rp->execute();

if ($r){
    $response["message"]="success";
}else {
    $response["message"]="failure to create account!!!";
}

echo json_encode($response);
?>