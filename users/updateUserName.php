<?php
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("content-type:application/json");

require_once("../connexion.php");

$response=["message"=>"","data"=>null];

$putData=json_decode(file_get_contents("php://input"),true);

$id=$putData['userId'];
$pwd=$putData['pwd'];
$user_name=$putData['user_name'];

$hashedpwd = password_hash($pwd, PASSWORD_BCRYPT);

$reqsql="Update users set user_name = :un where userid = :id";

$rp =$connexion->prepare($reqsql); 

$rp->bindParam(":id",$id);
$rp->bindParam(":un",$user_name);
$rp->bindParam(":pass",$hashedpwd);

$r=$rp->execute();

if ($r){
    $response["message"]="success";
}else {
    $response["message"]="failure to create account!!!";
}

echo json_encode($response);
?>