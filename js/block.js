/******
+++ File per gestire le informazioni relative ai blocchi +++++++++++++++++++++++++++++
--------------------------------------------------------------------------------------	
	Tipologia di blocco:

	0: blocco indistruttibile
	1: blocco distruttibile
	2: blocco momentaneo (dovuto ad una bomba)
	3: blocco bonus/malus (a seguito di scoppio blocco distruttibile)

	Proprietà relative al gameplay in base alla tipologia del blocco:

	0, 1, 2: bloccano il passaggio del giocatore quando attivi
	3: permette il passaggio del giocatore, quando esso si avvicina cambia alcune 
	   proprietà relative al giocatore (es. power, velocity...)

	NO_BONUS_MALUS = 0
	BOMB_PLUS = +1;
	BOMB_MINUS = +5;
	SPEED_PLUS = +2;
	SPEED_MINUS = +6;
	POWER_PLUS = +3;
	POWER_MINUS = +7;
	HEARTH_PLUS = +4; 

--------------------------------------------------------------------------------------
******/

function Block(x, y, type){

	// Posizione dell'oggetto nel 'div' playground 
	this.point = new Point(x, y);

	this.width = TILE_SIDE;
	this.height = TILE_SIDE;

	// Tipologia del blocco, ne determina alcune proprietà nel gameplay
	this.type_block = type; 

	this.type_bonus_malus = NO_BONUS_MALUS;

	// Posizione dell'oggetto nella matrix_playground
	this.x_matrix = Math.floor((x - TILE_SIDE) / TILE_SIDE);
	this.y_matrix = Math.floor((y - TILE_SIDE) / TILE_SIDE);

	// Determina se il blocco è attivo o meno
	if(type == 2)
		this.destroyed = true;
	else
		this.destroyed = false;

	// Variabili di utilità
	this.leftside = this.point.x - this.width/2;
	this.rightside = this.point.x + this.width/2;
	this.upside = this.point.y - this.height/2;
	this.downside = this.point.y + this.height/2;

	// Contatore per gestire velocità animazioni (solo blocco di tipo 1)
	this.animation_counter = 0;	
}

// Funzione che disattiva le proprietà del blocco 
Block.prototype.deactivate_block = function(){
	this.destroyed = true;
}

// Funzione che disattiva le proprietà del blocco
Block.prototype.activate_block = function(){
	this.destroyed = false;
}

Block.prototype.get_bonus = function(player_length){
	var limit = 4; //Default per giocatore singolo

	if(player_length == 2){
		limit = 7;
	}

	var number = Math.floor(Math.random() * limit) + 1;
	var number2 = Math.floor(Math.random() * limit) + 1;

	//Non permette di ottenere il bonus hearth nel multigiocatore
	if(player_length == 2 && number == 4)
		number = 1;

	//Diminuisce in modo considerevole la probabilità di ottenere un bonus hearth
	if(player_length == 1 && number == 4 && number2 == 4)
		number = 1;

	this.type_bonus_malus = number;
}
