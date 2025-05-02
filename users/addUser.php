<?php
header("content-type:application/json");
require_once("../connexion.php");
$response=["message"=>"","data"=>null];

//get the data
$last_Name = $_POST['ln'];
$first_Name = $_POST['fn'];
$email = $_POST['mai'];
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

if (($pExtention!="pdf")&&($pExtention!="jpg")&&($pExtention!="png")){

    $response["message"]="Proof format : ".$pExtention." is not supported please enter a pdf, a jpg or a png";
    
}else{
    
    $reqcheck="select * from users where email = :em";
    $checkEmail = $connexion->prepare($reqcheck);
    $checkEmail->bindParam(":em", $email);
    $checkEmail->execute();
    $emailExists = $checkEmail->fetchAll(PDO::FETCH_ASSOC);

    if ($emailExists) {

        $response["message"] = "Email already exists!";

    } else {
        $newpName=uniqid().'.'.$pExtention;
        $destp_path='C:/xampp/htdocs/backend/Proofs/proof'.$newpName;

        $up=move_uploaded_file($tem_path,$destp_path);

        if ($up){
            $reqsql="insert into users (last_name,first_name,email,region,address,number,role,proof,description) values (:ln,:fn,:em,:reg,:add,:num,:r,:p,:d)";

            $rp =$connexion->prepare($reqsql); 

            $rp->bindParam(":ln",$last_Name);
            $rp->bindParam(":fn",$first_Name);
            $rp->bindParam(":em",$email);
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
    }
}
echo json_encode($response);
?>