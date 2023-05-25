<?php
// remove next two lines for production   

ini_set('display_errors', 'On');

error_reporting(E_ALL);

$executionStartTime = microtime(true);

include("config.php");

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);


if (mysqli_connect_errno()) {


    $output['status']['code'] = "300";

    $output['status']['name'] = "failure";

    $output['status']['description'] = "database unavailable";

    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;
}

$query = 'SELECT count(p.id) as departmentCount, d.name as departmentName FROM personnel p LEFT JOIN department d ON ( d.id = p.departmentID) WHERE d.id =  ?';
$query->execute();


if (false === $query) {

    $output['status']['code'] = "400";

    $output['status']['name'] = "executed";

    $output['status']['description'] = "query failed";

    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;
}



$output['status']['code'] = "200";

$output['status']['name'] = "ok";

$output['status']['description'] = "success";

$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

$output['data'] = [];

mysqli_close($conn);


header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
