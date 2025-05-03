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
    case 'PUT':
        $putData=json_decode(file_get_contents("php://input"),true);
        if (($putData['userId']) && ($putData['userId']!=null)){
            if (isset($putData['pwd']) && isset($putData['state']) && $putData['state']!=null){
                        require("updateUserState.php");break;
            }else if(isset ($putData['pwd'])&& $putData['pwd']!=null){
                        require("updatePassword.php");break;
            }else if(isset($putData['user_name'])&&$putData['user_name']!=null){
                        require("updateUserName.php");break;
            }
        }else{
            $response["message"] = "Missing user ID";
            echo json_encode($response);
            break;
        }
    
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not authorised"]);
        break;
}
?>