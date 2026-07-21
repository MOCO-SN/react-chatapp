<?php 
    include_once "config.php";
    $outgoing_id = mysqli_real_escape_string($conn, $_POST['unique_id']);
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);
    if(!empty($message)){
        $sql = mysqli_query($conn, "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg)
                                    VALUES ({$incoming_id}, {$outgoing_id}, '{$message}')") or die();
        echo json_encode(["success" => true]);
    }else{
        echo json_encode(["error" => "Message is required!"]);
    }
?>
