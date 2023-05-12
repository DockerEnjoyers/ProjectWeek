<?php
	global $database;

	//Read all entries from the database.
	$result = $database->query("SELECT * FROM companies");

	$companies = array();

	//Put all the entries into an array.
	while ($row = $result->fetch_assoc()) {
		$companies[] = $row;
	}

	//Output the entire array.
	echo json_encode($companies);
?>