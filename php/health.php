<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
  }

  $hostname = "127.0.0.1";
  $username = "u807707365_sachinchat";
  $password = "Sachinchat34241@@";
  $dbname = "u807707365_sachinchatdb";

  $conn = mysqli_connect($hostname, $username, $password, $dbname);
  if (!$conn) {
    echo json_encode([
      "status" => "error",
      "message" => "Database connection failed",
      "error" => mysqli_connect_error(),
    ]);
    exit();
  }

  $dbSelected = mysqli_select_db($conn, $dbname);
  if (!$dbSelected) {
    echo json_encode([
      "status" => "error",
      "message" => "Database not found or not accessible",
      "error" => mysqli_error($conn),
    ]);
    exit();
  }

  echo json_encode([
    "status" => "ok",
    "message" => "Server and database connected",
    "db" => $dbname,
  ]);
?>
