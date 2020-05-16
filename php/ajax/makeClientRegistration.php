<?php

	header("Access-Control-Allow-Origin:*");
	require_once __DIR__ . "/../paths.php";
	require_once DIR_AJAX . "ajaxResponse.php";
	require_once DIR_UTILS . "dbManager.php";
    
    

    $message = insertRegistration($_POST['cognome'], $_POST['email'], $_POST['comune'], $_POST['nome'], $_POST['password']);

	$response = new AjaxResponse("0", $message);
	echo json_encode($response);
	return;
    
    function insertRegistration($cognome, $email, $comune, $nome, $password){
            global $project_db;        
            $queryText = "INSERT INTO Utente VALUES ('" . $email. "','". $password."','". $nome."','". $cognome."','". $comune."');";
			$result = $project_db->performQuery($queryText);
            $project_db->closeConnection();
            return $queryText;
    }
?>