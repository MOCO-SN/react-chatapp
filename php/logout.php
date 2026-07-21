<?php
    include_once "config.php";
    $logout_id = mysqli_real_escape_string($conn, $_POST['logout_id']);
    if(isset($logout_id)){
        $status = "Offline now";
        $sql = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id={$logout_id}");
        if($sql){
            echo json_encode(["success" => true]);
        }else{
            echo json_encode(["error" => "Something went wrong. Please try again!"]);
        }
    }else{
        echo json_encode(["error" => "Logout ID is required!"]);
    }
?>
