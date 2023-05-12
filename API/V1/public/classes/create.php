<?php
	global $database;

	$data = json_decode(file_get_contents("php://input"), true);

	//Return a 400 response if no class information was provided in the request body.
	if (!$data) {
		http_response_code(400);
		die("Please provide the class information as a correct JSON object in the request body.");
	}

	//Make sure the required fields are provided.
	if (!isset($data["class_id"]) || !isset($data["class_name"]) || !isset($data["QV_year"])) {
		http_response_code(400);
		die("You must provide the attributes \"class_id\", \"class_name\" and \"QV_year\".");
	}

	//Insert the data into the database.
	$result = $database->query("INSERT INTO class(class_id, class_name, QV_year) VALUES('" . $data["class_id"] . "', " . $data["class_name"] . ", " . $data["QV_year"] . ")");

	//Return a 500 response if there was an error with the query.
	if (!$result) {
		http_response_code(500);
		die("Error.");
	}

	//Return a 201 response if the entry was successfully created.
	http_response_code(201);
	die("created");
?>