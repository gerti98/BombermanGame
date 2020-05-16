<?php
    //Funzioni che gestiscono le varie query da effettuare

	require_once __DIR__ . "/../config.php";
    require_once DIR_UTIL . "bombermanDbManager.php"; //includes Database Class

    //Ottieni rank singleplayer globale
    function get_singleplayer_rank(){
    	global $bombermanDb;
        
        $queryText = 'SELECT * FROM scores ORDER BY score DESC LIMIT 10;';

    	$result = $bombermanDb->performQuery($queryText);
    	$bombermanDb->closeConnection();
		return $result;
    }

    //Ottieni rank multiplayer globale
    function get_multiplayer_rank(){
    	global $bombermanDb;

    	$queryText = 'SELECT * FROM multiplaye_data ORDER BY total_matches DESC LIMIT 10;';

    	$result = $bombermanDb->performQuery($queryText);
    	$bombermanDb->closeConnection();
    	return $result;
    }

    //Ottieni rank singleplayer personale
    function get_personal_singleplayer_rank($username){
    	global $bombermanDb;

        $username = $bombermanDb->sqlInjectionFilter($username);
        
    	$queryText = "SELECT * FROM scores WHERE username ='$username' ORDER BY score DESC LIMIT 10;";

    	$result = $bombermanDb->performQuery($queryText);
    	$bombermanDb->closeConnection();
    	return $result;
    }

    //Ottieni rank multiplayer personale
    function get_personal_multiplayer_rank($username){
    	global $bombermanDb;

        $username = $bombermanDb->sqlInjectionFilter($username);

    	$queryText = "SELECT * FROM multiplaye_data WHERE username = '$username' ORDER BY total_matches DESC LIMIT 10;";

    	$result = $bombermanDb->performQuery($queryText);
    	$bombermanDb->closeConnection();
    	return $result;
    }

    //Aggiorna il database aggiungendo un punteggio di una partita singleplayer
    function update_singleplayer_rank($point){
        global $bombermanDb;

        $point = $bombermanDb->sqlInjectionFilter($point);

        $queryText = "INSERT INTO scores (username, score, user_iduser) VALUES"
                     . "('".$_SESSION['username']."', '$point', '".$_SESSION['userId']."');";

        $bombermanDb->performQuery($queryText);
    }

    //Aggiorna il database aggiungendo il risultato di una partita multiplayer
    function update_multiplayer_rank($winner){
        //Incremento contatore partite
        global $bombermanDb;

        $winner = $bombermanDb->sqlInjectionFilter($winner);
        
        if($winner == 1)
            $win_flag = 1;
        else
            $win_flag = 0;
        
       $queryText = "UPDATE multiplaye_data SET total_matches = total_matches + 1, wins_player1 = wins_player1 + '$win_flag' WHERE username = '". $_SESSION['username'] . "';";

        $bombermanDb->performQuery($queryText);
    }

?>