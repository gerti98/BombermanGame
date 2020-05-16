
<?php  
	//Codice del LABORATORIO
	
	require_once __DIR__ . "/../config.php";
    require DIR_UTIL . "dbConfig.php"; 			// includes database class
    $bombermanDb = new BombermanDbManager(); // creates a new istance of Database Class

	class bombermanDbManager {
		private $mysqli_conn = null;
		
		function BombermanDbManager(){
			$this->openConnection();
		}
    
    	function openConnection(){
    		if (!$this->isOpened()){

    			//Apre la connessione al database scelto in dbConfig.php 
    			global $dbHostname;
    			global $dbUsername;
    			global $dbPassword;
    			global $dbName;
    			
    			$this->mysqli_conn = new mysqli($dbHostname, $dbUsername, $dbPassword);
    			
				if ($this->mysqli_conn->connect_error) 
					die('Errore di connessione (' . $this->mysqli_conn->connect_errno . ') ' . $this->mysqli_conn->connect_error);

				$this->mysqli_conn->select_db($dbName) or
					die ('Database non utilizzabile: ' . mysqli_error());
			}
    	}
    
    	//Controlla se è stata aperta una connessione con il database
    	function isOpened(){
       		return ($this->mysqli_conn != null);
    	}

   		// Esegue una query 
		function performQuery($queryText) {
			if (!$this->isOpened())
				$this->openConnection();
			
			return $this->mysqli_conn->query($queryText);
		}
		
		// Esegue il controllo anti-sqlinjection
		function sqlInjectionFilter($parameter){
			if(!$this->isOpened())
				$this->openConnection();
				
			return $this->mysqli_conn->real_escape_string($parameter);
		}

		//Chiude la connessione al database
		function closeConnection(){
 	       	if($this->mysqli_conn !== null)
				$this->mysqli_conn->close();
			
			$this->mysqli_conn = null;
		}
	}

?>