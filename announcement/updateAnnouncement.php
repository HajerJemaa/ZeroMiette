<?php
header("Content-Type: application/json");
require_once("../connexion.php");

$annCode   = $_POST['annCode'] ?? '';
$title     = $_POST['title'] ?? '';
$content   = $_POST['content'] ?? '';
$deadline  = $_POST['deadline'] ?? '';
$quantity  = $_POST['quantity'] ?? '';
$category  = $_POST['category'] ?? '';

if (!$annCode || !$title || !$content || !$deadline || !$quantity || !$category) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields."]);
    exit;
}

$img_url = null;
if (isset($_FILES['img']) && $_FILES['img']['error'] === 0) {
    $temp_path = $_FILES['img']['tmp_name'];
    $img_name = $_FILES['img']['name'];
    $img_ext = strtolower(pathinfo($img_name, PATHINFO_EXTENSION));
    $allowed_exts = ['jpg', 'jpeg', 'png'];

    if (!in_array($img_ext, $allowed_exts)) {
        http_response_code(400);
        echo json_encode(["error" => "Unsupported image format."]);
        exit;
    }

    $new_img_name = uniqid() . '.' . $img_ext;
    $dest_path = "C:/xampp/htdocs/backend/don/" . $new_img_name;
    $img_url = "http://localhost/backend/don/" . $new_img_name;

    if (!move_uploaded_file($temp_path, $dest_path)) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to upload image."]);
        exit;
    }
}

// Build SQL
if ($img_url) {
    $sql = "UPDATE announcement SET title = :title, content = :content, deadline = :deadline, quantity = :quantity, category = :category, img = :img WHERE annCode = :annCode";
} else {
    $sql = "UPDATE announcement SET title = :title, content = :content, deadline = :deadline, quantity = :quantity, category = :category WHERE annCode = :annCode";
}

$stmt = $connexion->prepare($sql);

$stmt->bindParam(':title', $title);
$stmt->bindParam(':content', $content);
$stmt->bindParam(':deadline', $deadline);
$stmt->bindParam(':quantity', $quantity);
$stmt->bindParam(':category', $category);
$stmt->bindParam(':annCode', $annCode);

if ($img_url) {
    $stmt->bindParam(':img', $img_url);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Announcement updated successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to update announcement."]);
}

