<?php
    if (isset($_GET['file'])) {
        $file = basename($_GET['file']);
        $filepath = __DIR__ . '/Proofs/' . $file;
    
        if (file_exists($filepath)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream'); // forces download
            header('Content-Disposition: attachment; filename="' . $file . '"');
            header('Content-Length: ' . filesize($filepath));
            readfile($filepath);
            exit;
        } else {
            echo "File not found.";
        }
    }
?>