<?php
// Gestion des requêtes OPTIONS (préflight request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier le type de requête HTTP et rediriger vers le bon fichier
switch ($_SERVER["REQUEST_METHOD"]) {
    case 'POST': 
        require("addRequest.php"); 
        break;
    
    case 'GET':
        if (isset($_GET['userId']) && isset($_GET['state'])) {
            require("getUserRequestsByState.php"); 
        } elseif (isset($_GET['annCode'])&& isset($_GET['state'])) {
            require("getAnnRequestByState.php");
        } 
        elseif (isset($_GET['annCode'])) {
            require("getRequestByAnnCode.php");
        }
        break;

    case 'PUT':
        require("updateRequest.php"); 
        break;

    case 'DELETE':
        require("deleteRequest.php");
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not authorised"]);
        break;
}
?>