<?php
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("content-type:application/json");

require_once("../connexion.php");

$response=["token"=>"","user"=>["userId"=>"","name"=>"","email"=>"","role"=>""],"expires"=>3600];

require '../vendor/autoload.php';

use Firebase\JWT\JWT;  //used to create tokens


$body =file_get_contents("php://input");
$data= json_decode($body, true);
$state="accepted";

$reqsql="select userId,first_name,last_name,role,pwd from users where email=:e and state=:s";

$rp =$connexion->prepare($reqsql); 

$rp->bindParam(":e",$data["email"]);
$rp->bindParam(":s",$state);


$r=$rp->execute();

$r=$rp->fetch(PDO::FETCH_ASSOC);

if ($r && password_verify($data["password"],$r["pwd"])){
    $secretKey = bin2hex(random_bytes(32)); 
    $issued = time();
    $expire = $issued+3600;
    $tokendata=["issAt"=>$issued,"exp"=>$expire,"userId"=>$r["userId"],"email"=>$data["email"],"role"=>$r["role"],];

    $jwt = JWT::encode($tokendata, $secretKey, 'HS256');

    $response["token"]=$jwt;
    $response["user"]["userId"]=$r["userId"];
    $response["user"]["name"]=$r["first_name"]." ".$r["last_name"];
    $response["user"]["role"]=$r["role"];
    $response["user"]["email"]=$data["email"];

    echo json_encode($response);
}else {
    echo json_encode(["error"=>'Invalid email or password']);
}

?>