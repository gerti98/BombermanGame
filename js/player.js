/****
+++++ File che gestisce i dati del giocatore +++++++++++++++++++++++++++++++++++++++++++++
	
	Tipo giocatore:

	0: Giocatore 1, si muove con i tasti freccia e piazza la bomba con ENTER (BLOCCO NUMERICO)
	1: Giocatore 2, si muove con wasd e piazza la bomba con J

------------------------------------------------------------------------------------------
****/

function Player(x, y, radius, type, lives){
	
	// Posizione dell'oggetto nel 'div' playground 
	this.point = new Point(x, y);
	
	// Variabili per gestire le risorse grafiche
	this.width = PLAYER_WIDTH;
	this.height = PLAYER_HEIGHT;
	this.sprite_height = PLAYER_SPRITE_HEIGHT;


	// Variabili di utilità per snellire il codice
	this.leftside = this.point.x - this.width/2;
	this.rightside = this.point.x + this.width/2;
	this.upside = this.point.y - this.height/2;
	this.downside = this.point.y + this.height/2;

	// Variabili per gestire controllo input da tastiera
	this.latest_input = "down"; // Memorizza l'ultimo input
	this.any_input = false;
	this.vector_movement = [false, false, false, false];

	// Variabili per gestire le animazioni della camminata
	this.up_counter_pace = 0;
	this.down_counter_pace = 0;
	this.left_counter_pace = 0;
	this.right_counter_pace = 0;

	//Variabili per gestire le collisioni
	this.up_block_distance = 0;
	this.down_block_distance = 0;
	this.left_block_distance = 0;
	this.right_block_distance = 0;


	// Variabili per controllo game_over
	this.counter = 0;
	this.death_counter = 0;
	this.is_dead = false;

	// Variabili per controllo caratteristiche del giocatore 
	this.power_bomb = DEFAULT_POWER;
	this.velocity = DEFAULT_VELOCITY;  //Per non creare problemi, la larghezza dei blocchi deve essere divisibile per la velocità
	this.max_contemporary_bombs = DEFAULT_CONTEMPORARY_BOMBS;
	this.lives = lives;
	this.active_bombs = 0;

	// Variabile per gestione numero del giocatore
	this.type = type;
}

// Funzione che resetta il numero di bombe piazzate (per risolvere il bug del passaggio al nuovo livello)
Player.prototype.reset_bomb = function(){
	this.active_bombs = 0;
}


// Registra una bomba piazzata
Player.prototype.register_bomb = function(){
	if(this.active_bombs < this.max_contemporary_bombs){
		this.active_bombs++;
		return true;
	}

	return false;
}

// Cancella la registrazione della bomba piazzata
Player.prototype.unregister_bomb = function(){
	this.active_bombs--;
}

// Resetta le abilità del giocatore a quelle di default
Player.prototype.reset_powers = function(){
	this.power_bomb = DEFAULT_POWER;
	this.velocity = DEFAULT_VELOCITY;  //Per non creare problemi, la larghezza dei blocchi deve essere divisibile per la velocità
	this.max_contemporary_bombs = DEFAULT_CONTEMPORARY_BOMBS;
	this.lives = DEFAULT_LIVES;
}

// Funzione che aggiorna le variabili di utilità
Player.prototype.update_utility = function(){

	this.leftside = this.point.x - this.width/2;
	this.rightside = this.point.x + this.width/2;
	this.upside = this.point.y - this.height/2;
	this.downside = this.point.y + this.height/2;
}

// Funzione che inizializza le variabili di gestione per le collisioni
Player.prototype.unset_block_distance = function(){

	this.up_block_distance = 0;
	this.down_block_distance = 0;
	this.left_block_distance = 0;
	this.right_block_distance = 0;
}

// Funzione di aggiornamento delle coordinate dell'oggetto 
Player.prototype.move = function(playground, blocks){
	// Variabili per calcolare lo spostamento sull'asse relativo
	var x_direction = 0, y_direction = 0;

	this.update_utility();
	
	// Controlla quale input è stato premuto
	if(this.vector_movement[1] == true) { //up
		x_direction += 0;
		y_direction += -1;
	}

	if(this.vector_movement[3] == true) { //down
		x_direction += 0;
		y_direction += 1;
	}

	if(this.vector_movement[0] == true) { //left
		x_direction += -1;
		y_direction += 0;
	}

	if(this.vector_movement[2] == true) { //right
		x_direction += 1;
		y_direction += 0;
	}

	//Controllo se vi è una collisione con qualche blocco o con il bordo del playground
	x_direction *= this.search_collide_x(playground, x_direction, blocks);
	y_direction *= this.search_collide_y(playground, y_direction, blocks);

	// Aggiornamento coordinate oggetto player
	if(!this.is_dead){
		this.point.x += this.velocity*x_direction + this.left_block_distance - this.right_block_distance;
		this.point.y += this.velocity*y_direction - this.down_block_distance + this.up_block_distance;
	}

	// Inizializzazione variabili per gestione collisioni
	this.unset_block_distance();
}


