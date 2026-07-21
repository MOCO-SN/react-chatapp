<?php
    include_once "config.php";
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    if(!empty($email) && !empty($password)){
        $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
        if(mysqli_num_rows($sql) > 0){
            $row = mysqli_fetch_assoc($sql);
            $user_pass = md5($password);
            $enc_pass = $row['password'];
            if($user_pass === $enc_pass){
                $status = "Active now";
                $sql2 = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id = {$row['unique_id']}");
                if($sql2){
                    echo json_encode(["success" => true, "unique_id" => $row['unique_id'], "fname" => $row['fname'], "lname" => $row['lname'], "img" => $row['img'], "status" => "Active now"]);
                }else{
                    echo json_encode(["error" => "Something went wrong. Please try again!"]);
                }
            }else{
                echo json_encode(["error" => "Email or Password is Incorrect!"]);
            }
        }else{
            echo json_encode(["error" => "$email - This email not Exist!"]);
        }
    }else{
        echo json_encode(["error" => "All input fields are required!"]);
    }
?>
