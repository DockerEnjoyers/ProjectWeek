<?php
	global $database;

	$data = json_decode(file_get_contents("php://input"), true);

	//Return a 400 response if no company information was provided in the request body.
	if (!$data) {
		http_response_code(400);
		die("Please provide the company information as a correct JSON object in the request body.");
	}

	//First try to read the existing company information.
	$result = $database->query("SELECT * FROM companies WHERE company_id = " . $args["company_id"] . "");

	//If the company does not exist, return an error. Otherwise just update the information.
	if (!$result || $result === true || $result->num_rows == 0) {
		http_response_code(404);
		die("No such company.");

		$company_id = "NULL";
		if (isset($data["company_id"])) {
			$company_id = $data["company_id"];
		}

		$company_name = "NULL";
		if (isset($data["company_name"])) {
			$company_name = "'" . $data["company_name"] . "'";
		}

		$street = "NULL";
		if (isset($data["street"])) {
			$street = "'" . $data["street"] . "'";
		}

		$city = "NULL";
		if (isset($data["city"])) {
			$city = $data["city"];
		}

		$zip = "NULL";
		if (isset($data["zip"])) {
			$zip = $data["zip"];
		}

		$corraborative_contract = "NULL";
		if (isset($data["corraborative_contract"])) {
			$corraborative_contract = $data["corraborative_contract"];
		}

	//Insert the data into the database.
	$result = $database->query("INSERT INTO product(company_id, company_name, street, city, zip, corraborative_contract) VALUES(" . $company_id . ", '" . $company_name . "', " . $street . ", " . $city . ", " . $zip . ", " . $corraborative_contract . "')");

	//Return a 500 response if there was an error with the query.
	if (!$result) {
		http_response_code(500);
		die("Error.");
	}

	//Return a 201 response if the entry was successfully created.
	http_response_code(201);
	die();
}

	else {
		//Generate the update query.
		$query = "";

		foreach ($data as $key => $value) {
			if ($query != "") {
				$query .= ", ";
			}
			$query .= $key . " = '" . $value . "'";
		}

		//Update the entry in the database.
		$result = $database->query("UPDATE company SET " . $query . " WHERE company_id = '" . $args["company_id"] . "'");

		//Return a 500 response if the entry could not be updated in the database.
		if (!$result) {
			http_response_code(500);
			die("Error.");
		}
	}
?>