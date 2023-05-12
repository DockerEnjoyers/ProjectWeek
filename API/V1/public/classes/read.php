<?php
	global $database;

	//Read the entry from the database.
	$result = $database->query("SELECT * FROM class WHERE class_id = '" . $args["class_id"] . "'");

	//Return a 404 response if no entry was found by the query.
	if (!$result || $result === true || $result->num_rows == 0) {
		http_response_code(404);
		die("No such classes.");
	}

	//Fetch and output the entry.
	$class = $result->fetch_assoc();

	echo json_encode($class);
?>