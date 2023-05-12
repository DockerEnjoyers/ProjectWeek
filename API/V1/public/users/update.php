<?php
	global $database;

	$data = json_decode(file_get_contents("php://input"), true);

	//Return a 400 response if no product information was provided in the request body.
	if (!$data) {
		http_response_code(400);
		die("Please provide the user information as a correct JSON object in the request body.");
	}

	//First try to read the existing user information.
	$result = $database->query("SELECT * FROM users WHERE user_id = '" . $args["user_id"] . "'");

	//If the user does not exist, create it. Otherwise just update the information.
	if (!$result || $result === true || $result->num_rows == 0) {
		//Make sure the required fields are provided.
		if (!isset($data["username"]) || !isset($data["password"]) || !isset($data["role"])) {
			http_response_code(400);
			die("You must provide at least the attributes \"username\", \"password\" and \"role\".");
		}

		$user_id = "NULL";
		if (isset($data["user_id"])) {
			$user_id = $data["user_id"];
		}

		$username = "NULL";
		if (isset($data["username"])) {
			$username = "'" . $data["username"] . "'";
		}

		$password = "NULL";
		if (isset($data["password"])) {
			$password = "'" . $data["password"] . "'";
		}

		$role = "NULL";
		if (isset($data["role"])) {
			$role = $data["role"];
		}

		//Insert the data into the database.
		$result = $database->query("INSERT INTO users(user_id, username, password, role) VALUES(" . $user_id . ", '" . $username . "', " . $password . ", " . $role . "')");

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
		$result = $database->query("UPDATE users SET " . $query . " WHERE user_id = '" . $args["user_id"] . "'");

		//Return a 500 response if the entry could not be updated in the database.
		if (!$result) {
			http_response_code(500);
			die("Error.");
		}
	}
?>