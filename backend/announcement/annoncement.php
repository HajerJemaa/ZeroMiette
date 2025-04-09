<?php
// Autoriser l'accès depuis l'origine spécifique
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");

// Autoriser les méthodes HTTP (GET, POST, PUT, DELETE, OPTIONS)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Autoriser certains en-têtes dans la requête
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Vérification pour les requêtes OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'POST':
        require("createAnnouncement.php");
        break;

    case 'GET':
        if (isset($_GET['annCode']) && $_GET['annCode'] != null) {
            require("getOneAnnouncement.php");
        } else {
            require("getAllAnnouncements.php");
        }
        break;

    case 'PUT':
        require("updateAnnouncement.php");
        break;

    case 'DELETE':
        if (isset($_GET['annCode']) && $_GET['annCode'] != null) {
            require("deleteAnnouncement.php");
        }
        break;

    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(["message" => "Méthode non autorisée"]);
        break;
}
?>
