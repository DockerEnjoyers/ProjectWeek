<?php
	global $database;

	$data = json_decode(file_get_contents("php://input"), true);

	//Return a 400 response if no users information was provided in the request body.
	if (!$data) {
		http_response_code(400);
		die("Please provide the users information as a correct JSON object in the request body.");
	}

	//Make sure the required fields are provided.
	if (!isset($data["username"]) || !isset($data["password"]) || !isset($data["role"])) {
		http_response_code(400);
		die("You must provide the attributes \"username\",\"password\" and \"role\".");
	}

	//Insert the data into the database.
	$result = $database->query("INSERT INTO users(username, password, role) VALUES('" . $username . "', " . $password . ", " . $role . ")");

	//Return a 500 response if there was an error with the query.
	if (!$result) {
		http_response_code(500);
		die("Error.");
	}

	//Return a 201 response if the entry was successfully created.
	http_response_code(201);
	die("created");
?>