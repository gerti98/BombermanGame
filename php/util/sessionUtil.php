<?php
	
	//setSession: setta le variabili di sessione per il login 
	function setSession($username, $userId){
		$_SESSION['userId'] = $userId;
		$_SESSION['username'] = $username;
	}

	//isLogged: controlla se un utente si è già loggato o meno
	function isLogged(){		
		if(isset($_SESSION['userId']))
			return $_SESSION['userId'];
		else
			return false;
	}

?>