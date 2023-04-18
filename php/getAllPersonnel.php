<?php

// example use from browser
// http://localhost/companydirectory/libs/php/getAllPersonnel.php

// remove next two lines for production	

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

include("config.php");

header('Content-Type: application/json; charset=UTF-8');

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



//  SQL does not accept parameters and so is not prepared
$query = 'SELECT id, firstName, lastName, email, jobTitle, departmentID FROM personnel ORDER BY firstName';

$result = $conn->query($query);
// get the total number of rows in a table 
$num_of_rows = mysqli_num_rows($result);
// echo $num_of_rows;

// setting the number of rows to display in a page
$row_per_page = 20;

// calculating the number of pages 
$pages = ceil($num_of_rows / $row_per_page);
// echo $pages;



if (!$result) {

	$output['status']['code'] = "400";
	$output['status']['name'] = "executed";
	$output['status']['description'] = "query failed";
	$output['data'] = [];

	mysqli_close($conn);

	echo json_encode($output);

	exit;
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {

	array_push($data, $row);
}


$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $data;

mysqli_close($conn);

echo json_encode($output);
