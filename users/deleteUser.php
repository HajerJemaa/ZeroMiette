<?php
header("content-type:application/json");
//calling the connexion file
require_once("../connexion.php");

$resultat=["message"=>"","data"=>null];

//recupering the value of the id passed with the url
$i=$_GET['id'];

//check whether the user with that id exist or not
$reqsql="select * from users where userid = :i";

//preparing the sql request
$rp =$connexion->prepare($reqsql); 

//binding the parametre i in the sql request with the variable i which has the id number
$rp->bindParam(":i",$i);

//executing the request
$r=$rp->execute();

//fetching the result of the request to check if it's null or not
$r=$rp->fetch(PDO::FETCH_ASSOC);

//if it's not null then delete if not error
if ($r){
    $reqsql2="delete from users where userid = :i";
    $rp2 =$connexion->prepare($reqsql2); 
    $rp2->bindParam(":i",$i);
    $r2=$rp2->execute();
    //checking if the req was executed or not if it was then it's a success else it's failure
    if($rp2){
        $resultat["message"]="success";
    }else{
        $resultat["message"]="failure";    
    }
}else {
    $resultat["message"]="does not exist";
}

echo json_encode($resultat);
?>