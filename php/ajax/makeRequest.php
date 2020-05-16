<?php

	header("Access-Control-Allow-Origin:*");
	require_once __DIR__ . "/../paths.php";
	require_once DIR_AJAX . "ajaxResponse.php";
	require_once DIR_UTILS . "dbManager.php";
    

    $message = insertRequest($_POST['email'], $_POST['necessita'], $_POST['note']);

	$response = new AjaxResponse("0", $message);
	echo json_encode($response);
	return;
    
    function insertRequest($email, $necessita, $note){
            global $project_db;        
            $queryText = "INSERT INTO Richiesta(email) VALUES ('" . $email."');";
            $result = $project_db->performQuery($queryText);
            
            $queryText = "INSERT INTO Commissione(priorita, necessita, note) VALUES (1, '" . $necessita."', '". $note . "');";
            $result = $project_db->performQuery($queryText);
            
            $project_db->closeConnection();
            return $queryText;
    }
?>