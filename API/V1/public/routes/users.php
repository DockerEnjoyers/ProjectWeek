<?php
	use Psr\Http\Message\ResponseInterface as Response;
	use Psr\Http\Message\ServerRequestInterface as Request;

	$app->get("/Users", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "users/list.php";
		return $response;
	});

	$app->post("/Users", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "users/create.php";
		return $response;
	});

	$app->put("/Users/{student_id}", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "users/update.php";
		return $response;
	});

	$app->delete("/Users/{student_id}", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "users/delete.php";
		return $response;
	});
?>