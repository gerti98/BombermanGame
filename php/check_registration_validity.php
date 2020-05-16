<?php
	require_once __DIR__ . "/config.php";
    require_once DIR_UTIL . "bombermanDbManager.php"; //includes Database Class
    require_once DIR_UTIL . "sessionUtil.php"; //includes session utils


    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $email = $_POST['email'];


   	if($password == $repassword)
    	$errorMessage = check_double_user($username, $password, $email);
	else 
		$errorMessage = "Password inserite non corrispondono";

	//Funzione che controlla la presenza dello stesso username o della stessa email nel database
	function check_double_user($username, $password, $email){

		global $bombermanDb;
		$queryText = "select * from user where username='$username';";

		$result = $bombermanDb->performQuery($queryText);

		$num_rows = mysqli_num_rows($result);

		if($num_rows != 0){
			return "Nome utente già registrato. Provare con un nuovo nome utente";
		}

		$queryText = "select * from user where email='$email';";

		$result = $bombermanDb->performQuery($queryText);

		$num_rows = mysqli_num_rows($result);
		
		if($num_rows != 0){
			return "Email già registrata. Provare con una nuova email";
		}

		register_user($username, $password, $email);

		$bombermanDb->closeConnection();

		return "Registrazione avvenuta con successo";
	}

	// Funzione che permette la registrazione di un utente dopo aver verificato tutti i controlli
	function register_user($username, $password, $email){
		global $bombermanDb;

		$username = $bombermanDb->sqlInjectionFilter($username);
		$password = $bombermanDb->sqlInjectionFilter($password);
		$email = $bombermanDb->sqlInjectionFilter($email);

		$queryText = "INSERT INTO user (username, password, email) VALUES ('$username', '$password', '$email');";

		$result = $bombermanDb->performQuery($queryText);

		$queryText = "SELECT iduser FROM user WHERE username = '$username';";

		$result = $bombermanDb->performQuery($queryText);

		$vet = $result->fetch_assoc();

		echo "ciao mamma";

		$userId = $vet['iduser'];

		$queryText = "INSERT INTO multiplaye_data (username, total_matches, wins_player1, user_iduser) VALUES('". $username . "', 0, 0, '" . $userId . "');";

		$result = $bombermanDb->performQuery($queryText);

	}

	if($errorMessage == "Registrazione avvenuta con successo")
		header('location: ./../register.php?errorMessage=' . $errorMessage . "&class=sign_in_ok" );
	else
		header('location: ./../register.php?errorMessage=' . $errorMessage . "&class=sign_in_error")
?>