<?php
    include_once "config.php";
    $unique_id = mysqli_real_escape_string($conn, $_POST['unique_id']);
    $sql = "SELECT * FROM users WHERE unique_id = {$unique_id}";
    $query = mysqli_query($conn, $sql);
    if(mysqli_num_rows($query) > 0){
        $row = mysqli_fetch_assoc($query);
        echo json_encode(["success" => true, "unique_id" => $row['unique_id'], "fname" => $row['fname'], "lname" => $row['lname'], "img" => $row['img'], "status" => $row['status']]);
    }else{
        echo json_encode(["error" => "User not found!"]);
    }
?>
