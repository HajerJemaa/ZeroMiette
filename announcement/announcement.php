<?php

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
        }else if (isset($_GET['state']) && $_GET['state'] != null){
            require("getAnnouncementByState.php");
        } else if (isset($_GET['donId']) && $_GET['donId'] != null) {
            require("getMyAnnouncements.php");
        }else{
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
