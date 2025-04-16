<?php
// Vérification pour les requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

switch($_SERVER["REQUEST_METHOD"]){
    case 'POST':require("addUser.php");break;
    case 'GET' :
        if (isset ($_GET['id']) && $_GET['id']!=null){
            require("getOneUser.php");break;
        }else if (isset ($_GET['state']) && $_GET['state']!='null'){
            require("getAllUserbyState.php");break;
        }
    case 'DELETE':
        if (isset ($_GET['id']) && $_GET['id']!=null)
            require("deleteUser.php");break;
}
?>