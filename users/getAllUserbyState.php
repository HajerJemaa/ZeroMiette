<?php
header("content-Type:application/json");
$response=["message"=>"","data"=>null];
require_once("../connexion.php");

$reqsql="select * from users where state=:s and role!=:r";

$rp=$connexion->prepare($reqsql);

$x=$_GET['state'];
$ro="administrator";

$rp->bindParam(":s",$x);
$rp->bindParam(":r",$ro);

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
    $response["message"]="success";
    $response["data"]=$r;
}else {
    $response["message"]="failure";
}

echo json_encode($response);
?>