// Funzione che si occupa di gestire eventuali collisioni sull'asse x
Player.prototype.search_collide_x = function(playground, x_direction, blocks){
	
	//Gestione bordi esterni
	if(this.leftside <= TILE_SIDE && x_direction < 0){
		if(x_direction < 0)
			return 0;
	}

	if(this.rightside >= playground.width - TILE_SIDE){
		if(x_direction > 0)
			return 0;
	}

	//Gestione collisione con gli oggetti block sull'asse x
	for(var i = 0; i < blocks.length; i++){

		if(!blocks[i].destroyed){
			if((this.downside > blocks[i].upside) && (this.upside < blocks[i].downside)){
				if(x_direction > 0 && (this.rightside + this.velocity >= blocks[i].leftside) && (this.leftside < blocks[i].leftside)){
					this.right_block_distance = this.rightside - blocks[i].leftside;
					return 0;
				}

				if(x_direction < 0 && (this.leftside - this.velocity <= blocks[i].rightside) && (this.rightside > blocks[i].rightside)){
					this.left_block_distance = -(this.leftside - blocks[i].rightside);
					return 0;
				}
			}
		}
	}

	return 1;
}

// Funzione che si occupa di gestire eventuali collisioni sull'asse y
Player.prototype.search_collide_y = function(playground, y_direction, blocks){
	
	// Gestione bordi esterni
	if(this.upside <= TILE_SIDE){
		if(y_direction < 0)
			return 0;
	}

	if(this.downside >= playground.height - TILE_SIDE){
		if(y_direction > 0)
			return 0;
	}

	// Gestione collisione con i blocchi sull'asse y
	for(var i = 0; i < blocks.length; i++){
		
		if(!blocks[i].destroyed){
			if((this.rightside > blocks[i].leftside) && (this.leftside < blocks[i].rightside)){

				if(y_direction > 0 && (this.downside + this.velocity >= blocks[i].upside) && (this.upside < blocks[i].upside)) {
					this.down_block_distance = this.downside - blocks[i].upside;
					return 0;
				}

				if(y_direction < 0 && (this.upside - this.velocity <= blocks[i].downside) && (this.downside > blocks[i].downside)){
					this.up_block_distance = - (this.upside - blocks[i].downside);
					return 0;
				
				}
			}
		}
	}

	return 1;
}

// Funzione che cambia lo stato del giocatore da 'vivo' a 'morto' con aggiornamento contatore morte
Player.prototype.set_death = function(){
	this.is_dead = true;
	this.death_counter++;
}

// Funzione che cambia lo stato del giocatore da 'morto' a 'vivo' (utilità per la creazione di una nuova partita)
Player.prototype.reset_death = function(){
	this.is_dead = false;
	this.death_counter = 0;
}


// Aggiorna i dati del giocatore dopo aver preso un bonus/malus
Player.prototype.catch_bonus = function(type_bonus){
	// Se sono già presenti i malus è implicita la presenza del secondo giocatore

	switch(type_bonus){
		case BOMB_PLUS:
			if(this.max_contemporary_bombs < MAX_CONTEMPORARY_BOMBS)
				this.max_contemporary_bombs++;
			break;

		case BOMB_MINUS:
			this.max_contemporary_bombs = MIN_CONTEMPORARY_BOMBS;
			break;

		case POWER_PLUS:
			if(this.power_bomb < MAX_POWER)
				this.power_bomb++
			break;

		case POWER_MINUS:
			this.power_bomb = MIN_POWER;
			break;

		case SPEED_PLUS:
			if(this.velocity < MAX_SPEED)
				this.velocity = this.velocity + 0.5;
			break;

		case SPEED_MINUS:
			this.velocity = 1;
			break;
		
		case HEARTH_PLUS:
			if(this.lives < MAX_LIVES)
				this.lives++;
			break;
	}

}

//Registra una morte del giocatore
Player.prototype.remove_hearth = function(){
	this.lives--;
}