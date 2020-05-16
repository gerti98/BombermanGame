//Oggetto utile ad aggiornare le rank table
function RankEventHandler() {}

//Set iniziale
RankEventHandler.DEFAUL_METHOD = "GET";
RankEventHandler.URL_REQUEST = "./ajax/rankInteraction.php";
RankEventHandler.ASYNC_TYPE = true;

RankEventHandler.SUCCESS_RESPONSE = "0";
RankEventHandler.NO_MORE_DATA = "-1";


//Permette l'aggiornamento della tabella rank singleplayer globale accedendo alle informazioni del database
RankEventHandler.singleplayer_rank = function(){
	var queryString = "?searchType=" + 0;

	var url = RankEventHandler.URL_REQUEST + queryString;

	var responseFunction = RankEventHandler.onExploreAjaxResponseSingle;

	AjaxManager.performAjaxRequest(RankEventHandler.DEFAUL_METHOD, url, RankEventHandler.ASYNC_TYPE, 0, responseFunction);
}

//Permette l'aggiornamento della tabella rank multiplayer globale accedendo alle informazioni del database
RankEventHandler.multiplayer_rank = function(){
	var queryString = "?searchType=" + 1;

	var url = RankEventHandler.URL_REQUEST + queryString;

	var responseFunction = RankEventHandler.onExploreAjaxResponseMulti;

	AjaxManager.performAjaxRequest(RankEventHandler.DEFAUL_METHOD, url, RankEventHandler.ASYNC_TYPE, 1, responseFunction);
}


//Permette l'aggiornamento della tabella singleplayer personale accedendo alle informazioni del database
RankEventHandler.personal_singleplayer_rank = function(){
	var queryString = "?searchType=" + 2;

	var url = RankEventHandler.URL_REQUEST + queryString;

	var responseFunction = RankEventHandler.onExploreAjaxResponseSingle;

	AjaxManager.performAjaxRequest(RankEventHandler.DEFAUL_METHOD, url, RankEventHandler.ASYNC_TYPE, 2, responseFunction);
}

//Permette l'aggiornamento della tabella multiplayer personale accedendo alle informazioni del database
RankEventHandler.personal_multiplayer_rank = function(){
	var queryString = "?searchType=" + 3;

	var url = RankEventHandler.URL_REQUEST + queryString;

	var responseFunction = RankEventHandler.onExploreAjaxResponseMulti;

	AjaxManager.performAjaxRequest(RankEventHandler.DEFAUL_METHOD, url, RankEventHandler.ASYNC_TYPE, 3, responseFunction);
}

//Funzione di gestione delle risposte con eventuale aggiornamento della tabella singleplayer (globale e personale)
RankEventHandler.onExploreAjaxResponseSingle = function(response){
		if (response.responseCode === RankEventHandler.SUCCESS_RESPONSE){
			RankTable.refresh_table(response.data, "single");
			return;
		}

		else if(response.responseCode === RankEventHandler.NO_MORE_DATA){
			RankTable.void_table("single");
		}
}

//Funzione di gestione delle risposte con eventuale aggiornametno della tabella multiplayer (globale e personale)
RankEventHandler.onExploreAjaxResponseMulti = function(response){
		if (response.responseCode === RankEventHandler.SUCCESS_RESPONSE){
			RankTable.refresh_table(response.data, "multi");
			return;
		}
}