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
$tem_path = $_FILES['proof']['tmp_name'];

if (isset($_POST["desc"])){
    $description = $_POST['desc'];
}else{
    $description=null;
}

$pName=$_FILES['proof']['name'];
$pSize=$_FILES['proof']['size'];
$Type=$_FILES['proof']['type'];
$pNameSplitExten=explode(".",$pName);
$pExtention=strtolower(end($pNameSplitExten));

$newpName=uniqid().'.'.$pExtention;
$destp_path='C:/xampp/htdocs/backend/Proofs/proof'.$newpName;

$up=move_uploaded_file($tem_path,$destp_path);

if ($up){
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
    $rp->bindParam(":p",$destp_path);
    $rp->bindParam(":d",$description);

    $r=$rp->execute();

    if ($r){
        $response["message"]="success";
    }else {
        $response["message"]="failure to create account!!!";
    }
}else{
    $response["message"]="Proof was not uploaded";
}

echo json_encode($response);
?>