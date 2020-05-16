<?php //Codice del laboratorio
	/*
		AjaxResponse is the class that will be sent back to the client at every Ajax request.
		The class is serialize according the Json format through the json_encode function, that 
		serialize ONLY the public property.
		
		It is possibile to serialize also protected and private property but it is out of the course scope.
	*/
	class AjaxResponse{
		public $responseCode; // 0 all ok - 1 some errors - -1 some warning
		public $message;
		public $data;
		
		function AjaxResponse($responseCode = 1, 
								$message = "Somenthing went wrong! Please try later.",
								$data = null){
			$this->responseCode = $responseCode;
			$this->message = $message;
			$this->data = null;
		}
	
	}

// Fine codice del laboratorio
	
	//Codie personale
	class MultiplayerData{
		public $idmultiplaye_data;
		public $username;
		public $total_matches;
		public $wins_player1;
		public $user_iduser;

		function MultiplayerData($idmultiplaye_data = null, $username = null, $total_matches = null,
								 $wins_player1 = null, $user_iduser = null){

			$this->idmultiplaye_data = $idmultiplaye_data;
			$this->username = $username;
			$this->total_matches = $total_matches;
			$this->wins_player1 = $wins_player1;
			$this->user_iduser = $user_iduser;
		}
	}

	// Considero inizialmente la tabella scores uguale identica, ma potrei modificare la query utilizzata
	class Scores{
		public $idscores;
		public $username;
		public $score;
		public $user_iduser;

		function Scores($idscores = null, $username = null, $score = null, $user_iduser = null){
			
			$this->idscores = $idscores;
			$this->username = $username;
			$this->score = $score;
			$this->user_iduser = $user_iduser;
		
		}
	}
?>