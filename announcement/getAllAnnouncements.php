<?php
header("Content-Type: application/json");
require_once("../connexion.php");

$sql = "SELECT annCode, donId,title, content, img, dateC, deadline,quantity FROM announcement";
$stmt = $connexion->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
?>
