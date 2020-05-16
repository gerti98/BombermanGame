<?php
	require_once __DIR__ . "/config.php";
    require_once DIR_UTIL . "bombermanDbManager.php"; 
    require_once DIR_UTIL . "sessionUtil.php"; 
 
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	$errorMessage = login($username, $password);
	
	if($errorMessage === null)
		header('location: ./game.php');
	else
		header('location: ./../index.php?errorMessage=' . $errorMessage );


	function login($username, $password){   
		if ($username != null && $password != null){
			$userId = authenticate($username, $password);
    		
    		if ($userId > 0){ // Login avvenuto con successo
    			session_start();
    			setSession($username, $userId);
    			return null;
    		}


    	} else
    		return 'You should insert something';
    	
    	return 'Username and password not valid.';
	}
	
	function authenticate ($username, $password){   
		global $bombermanDb;
		$username = $bombermanDb->sqlInjectionFilter($username);
		$password = $bombermanDb->sqlInjectionFilter($password);

		$queryText = "select * from user where username='" . $username . "' AND password='" . $password . "'";

		
		$result = $bombermanDb->performQuery($queryText);
		
		//showResult($result);

		$numRow = mysqli_num_rows($result);

		
		if ($numRow != 1)
			return -1;

		$bombermanDb->closeConnection();
		$userRow = $result->fetch_assoc();
		$bombermanDb->closeConnection();
		return $userRow['iduser'];
	}


	function showResult($result){ 
		while ($row = $result->fetch_assoc()) {
		echo $row['username']. " ";
		echo $row['password'] . "<br>";
		}
		echo "<br>";
	}
?>