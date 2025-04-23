<?php
header("content-type:application/json");
require_once("../connexion.php");
$response=["message"=>"","data"=>null];

$reqsql="select * from users where userid=:t";

$rp=$connexion->prepare($reqsql);

$x=$_GET['id'];

$rp->bindParam(":t",$x);

$r=$rp->execute();
$r=$rp->fetch(PDO::FETCH_ASSOC);

$p=$r['proof'];

if ($r){
    if (!is_null($r['proof'])){
        $pname=explode(".",$p);
        $extention=end($pname);
        $r["extention"] = $extention;
    }
    $resultat["message"]="success";
    $resultat["data"]=$r;
    echo json_encode($r);
}else {
    http_response_code(400);
}

echo json_encode($response);
?>