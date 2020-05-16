/****
+++++ In questo file vengono salvati tutti i file relativi alla campo di gioco ++++++++++++++++
--------------------------------------------------------------------------------------------------
	Legenda per la matrice di controllo. Sia x il valore della cella, ad x corrisponderà, nel file util.jss:

	- x = 0 : Il tile presenta lo spazio libero per il movimento
	- x = -1: Il tile presenta un blocco indistruttibile
	- x = -2: Il tile presenta un blocco distruttibile
	- x = -3: Il tile presenta un bonus/malus
	- x = -5: Il tile presenta una bomba che sta esplodendo
	- x > 0 : Il tile presenta un'esplosione in corso, pertanto se un giocatore passerà in tale 
	  blocco in tale stato, il giocatore perderà una vita e/o morirà.
	
****/

function Playground(playground){
	
	// Variabili di utilità per memorizzare l'offset relativo al bordo esterno del playground
	this.offsetLeft = PLAYGROUND_OFFSET_LEFT;
	this.offsetTop = PLAYGROUND_OFFSET_TOP;

	// Variabili per gestire le risorse grafiche
	this.width = parseInt(playground.style.width);
	this.height = parseInt(playground.style.height);

	//Variabili di Utilità
	this.width_ring = this.width - 2*TILE_SIDE;
	this.height_ring = this.height - 2*TILE_SIDE;

	// Vettore/i per memorizzare coordinate giocatore/i relativi alla matrix_playground 
	this.x_matrix_player = [];
	this.y_matrix_player = [];

	// Vettore/i per memorizzare coordinate balloon relativi alla matrix_playground
	this.x_matrix_balloon = [];
	this.y_matrix_balloon = [];

	// Matrice che memorizza lo stato del playground
	this.matrix_playground = [];
	this.init_matrix_playground();

	// Variabili per memorizzare presenza di un ostacolo durante l'esplosione di una bomba
	this.up_ostacle;
	this.down_ostacle;
	this.left_ostacle;
	this.right_ostacle;

	// DEBUGGING VARIO
	console.log(this.matrix_playground);
}

// Inizializzazione della matrice di controllo del playground
Playground.prototype.init_matrix_playground = function() {

	//Creazione della matrice
	for(var i_0 = 0; i_0 < X_TILES; i_0++){
		this.matrix_playground[i_0] = [];
	}

	//Memorizzazione posizione blocchi indistruttibili
	for(var i = 0; i < X_TILES; i++){
		for(var j = 0; j < Y_TILES; j++){
			if(j%2 == 1 && i%2 == 1)
				this.matrix_playground[i][j] = -1;
			else
				this.matrix_playground[i][j] = 0;
		}
	}
}

Playground.prototype.reset_positions = function(){
	// Vettore/i per memorizzare coordinate giocatore/i relativi alla matrix_playground 
	this.x_matrix_player = [];
	this.y_matrix_player = [];

	// Vettore/i per memorizzare coordinate balloon relativi alla matrix_playground
	this.x_matrix_balloon = [];
	this.y_matrix_balloon = [];
}

// Funzione che aggiorna la posizione del giocatore index sulla matrix_playground
Playground.prototype.update_player_matrix_position = function(x, y, index){
	this.x_matrix_player[index] = Math.floor((x - TILE_SIDE)/TILE_SIDE);
	this.y_matrix_player[index] = Math.floor((y - TILE_SIDE)/TILE_SIDE);
}

Playground.prototype.update_balloon_matrix_position = function(x, y, index){
	this.x_matrix_balloon[index] = Math.floor((x - TILE_SIDE)/TILE_SIDE);
	this.y_matrix_balloon[index] = Math.floor((y - TILE_SIDE)/TILE_SIDE);
	//console.log(this.x_matrix_balloon[index]);
	//console.log(this.y_matrix_balloon[index]);
}

// Funzione che memorizza un blocco distruttibile sulla matrix_playground
Playground.prototype.set_breakable_block = function(x, y){
	this.matrix_playground[x][y] = -2;
}

// Funzione che memorizza una bomba sulla matrix_playground
Playground.prototype.set_bomb_matrix_position = function(x_matrix ,y_matrix){
	this.matrix_playground[x_matrix][y_matrix] = BOMB_COSTANT_VALUE;
}

// Funzione che elimina una bomba (in via di esplosione) sulla matrix_playground
Playground.prototype.unset_bomb_matrix_position = function(x_matrix, y_matrix){

	if(this.matrix_playground[x_matrix][y_matrix] == -5)
		this.matrix_playground[x_matrix][y_matrix] = 0;
	else if(this.matrix_playground[x_matrix][y_matrix] < -5)
		this.matrix_playground[x_matrix][y_matrix] = (-5 - this.matrix_playground[x_matrix][y_matrix]);
}

