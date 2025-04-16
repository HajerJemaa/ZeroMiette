<?php
header("Content-Type: application/json");
require_once("../connexion.php");

$sql = "SELECT annCode, donId, content, img, dateC, deadline FROM announcement";
$stmt = $connexion->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
?>
