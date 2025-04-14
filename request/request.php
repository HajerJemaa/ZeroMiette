<?php
// Autoriser l'accès depuis l'origine (ex: frontend sur localhost)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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
        break;

    case 'PUT':
        require("updateRequest.php"); 
        break;

    case 'DELETE':
        require("deleteRequest.php");
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
?>