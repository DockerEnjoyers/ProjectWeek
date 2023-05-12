<?php
	use Psr\Http\Message\ResponseInterface as Response;
	use Psr\Http\Message\ServerRequestInterface as Request;

	$app->get("/Students", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "Students/list.php";
		return $response;
	});

	$app->post("/Students", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "Students/create.php";
		return $response;
	});

	$app->put("/Students/{student_id}", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "Students/update.php";
		return $response;
	});

	$app->delete("/Students/{student_id}", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "Students/delete.php";
		return $response;
	});
?>