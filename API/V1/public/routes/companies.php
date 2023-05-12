<?php
	use Psr\Http\Message\ResponseInterface as Response;
	use Psr\Http\Message\ServerRequestInterface as Request;

	$app->get("/Companies", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "companies/list.php";
		return $response;
	});

	$app->post("/Companies", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "companies/create.php";
		return $response;
	});

	$app->put("/Companies/{company_id}", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "companies/update.php";
		return $response;
	});

	$app->delete("/Companies/{company_id}", function (Request $request, Response $response, $args) {
		require "util/authentication.php";
		require "companies/delete.php";
		return $response;
	});
?>