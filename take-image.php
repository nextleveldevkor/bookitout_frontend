<?php 
$target_dir = "uploads/"; 
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]); 
$uploadOk = 1; 
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION); 
// Check if image file is a actual image or fake image 
if(isset($_POST["submit"])) { 
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]); 
    if($check !== false) { 
        echo "<center>File is an image - " . $check["mime"] . ".</center>"; 
        $uploadOk = 1; 
    } else { 
        echo "<center>File is not an image.</center>"; 
        $uploadOk = 0; 
    } 
} 
// Check if file already exists 
if (file_exists($target_file)) { 
    echo "<center>Sorry, file already exists.</center>"; 
    $uploadOk = 0; 
} 
// Check file size 
if ($_FILES["fileToUpload"]["size"] > 500000) { 
    echo "Sorry, your file is too large."; 
    $uploadOk = 0; 
} 
// Allow certain file formats 
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" 
&& $imageFileType != "gif" ) { 
    echo "<center>Sorry, only JPG, JPEG, PNG & GIF files are allowed.</center>"; 
    $uploadOk = 0; 
} 
// Check if $uploadOk is set to 0 by an error 
if ($uploadOk == 0) { 
    echo "<center>Sorry, your file was not uploaded.</center>"; 
// if everything is ok, try to upload file 
} else { 
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) { 
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded."; 
		echo "<img src='$target_file' hight='400' width='400'>"; 
    } else { 
        echo "Sorry, there was an error uploading your file."; 
    } 
} 
?> 
<center> 
<form action="upload.php" method="post" enctype="multipart/form-data"> 
    Select image to upload: 
    <input type="file" name="fileToUpload" id="fileToUpload"> 
    <input type="submit" value="Upload Image" name="submit"> 
</form> 
</center> 