/****     
+++++  Gestione base delle bombe +++++++++++++++++++++++++++++++++++++++++++
----------------------------------------------------------------------------
	
----------------------------------------------------------------------------
****/

function Bomb(x_matrix, y_matrix, power, index_player, block_index){
	
	var x = PLAYGROUND_OFFSET_LEFT*(3/2) + x_matrix*TILE_SIDE;
	var y = PLAYGROUND_OFFSET_LEFT*(3/2) + y_matrix*TILE_SIDE;

	// Posizione dell'oggetto nel 'div' playground
	this.point = new Point(x,y);

	this.width = TILE_SIDE;
	this.height = TILE_SIDE;
	
	// Posizione dell'oggetto nella matrix_playground
	this.x_matrix = x_matrix;
	this.y_matrix = y_matrix;

	// Contatore per gestire velocità animazioni
	this.counter_pace = 0;

	// Potenza dell'esplosione del blocco (in termini di tile)
	this.power = power;

	// Indice del blocco momentaneo associato
	this.block_index = block_index;
	
	// Indice del giocatore che ha piazzato la bomba
	this.index_player = index_player; 

	// Controlla stato esplosione
	this.check_explosion = false;

	// Controlla se l'esplosione è già avvenuta o meno
	this.finish = false;
}


// Funzione che modifica stato animazione in caso di concatenazioni di esplosioni o 
// aggiorna semplicementi i contatori per le animazioni
Bomb.prototype.update_counter = function(playground_matrix){
	if(playground_matrix[this.x_matrix][this.y_matrix] < -5 && !this.check_explosion)
		this.counter_pace = 138;
	else
		this.counter_pace++;
}

Bomb.prototype.set_finish = function(){
	this.finish = true;
}