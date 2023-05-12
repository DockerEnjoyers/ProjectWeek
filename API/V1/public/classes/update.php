<?php
	global $database;

	$data = json_decode(file_get_contents("php://input"), true);

	//Return a 400 response if no class information was provided in the request body.
	if (!$data) {
		http_response_code(400);
		die("Please provide the class information as a correct JSON object in the request body.");
	}

	//First try to read the existing class information.
	$result = $database->query("SELECT * FROM class WHERE class_id = '" . $args["class_id"] . "'");

	//If the class does not exist, create it. Otherwise just update the information.
	if (!$result || $result === true || $result->num_rows == 0) {
		//Make sure the required fields are provided.
		if (!isset($data["class_id"]) || !isset($data["class_name"]) || !isset($data["QV_year"])) {
			http_response_code(400);
			die("You must provide at least the attributes \"class_id\", \"class_name\" and \"QV_year\".");
		}

		$class_id = "NULL";
		if (isset($data["class_id"])) {
			$class_id = $data["class_id"];
		}

		$class_name = "NULL";
		if (isset($data["class_name"])) {
			$class_name = "'" . $data["class_name"] . "'";
		}

		$QV_year = "NULL";
		if (isset($data["QV_year"])) {
			$QV_year = "'" . $data["QV_year"] . "'";
		}
		//Insert the data into the database.
		$result = $database->query("INSERT INTO class(class_id, class_name, QV_year) VALUES(" . $class_id . ", '" . $class_name . "', " . $QV_year . "')");

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
			$query .= $key . " = " . ($value !== null ? "'" . $value . "'" : "NULL");
		}

		//Update the entry in the database.
		$result = $database->query("UPDATE class SET " . $query . " WHERE class_id = '" . $args["class_id"] . "'");

		//Return a 500 response if the entry could not be updated in the database.
		if (!$result) {
			http_response_code(500);
			die("Error.");
		}
	}
?>