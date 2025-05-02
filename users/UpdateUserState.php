<?php
header("content-Type:application/json");
$response=["message"=>"", "data"=>null];
require_once("../connexion.php");

$putData=json_decode(file_get_contents("php://input"),true);

$userId = $putData['userId'];

if ((isset($putData['pwd']))&&($putData['pwd']!=null)){
    $pwd=$putData['pwd'];

    $hashedpwd = password_hash($pwd, PASSWORD_BCRYPT);


    $reqsql = "UPDATE users SET state = 'accepted' , pwd = :pwd WHERE userId = :id";
    $rp = $connexion->prepare($reqsql);

    $rp->bindParam(':id', $userId);
    $rp->bindParam(':pwd', $hashedpwd);

    $r=$rp->execute();

    if ($r) {
        $response["message"] = "success";
    } else {
        $response["message"] = "failure";
    }
}else{
    $reqsql = "UPDATE users SET state = 'pending' WHERE userId = :id";
    $rp = $connexion->prepare($reqsql);

    $rp->bindParam(':id', $userId);
    $r=$rp->execute();

    if ($r) {
        $response["message"] = "success";
    } else {
        $response["message"] = "failure";
    }
}


echo json_encode($response);
?>