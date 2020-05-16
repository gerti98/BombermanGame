<?php
	// Gestione dell'invio delle informazioni per la costruzione delle rank table
	session_start();
	
	require_once __DIR__ . "/../config.php";
	require_once DIR_UTIL . "bombermanDbManager.php";
	require_once DIR_UTIL . "queryBombermanDb.php";
	require_once DIR_AJAX_UTIL . "AjaxResponse.php";
	
		
	
	$searchType = $_GET['searchType'];

	switch ($searchType){
		case 0:
			$result = get_singleplayer_rank();
			break;
		case 1:
			$result = get_multiplayer_rank();
			break;
		case 2:
			$result = get_personal_singleplayer_rank($_SESSION['username']);
			break;
		case 3:
			$result = get_personal_multiplayer_rank($_SESSION['username']);
			break;
		default:
			$result = null;
			break;
	}
	

	if (checkEmptyResult($result)){
		$response = setEmptyResponse();
		echo json_encode($response);
		return;
	}


	$message = "OK";	
	switch ($searchType){
		case 0:
			$response = setResponseRankSingleplayer($result, $message);
			break;
		case 1:
			$response = setResponseRankMultiplayer($result, $message);
			break;
		case 2:
			$response = setResponseRankSingleplayer($result, $message);
			break;
		case 3:
			$response = setResponseRankMultiplayer($result, $message);
			break;
		default:
			$response = null;
			break;
	}

		echo json_encode($response);
	return;
	
	
	
	
	function checkEmptyResult($result){
		if ($result === null || !$result)
			return true;
			
		return ($result->num_rows <= 0);
	}
	
	function setEmptyResponse(){
		$message = "No more stats to load";
		return new AjaxResponse("-1", $message);
	}


	//Gestione del messaggio di risposta con l'inclusione delle informazioni ottenute dal database
	function setResponseRankSingleplayer($result, $message){
		$response = new AjaxResponse("0", $message);
			
		$index = 0;

		while ($row = $result->fetch_assoc()){
			$scores = new Scores();
			$scores->idscores = $row['idscores'];
			$scores->username = $row['username'];
			$scores->score = $row['score'];
			$scores->user_iduser = $row['user_iduser'];
			
			$response->data[$index] = $scores;
			$index++;
		}

		return $response;
	}

	//Gestione del messaggio di risposta con l'inclusione delle informazioni ottenute dal database
	function setResponseRankMultiplayer($result, $message){
		$response = new AjaxResponse("0", $message);

		$index = 0;

		while ($row = $result->fetch_assoc()){
			$multiplayer_data = new MultiplayerData();

			$multiplayer_data->idmultiplaye_data = $row['idmultiplaye_data'];
			$multiplayer_data->username = $row['username'];
			$multiplayer_data->total_matches = $row['total_matches'];
			$multiplayer_data->wins_player1 = $row['wins_player1'];
			$multiplayer_data->user_iduser = $row['user_iduser'];

			$response->data[$index] = $multiplayer_data;
			$index++;
		}

		return $response;
	}
?>