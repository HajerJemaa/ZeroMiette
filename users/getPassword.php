<?php
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("content-type:application/json");

require_once("../connexion.php");




$email=$_GET["email"];
$pass=$_GET["pass"];

$reqsql="select pwd from users where email=:e";

$rp =$connexion->prepare($reqsql); 

$rp->bindParam(":e",$email);

$r=$rp->execute();

$r=$rp->fetch(PDO::FETCH_ASSOC);

if ($r && password_verify($pass,$r["pwd"])){

    echo json_encode(["succ"=>'your good to go']);
}else {
    echo json_encode(["error"=>'Invalid email or password']);
}

?>