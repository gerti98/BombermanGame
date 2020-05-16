/****     
+++++  Gestione base del nemico Balloon ++++++++++++++++++++++++++++++++++++
****/

function Balloon(x, y){
	// Posizione dell'oggetto nel 'div' playground 
	this.point = new Point(x, y);

	this.width = BALLOON_WIDTH;
	this.height = BALLOON_HEIGHT;
	this.sprite_height = BALLOON_SPRITE_HEIGHT;

	// Contatori per gestire velocità animazioni
	this.animation_counter = 0;
	this.death_counter = 0;

	// Contatore per effettuare una scelta di movimento 
	this.decision_counter = 0;

	// Memorizza l'ultima decisione
	this.last_decision = "down";

	// Abilita o meno il movimento del balloon (in caso, ad esempio, non vi siano spazi vuoti per muoversi)
	this.permit_movement = false;

	// Controlla stato del balloon
	this.is_dead = false;

	// Controlla se il punto, dopo l'uccisione del balloon, è stato già preso o meno 
	this.point_taken = false;
	this.velocity = DEFAULT_VELOCITY;

}


//Funzione che permette di aggiornare i contatori per le azioni del balloon
Balloon.prototype.update_counter = function(flag){
	this.animation_counter = (this.animation_counter + 1) % 40;
	this.decision_counter = (this.decision_counter + 1) % 101;
	
	if(!this.is_dead){
		this.is_dead = flag;
	}

	if(this.is_dead){
		this.death_counter++;
	}
} 


//Funzione che permette di effettuare una scelta di movimento per il balloon
Balloon.prototype.make_decision = function(x_matrix, y_matrix, matrix_playground){
	// 0, -3 sono tile passabili
	var decision = 4;
	var count = 0;

	count = this.check_proximity(x_matrix, y_matrix, matrix_playground, count);

	if(count == 0){
		this.permit_movement = false; // Non mi posso muovere
		return;
	}

	while(true){
		decision = 4;		
		decision = Math.floor(Math.random()*decision);
		switch(decision){
			case 0:
				if(x_matrix + 1 < X_TILES && (matrix_playground[x_matrix + 1][y_matrix] == 0 
				   || matrix_playground[x_matrix + 1][y_matrix] == -3)){
					
					this.last_decision = "right";
					this.permit_movement = true;				
					return;
				}
				break;

			case 1:
				if(y_matrix + 1 < Y_TILES && (matrix_playground[x_matrix][y_matrix + 1] == 0 
				   || matrix_playground[x_matrix][y_matrix + 1] == -3)){

					this.last_decision = "down";
					this.permit_movement = true;
					return;
				}
				break;
			
			case 2:
				if(y_matrix - 1 >= 0 && (matrix_playground[x_matrix][y_matrix - 1] == 0 
				   || matrix_playground[x_matrix][y_matrix - 1] == -3)){
					
					this.last_decision = "up";
					this.permit_movement = true;
					return;
				}
				break;

			case 3:
				if(x_matrix - 1 >= 0 && (matrix_playground[x_matrix - 1][y_matrix] == 0 
				   || matrix_playground[x_matrix - 1][y_matrix] == -3)){
					
					this.last_decision = "left"
					this.permit_movement = true;
					return;
				}
				break;
		}
	}
}

//Funzione che controlla se vi è uno spazio libero per il movimento in prossimità del balloon
Balloon.prototype.check_proximity = function(x_matrix, y_matrix, matrix_playground, count){
	//Controllo se esiste almeno uno spazio passabile
		if(x_matrix - 1 >= 0 && (matrix_playground[x_matrix - 1][y_matrix] == 0 ||
		 matrix_playground[x_matrix - 1][y_matrix] == -3)){
			
			count++;
		}

		if(x_matrix + 1 < X_TILES && (matrix_playground[x_matrix + 1][y_matrix] == 0 
			|| matrix_playground[x_matrix + 1][y_matrix] == -3)){
			
			count++;
		}
		if(y_matrix - 1 >= 0 && (matrix_playground[x_matrix][y_matrix - 1] == 0 
			|| matrix_playground[x_matrix][y_matrix - 1] == -3)){
			
			count++;
		}
		if(y_matrix + 1 < Y_TILES && (matrix_playground[x_matrix][y_matrix + 1] == 0 
			|| matrix_playground[x_matrix][y_matrix + 1] == -3)){
			
			count++;
		}

		return count;
}


//Funzione che aggiorna le coordinate del punto che identifica il balloon, in base all'ultima scelta
//della make_decision()
Balloon.prototype.move = function(){
	var x_direction = 0;
	var y_direction = 0;

	switch(this.last_decision){
		case "up":
			y_direction = -1;
			break;

		case "down":
			y_direction = 1;
			break;

		case "left":
			x_direction = -1;
			break;

		case "right":
			x_direction = 1;
			break;
	}

	if(!this.is_dead && this.permit_movement){
		this.point.x += this.velocity*x_direction;
		this.point.y += this.velocity*y_direction;
	}
}


Balloon.prototype.set_point_taken = function(){
	this.point_taken = true;
}