<?php
	use Psr\Http\Message\ResponseInterface as Response;
	use Psr\Http\Message\ServerRequestInterface as Request;

	$app->get("/Classes", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "classes/list.php";
		return $response;
	});

	$app->post("/Classes", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "classes/create.php";
		return $response;
	});

	$app->put("/Classes/{class_id}", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "classes/update.php";
		return $response;
	});

	$app->delete("/Classes/{class_id}", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "classes/delete.php";
		return $response;
	});
?>