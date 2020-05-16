/****
+++++ In questo file vengono salvati tutti i file relativi alla finestra di gioco ++++++++++++++++
--------------------------------------------------------------------------------------------------
	
****/


function ScoreStat(index_player){
	//Memorizza l'indice del giocatore associato
	this.index_player = index_player;

	//Memorizza le informazioni relative al giocatore
	this.bomb_power = DEFAULT_POWER;
	this.lives = DEFAULT_LIVES;
	this.speed = DEFAULT_VELOCITY;
	this.score = 0;
	this.contemporary_bombs = DEFAULT_CONTEMPORARY_BOMBS;
}


//Aggiorna le statistiche della finestra di gioco 
ScoreStat.prototype.update_stats = function(bomb_power, lives, speed, contemporary_bombs){
	
	this.bomb_power = bomb_power;
	this.lives = lives;
	this.speed = speed;
	this.contemporary_bombs = contemporary_bombs;

}


//Incrementa il punteggio
ScoreStat.prototype.increase_score = function(){
	this.score++;
}

//Resetta il punteggio
ScoreStat.prototype.reset_score = function(){
	this.score = 0;
}