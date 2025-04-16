<?php
header("content-type:application/json");
require_once("../connexion.php");
$resultat=["message"=>"","data"=>null];

$reqsql="select * from users where userid=:t";

$rp=$connexion->prepare($reqsql);

$x=$_GET['id'];

$rp->bindParam(":t",$x);

$r=$rp->execute();
$r=$rp->fetch(PDO::FETCH_ASSOC);

if ($r){
    if (!is_null($r['proof'])){
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->buffer($r['proof']);
        $r['mime'] = $mime;
        $r['proof'] = base64_encode($r['proof']);
    }
    $resultat["message"]="success";
    $resultat["data"]=$r;
}else {
    $resultat["message"]="failure";
}

echo json_encode($r);
?>