<?php
	//Gestione dell'aggiornamento del database al termine di una partita singleplayer o multiplayer
	session_start();
	
	require_once __DIR__ . "/../config.php";
	require_once DIR_UTIL . "bombermanDbManager.php";
	require_once DIR_UTIL . "queryBombermanDb.php";
	require_once DIR_AJAX_UTIL . "AjaxResponse.php";

	$searchType = $_GET['searchType'];

	switch ($searchType){
		case 0:
			update_singleplayer_rank($_GET['score']);
			break;
		case 1:
			update_multiplayer_rank($_GET['winner']);
			break;
	}

	$message = "OK";

	$response = new AjaxResponse("0", $message);
	echo json_encode($response);
	return;
?>