<?php
    if (isset($_GET['file'])) {
        $file = basename($_GET['file']); //gets only the file name even if you give a whole path
        $filepath = __DIR__ . '/Proofs/' . $file; //__Dir__ gives the absolute path of the current location proofs id the directory in which the file is in
    
        if (file_exists($filepath)) {
            header('Content-Description: File Transfer');//telling the browser that we are doing a file transere
            header('Content-Type: application/octet-stream'); // forces download
            header('Content-Disposition: attachment; filename="' . $file . '"');//
            header('Content-Length: ' . filesize($filepath));//giving the file size so that the brouser shows the download progress bar accuretly
            readfile($filepath);//
            exit;
        } else {
            echo "File not found.";
        }
    }
?>