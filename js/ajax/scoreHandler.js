//Oggetto che permette la gestione delle rank table
function ScoreHandler() {}

//Set iniziale
ScoreHandler.DEFAUL_METHOD = "GET";
ScoreHandler.URL_REQUEST = "./ajax/scoreInteraction.php";
ScoreHandler.ASYNC_TYPE = true;

ScoreHandler.SUCCESS_RESPONSE = "0";


//Funzione che gestisce l'aggiornamento del database alla fine di una partita in single player
ScoreHandler.update_singleplayer_rank = function(score){
	var queryString = "?searchType=" + 0 + "&score=" + score;

	var url = ScoreHandler.URL_REQUEST + queryString;

	var responseFunction = ScoreHandler.onExploreAjaxResponseRank;

	AjaxManager.performAjaxRequest(ScoreHandler.DEFAUL_METHOD, url, ScoreHandler.ASYNC_TYPE, 0, responseFunction);
}


//Funzione che gestisce l'aggiornamento del database alla fine di una partia in multiplayer
ScoreHandler.update_multiplayer_rank = function(winner){
	var queryString = "?searchType=" + 1 + "&winner=" + winner;

	var url = ScoreHandler.URL_REQUEST + queryString;

	var responseFunction = ScoreHandler.onExploreAjaxResponseRank;

	AjaxManager.performAjaxRequest(ScoreHandler.DEFAUL_METHOD, url, ScoreHandler.ASYNC_TYPE, 0, responseFunction);
}


//Funzione che registra un eventuale aggiornamento del database a partire dalla risposta ricevuta
ScoreHandler.onExploreAjaxResponseRank = function(response){
	if(response.responseCode == ScoreHandler.SUCCESS_RESPONSE){
		console.log("Aggiornamento db riuscito");
		return;
	}

}