//Memorizza nella matrice di playground i valori relativi all'esplosione in corso
Playground.prototype.set_explosion_matrix_position = function(x_center, y_center, power_bomb){
	
	// Inizializzazione variabili per gestione ostacoli esplosioni
	this.up_ostacle = false;
	this.down_ostacle = false;
	this.left_ostacle = false;
	this.right_ostacle = false;

	// Controlla se un tile può essere contrassegnato come simbolo di 'esplosione in corso'
	// Controllo relativo al centro dell'esplosione
	if(this.check_explosivity(x_center, y_center)){
		this.matrix_playground[x_center][y_center]++;
	}

 	// Controllo via via nei tile contigui al crescere del raggio
	for(var i = 1; i <= power_bomb; i++){

		if((x_center + i) < X_TILES && !this.right_ostacle && this.check_explosivity(x_center + i, y_center, "right")){
			
			// Gestione esplosioni contemporanee
			if(this.matrix_playground[x_center + i][y_center] <= -5){
				this.matrix_playground[x_center + i][y_center]--;
			}

			else
				this.matrix_playground[x_center + i][y_center]++;
		}

		if((x_center - i) >= 0 && !this.left_ostacle && this.check_explosivity(x_center - i, y_center, "left")){
			if(this.matrix_playground[x_center - i][y_center] <= -5){
				this.matrix_playground[x_center - i][y_center]--;
			}

			else
				this.matrix_playground[x_center - i][y_center]++;
		}
	
		if((y_center + i) < Y_TILES && !this.down_ostacle && this.check_explosivity(x_center, y_center + i, "down")){
			if(this.matrix_playground[x_center][y_center + i] <= -5){
				this.matrix_playground[x_center][y_center + i]--;
			}

			else
				this.matrix_playground[x_center][y_center + i]++;
		}
	
		if((y_center - i) >= 0 && !this.up_ostacle &&  this.check_explosivity(x_center, y_center - i, "up")){
			if(this.matrix_playground[x_center][y_center - i] <= -5){
				this.matrix_playground[x_center][y_center - i]--;
			}

			else
				this.matrix_playground[x_center][y_center - i]++;
		}
	}
}

// Memorizza nella matrice di playground i valori relativi all'esplosione appena terminata
Playground.prototype.unset_explosion_matrix_position = function(x_center, y_center, power_bomb){
	
	// Inizializzazione variabili per gestione ostacoli esplosioni
	this.up_ostacle = false;
	this.down_ostacle = false;
	this.left_ostacle = false;
	this.right_ostacle = false;

	// Gestione terminazione esplosione

	// Disattivazione esplosione al centro dell'esplosione
	if(this.check_explosivity(x_center, y_center)){
		this.matrix_playground[x_center][y_center]--;
	}

	// Disattivazione esplosione nei tile contigui al crescere del raggio
	for(var i = 1; i <= power_bomb; i++){
		var j = i;		

		if((x_center + i) < X_TILES && !this.right_ostacle && this.check_explosivity(x_center + i, y_center, "right"))
			this.matrix_playground[x_center + i][y_center]--;

		if((x_center - i) >= 0 && !this.left_ostacle && this.check_explosivity(x_center - i, y_center, "left"))
			this.matrix_playground[x_center - i][y_center]--;
	
		if((y_center + j) < Y_TILES && !this.down_ostacle && this.check_explosivity(x_center, y_center + j, "down"))
			this.matrix_playground[x_center][y_center + j]--;
	
		if((y_center - j) >= 0 && !this.up_ostacle && this.check_explosivity(x_center, y_center - j, "up"))
			this.matrix_playground[x_center][y_center - j]--;
	}
}

// Funzione che controlla se un tile può essere contrassegnato come oggetto di esplosione
Playground.prototype.check_explosivity = function(x, y, direction){
	
	// Variabile di utilità per snellire il codice
	var check = this.matrix_playground[x][y];

	if(check >= 0 || check <= -5)
		return true;

	if(check == -3){
			this.matrix_playground[x][y] = 0;
			return true;
	}

	// In base alla direzione dell'esplosione setto la variabili per il corrispondente ostacolo
	else { 
		if(direction == "up")
			this.up_ostacle = true;
		else if(direction == "left")
			this.left_ostacle = true;
		else if(direction == "right")
			this.right_ostacle = true;
		else if(direction == "down")
			this.down_ostacle = true;

		// Caso con blocco distruttibile
		if(check == -2)
			this.matrix_playground[x][y] = -4;

		if(check == -4)
			this.matrix_playground[x][y] = -3;
		
		return false;
	}
}

//Registra nella matrice la presenza di un bonus/malus
Playground.prototype.set_bonus = function(x_matrix, y_matrix){
	this.matrix_playground[x_matrix][y_matrix] = -3;
}

//Cancella dalla matrice un bonus/malus
Playground.prototype.unset_bonus = function(x_matrix, y_matrix){
	this.matrix_playground[x_matrix][y_matrix] = 0;
}

// Controlla se un giocatore è entrato in un tile dove vi è presente un balloon
Playground.prototype.check_balloon_murder = function(index, is_dead){
	if((this.x_matrix_player[0] == this.x_matrix_balloon[index]) && (this.y_matrix_player[0] == this.y_matrix_balloon[index])){
		return true;
	}

	else if(is_dead == true){
		return true;
	}

	else{
		return false;
	}

}

// Controlla se un balloon è entrato in un tile dove vi è presente un'esplosione in corso
Playground.prototype.check_balloon_death = function(index){
	if(this.matrix_playground[this.x_matrix_balloon[index]][this.y_matrix_balloon[index]] > 0)
		return true;
	else
		return false;
}