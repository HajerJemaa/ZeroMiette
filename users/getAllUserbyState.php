<?php
header("content-Type:application/json");
$resultat=["message"=>"","data"=>null];
require_once("../connexion.php");

$reqsql="select * from users where state=:s";

$rp=$connexion->prepare($reqsql);

$x=$_GET['state'];

$rp->bindParam(":s",$x);

$r=$rp->execute();
$r=$rp->fetchAll(PDO::FETCH_ASSOC);

if ($r){
    foreach ($r as &$user) {
        if (!is_null($user['proof'])) {
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $user['proof'] = base64_encode($user['proof']);
            $mime = $finfo->buffer($user['proof']);
            $user['mime'] = $mime;
        }
    }
    $resultat["message"]="success";
    $resultat["data"]=$r;
}else {
    $resultat["message"]="failure";
}

echo json_encode($r);
?>