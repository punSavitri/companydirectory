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

// // setting the start from value
// $start = 0;
// // setting the number of rows to display on a page
// $num_per_page = 5;
// //get the total number of rows
// $records = $mysqli->query('SELECT id, firstName, lastName, email, jobTitle, departmentID FROM personnel');
// $num_of_rows = $records-> num_rows;
// // calculating the number of pages
// $pages = ceil($num_of_rows / $num_per_page);
//  SQL does not accept parameters and so is not prepared
$query = 'SELECT id, firstName, lastName, email, jobTitle, departmentID FROM personnel ORDER BY firstName LIMIT 5';

$result = $conn->query($query);

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
