<?php
header("Content-Type: application/json");
require_once("../connexion.php");

$response = ["message" => "", "data" => null];

if (
    isset($_POST["donId"], $_POST["title"], $_POST["content"], $_POST["deadline"], $_POST["quantity"], $_POST["category"])
    && isset($_FILES["img"])
) {
    $donId = $_POST["donId"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $deadline = $_POST["deadline"];
    $quantity = $_POST["quantity"];
    $category = $_POST["category"];

    $temp_path = $_FILES['img']['tmp_name'];
    $img_name = $_FILES['img']['name'];
    $img_size = $_FILES['img']['size'];
    $img_type = $_FILES['img']['type'];
    
    $img_ext = strtolower(pathinfo($img_name, PATHINFO_EXTENSION));
    $allowed_exts = ['jpg', 'jpeg', 'png'];

    if (!in_array($img_ext, $allowed_exts)) {
        http_response_code(400);
        $response["message"] = "Unsupported image format: $img_ext";
    } else {
        $new_img_name = uniqid() . '.' . $img_ext;
        $dest_path = "C:/xampp/htdocs/backend/don/" . $new_img_name;
        $img_url = "http://localhost/backend/don/" . $new_img_name;

        if (move_uploaded_file($temp_path, $dest_path)) {
            $sql = "INSERT INTO announcement (donId, title, content, img, deadline, quantity, category)
                    VALUES (:donId, :title, :content, :img, :deadline, :quantity, :category)";
            $stmt = $connexion->prepare($sql);

            $stmt->execute([
                ":donId" => $donId,
                ":title" => $title,
                ":content" => $content,
                ":img" => $img_url,
                ":deadline" => $deadline,
                ":quantity" => $quantity,
                ":category" => $category
            ]);

            $response["message"] = "Announcement created successfully";
            $response["data"] = ["img" => $img_url];
        } else {
            http_response_code(500);
            $response["message"] = "Failed to upload image";
        }
    }
} else {
    http_response_code(400);
    $response["message"] = "Missing required fields or image";
}

echo json_encode($response);
