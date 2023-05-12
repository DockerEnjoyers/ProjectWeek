<?php
	global $database;

	$data = json_decode(file_get_contents("php://input"), true);

	//Return a 400 response if no company information was provided in the request body.
	if (!$data) {
		http_response_code(400);
		die("Please provide the student information as a correct JSON object in the request body.");
	}

	//Make sure the required fields are provided.
	if (!isset($data["student_id"]) || !isset($data[""]) || !isset($data["street"]) || !isset($data["city"]) || !isset($data["zip"]) || !isset($data["corraborative_contract"])) {
		http_response_code(400);
		die("You must provide the attributes \"name\" and \"active\".");
	}

	//Insert the data into the database.
	$result = $database->query("INSERT INTO companies(company_id, company_name, street, city, zip, corraborative_contract) VALUES('" . $data["company_id"] . "', " . $data["company_name"] . ", " . $data["street"] . ", " . $data["city"] . ", " . $data["zip"] . ", " . $data["corraborative_contract"] . ")");

	//Return a 500 response if there was an error with the query.
	if (!$result) {
		http_response_code(500);
		die("Error.");
	}

	//Return a 201 response if the entry was successfully created.
	http_response_code(201);
	die("created");
?>