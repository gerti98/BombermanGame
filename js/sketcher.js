/****     
+++++  Gestione base della creazione degli elementi visivi (sprite) ++++++++
----------------------------------------------------------------------------

----------------------------------------------------------------------------
****/

// Costanti relativi ad alcuni id per le rappresentazioni grafiche dei elementi di gioco
var PLAYER_ID = 'player';
var BALLOON_ID = 'balloon';
var PLAYER_BLOCK_ID = 'player_block';
var BALLOON_BLOCK_ID = 'balloon_block';
var BLOCK_BASE_ID = 'block';
var BOMB_ID = 'bomb';
var EXPLOSION_ID = 'explosion'

// Oggetto che ha il compito di 'disegnare' a schermo tutte le risorse grafiche
function Sketcher(playgroundWrapper, score_container){
	this.playground = playgroundWrapper.childNodes[1];
	this.gameStat = [];
	this.gameStat[0] = score_container.childNodes[1];
	this.gameStat[1] = score_container.childNodes[3];

	console.log(this.gameStat);

	// Variabile che costituisce l'id di partenza per tutti i div creati dinamicamente
	this.baseElementsId = playgroundWrapper.id + '_';  
}

// Funzione che gestisce le risorse grafiche relative al giocatore
Sketcher.prototype.draw_player = function(player, index_player) {

	//Modifico il documento html in modo dinamico creando un nuovo div con id e classe settati
	var playerNode = document.getElementById(this.baseElementsId + PLAYER_ID + "_" + index_player);
	var playerNodeBlock = document.getElementById(this.baseElementsId + PLAYER_BLOCK_ID + "_" + index_player);

	// Creazione dinamica del div relativo al giocatore
	if(playerNode === null){
		playerNode = document.createElement('div');
		playerNode.setAttribute('id', this.baseElementsId + PLAYER_ID + "_" + index_player);
		playerNode.setAttribute('class', PLAYER_ID);

		if(index_player == 0)
			playerNode.style.backgroundImage = "url('./../css/img/player_sprites/down_idle.png')";
		
		if(index_player == 1)
			playerNode.style.backgroundImage = "url('./../css/img/player_sprites/down_idle_2.png')";
		
		this.playground.appendChild(playerNode);
	}
	
	// Memorizzazione caratteristiche geometriche e posizione del giocatore nel playground
	playerNode.style.left = (player.point.x - player.width/2) + "px";
	playerNode.style.top = (player.point.y + player.height/2 - player.sprite_height) + "px";

	this.draw_player_movement_sprite(playerNode, player, index_player);
	
	playerNode.style.width = player.width  + "px";
	playerNode.style.height = player.sprite_height + "px";

}

//TODO: semplificare questa funzione con una funzione di utilità
// Funzione che gestisce le animazioni di movimento del giocatore
Sketcher.prototype.draw_player_movement_sprite = function(playerNode, player, index_player){

	// Variabile di utilità per snellire il codice
	var sprite = playerNode.style.backgroundImage;
	/*** gestione grafica animazione camminata del giocatore ***/
	
	// Movimento verso il basso
	if(player.latest_input == "down" && player.any_input){
		if(player.down_counter_pace == 1)
			sprite = DOWN_MOVEMENT_SX;
		else if(player.down_counter_pace == 6)
			sprite = DOWN_IDLE;
		else if(player.down_counter_pace == 11)
			sprite = DOWN_MOVEMENT_DX;
		else if(player.down_counter_pace == 16)
			sprite = DOWN_IDLE;
		player.down_counter_pace = (player.down_counter_pace + 1) % 21;
	}

	// Movimento verso l'alto
	else if(player.latest_input == "up" && player.any_input){
		if(player.up_counter_pace == 1)
			sprite = UP_MOVEMENT_SX;
		else if(player.up_counter_pace == 6)
			sprite = UP_IDLE;
		else if(player.up_counter_pace == 11)
			sprite = UP_MOVEMENT_DX;
		else if(player.up_counter_pace == 16)
			sprite = UP_IDLE;
		player.up_counter_pace = (player.up_counter_pace + 1)%21;
	}

	// Movimento verso sinistra
	else if(player.latest_input == "left" && player.any_input){
		if(player.left_counter_pace == 1)
			sprite = LEFT_MOVEMENT_SX;
		else if(player.left_counter_pace == 6)
			sprite = LEFT_IDLE;
		else if(player.left_counter_pace == 11)
			sprite = LEFT_MOVEMENT_DX;
		else if(player.left_counter_pace == 16)
			sprite = LEFT_IDLE;
		player.left_counter_pace = (player.left_counter_pace + 1)%21;
	}

	// Movimento verso destra
	else if(player.latest_input == "right" && player.any_input){
		if(player.right_counter_pace == 1)
			sprite = RIGHT_MOVEMENT_SX;
		else if(player.right_counter_pace == 6)
			sprite = RIGHT_IDLE;
		else if(player.right_counter_pace == 11)
			sprite = RIGHT_MOVEMENT_DX;
		else if(player.right_counter_pace == 16)
			sprite = RIGHT_IDLE;
		player.right_counter_pace = (player.right_counter_pace + 1)%21;
	}

	if(index_player == 1)
		sprite = sprite + "_2";

	sprite = sprite + END_MOVEMENT;

	// Aggiornamento risorsa grafica del giocatore
	playerNode.style.backgroundImage = sprite;
}

// Funzione per gestione grafica del giocatore in assenza di input di movimento 
Sketcher.prototype.draw_player_idle_sprite = function(player, index_player){
	var playerNode = document.getElementById(this.baseElementsId + PLAYER_ID + "_" + index_player);

	// Variabile di utilità per snellire il codice
	var sprite = playerNode.style.backgroundImage;
	
	//Gestione grafica animazione a partire dall'ultimo input di movimento effettuato
	if(player.latest_input == "down")
		sprite = DOWN_IDLE;

	else if(player.latest_input == "up")
		sprite = UP_IDLE;
	
	else if(player.latest_input == "left")
		sprite = LEFT_IDLE;
	
	else if(player.latest_input == "right")
		sprite = RIGHT_IDLE;

	else // DEBUGGING VARIO
		console.log("problema");

	// Aggiornamento risorsa grafica del giocatore

	if(index_player == 1)
		sprite = sprite + "_2";

	sprite = sprite + END_MOVEMENT;
	playerNode.style.backgroundImage = sprite;
}

// Funzione che gestisce animazione morte del giocatore 
Sketcher.prototype.draw_death = function(player, index_player){
	var playerNode = document.getElementById(this.baseElementsId + PLAYER_ID + "_" + index_player);
	var sprite;

	if(player.death_counter == 0)
		sprite = DEATH_0;
	else if(player.death_counter == 10)
		sprite = DEATH_1;
	else if(player.death_counter == 20)
		sprite = DEATH_2;
	else if(player.death_counter == 30)
		sprite = DEATH_3;
	else if(player.death_counter >= 40)
		// In caso di fine del ciclo di animazione il giocatore viene 'eliminato' completamente dal playground
		this.move_out_object(playerNode);

	// Aggiornamento grafica e caratteristiche geometriche del giocatore (sprite morte sono più grandi)
	playerNode.style.width = player.sprite_height + "px";
	playerNode.style.left = (player.point.x - player.sprite_height/2) + "px";
	playerNode.style.backgroundImage = sprite;
}

// Funzione che gestisce animazione bomba in esplosione
Sketcher.prototype.draw_bomb = function(bomb, index_bomb, power_bomb, matrix_playground){

	var bombNode = document.getElementById(this.baseElementsId + BOMB_ID + index_bomb);

	// Creazione dinamica del div relativo alla bomba
	if(bombNode === null){
		bombNode = document.createElement('div')
		bombNode.setAttribute('id', this.baseElementsId + BOMB_ID + index_bomb);
		bombNode.setAttribute('class', BOMB_ID);
		this.playground.appendChild(bombNode);
	}

	// Aggiornament caratteristiche geometriche della bomba
	if(!bomb.finish){
		bombNode.style.left = (bomb.point.x - bomb.width/2) + "px";
		bombNode.style.top = (bomb.point.y - bomb.height/2) + "px";
	}

	this.draw_bomb_animation_sprite(bomb, index_bomb, bombNode);

	bombNode.style.width = bomb.width + "px";
	bombNode.style.height = bomb.height + "px";

}

// Funzione che gestisce l'animazione di preparazione e di esplosione della bomba e di tutti i tile corrispondenti
Sketcher.prototype.draw_bomb_animation_sprite = function(bomb, index_bomb, bombNode){

	// Variabile di utilità per snellire il codice
	var sprite = bombNode.style.backgroundImage;

	// Gestione grafica al variare del contatore 
	if(bomb.counter_pace == 0 || bomb.counter_pace == 48 || bomb.counter_pace == 96)  
		sprite = BOMB_1

	else if(bomb.counter_pace == 12 || bomb.counter_pace == 60 || bomb.counter_pace == 108)
		sprite = BOMB_0;

	else if(bomb.counter_pace == 24 || bomb.counter_pace == 72 || bomb.counter_pace == 120)
		sprite = BOMB_1;

	else if(bomb.counter_pace == 36 || bomb.counter_pace == 84 || bomb.counter_pace == 132)
		sprite = BOMB_2;

	else if(bomb.counter_pace == 138 || bomb.counter_pace == 174)
		sprite = CENTER_EXPLOSION_3;
	
	else if(bomb.counter_pace == 144 || bomb.counter_pace == 168)
		sprite = CENTER_EXPLOSION_2;
	
	else if(bomb.counter_pace == 150 || bomb.counter_pace == 162)
		sprite = CENTER_EXPLOSION_1;

	else if(bomb.counter_pace == 156)	
		sprite = CENTER_EXPLOSION_0;

	else if(bomb.counter_pace == 180){
		this.move_out_object(bombNode);

		// Fine dell'esplosione 
		bomb.set_finish();
	}

	// Aggiornamento grafica della bomba e/o dell'esplosione
	bombNode.style.backgroundImage = sprite;
}

// Funzione che 'elimina' dal playground tutti gli elementi di gioco che hanno terminato la loro funzione
// Es. esplosioni terminate, blocchi distrutti, giocatori 'morti', bonus e malus presi 
Sketcher.prototype.move_out_object = function(obj){
	obj.style.left = '-9999px';
	obj.style.top = '-9999px';
	obj.style.backgroundImage = null;
}

// Funzione che gestisce la creazione di tutte le risorse grafiche atte a rappresentare l'esplosione di una bomba
Sketcher.prototype.draw_explosion = function(bomb, index_bomb, power_bomb, matrix_playground){

	// Creazione variabili di utilità 
	var bomb_explosion_vector_left = [];
	var bomb_explosion_vector_right = [];
	var bomb_explosion_vector_up = [];
	var bomb_explosion_vector_down = [];

	// Variabili booleane che rispecchiano la presenza di un ostacolo che inibisce il propagarsi dell'esplosione
	var down_obstacle = false;
	var up_obstacle = false;
	var left_obstacle = false;
	var right_obstacle = false;


	for(var j = 0; j + 1 <= power_bomb; j++){
		var i = j + 1;
		bomb_explosion_vector_left[j] = document.getElementById(this.baseElementsId + BOMB_ID + index_bomb + "_left" + i);
		bomb_explosion_vector_right[j] = document.getElementById(this.baseElementsId + BOMB_ID + index_bomb + "_right" + i);
		bomb_explosion_vector_up[j] = document.getElementById(this.baseElementsId + BOMB_ID + index_bomb + "_up" + i);
		bomb_explosion_vector_down[j] = document.getElementById(this.baseElementsId + BOMB_ID + index_bomb + "_down" + i);

		if(bomb_explosion_vector_left[j] === null && !left_obstacle && bomb.x_matrix - i >= 0 
			&& (matrix_playground[bomb.x_matrix - i][bomb.y_matrix] >= 0 || matrix_playground[bomb.x_matrix - i][bomb.y_matrix] == -3)){
			bomb_explosion_vector_left[j] = document.createElement('div')
			bomb_explosion_vector_left[j].setAttribute('id', this.baseElementsId + BOMB_ID + index_bomb + "_left" + i);
			bomb_explosion_vector_left[j].setAttribute('class', EXPLOSION_ID);
			this.playground.appendChild(bomb_explosion_vector_left[j]); 
		}

		else 
			left_obstacle = true;

		if(bomb_explosion_vector_right[j] === null && !right_obstacle && bomb.x_matrix + i < X_TILES && 
			(matrix_playground[bomb.x_matrix + i][bomb.y_matrix] >= 0 || matrix_playground[bomb.x_matrix + i][bomb.y_matrix] == -3)){
			bomb_explosion_vector_right[j] = document.createElement('div')
			bomb_explosion_vector_right[j].setAttribute('id', this.baseElementsId + BOMB_ID + index_bomb + "_right" + i);
			bomb_explosion_vector_right[j].setAttribute('class', EXPLOSION_ID);
			this.playground.appendChild(bomb_explosion_vector_right[j]);
		}

		else 
			right_obstacle = true;

		if(bomb_explosion_vector_up[j] === null && !up_obstacle && bomb.y_matrix - i >= 0 && 
			(matrix_playground[bomb.x_matrix][bomb.y_matrix - i] >= 0  || matrix_playground[bomb.x_matrix][bomb.y_matrix - i] == -3)){
			bomb_explosion_vector_up[j] = document.createElement('div')
			bomb_explosion_vector_up[j].setAttribute('id', this.baseElementsId + BOMB_ID + index_bomb + "_up" + i);
			bomb_explosion_vector_up[j].setAttribute('class', EXPLOSION_ID);
			this.playground.appendChild(bomb_explosion_vector_up[j]);
		}

		else 
			up_obstacle = true;

		if(bomb_explosion_vector_down[j] === null && !down_obstacle && bomb.y_matrix + i < Y_TILES &&
		   (matrix_playground[bomb.x_matrix][bomb.y_matrix + i] >= 0  || matrix_playground[bomb.x_matrix][bomb.y_matrix + i] == -3)){
			bomb_explosion_vector_down[j] = document.createElement('div')
			bomb_explosion_vector_down[j].setAttribute('id', this.baseElementsId + BOMB_ID + index_bomb + "_down" + i);
			bomb_explosion_vector_down[j].setAttribute('class', EXPLOSION_ID);
			this.playground.appendChild(bomb_explosion_vector_down[j]);
		}

		else 
			down_obstacle = true;

		this.check_last_conditions(bomb, index_bomb, power_bomb, matrix_playground, bomb_explosion_vector_left, 
			bomb_explosion_vector_up, bomb_explosion_vector_right, bomb_explosion_vector_down, j);
	}

	this.draw_explosion_animation(bomb_explosion_vector_left, bomb, "left");
	this.draw_explosion_animation(bomb_explosion_vector_down, bomb, "down");
	this.draw_explosion_animation(bomb_explosion_vector_right, bomb, "right");
	this.draw_explosion_animation(bomb_explosion_vector_up, bomb, "up");
}

// Funzione che gestisce le ultime condizioni riguardanti la grafica delle esplosioni
Sketcher.prototype.check_last_conditions = function(bomb, index_bomb, power_bomb, matrix_playground, bomb_explosion_vector_left, 
	bomb_explosion_vector_up, bomb_explosion_vector_right, bomb_explosion_vector_down, j){

	var i = j + 1;

	if(!bomb.finish){

			if(bomb_explosion_vector_left[j] != null){
				bomb_explosion_vector_left[j].style.left = (bomb.point.x - bomb.width/2 - TILE_SIDE*i) + "px";
				bomb_explosion_vector_left[j].style.top = (bomb.point.y - bomb.height/2) + "px";
			}

			if(bomb_explosion_vector_right[j] != null){
				bomb_explosion_vector_right[j].style.left = (bomb.point.x - bomb.width/2 + TILE_SIDE*i) + "px";
				bomb_explosion_vector_right[j].style.top = (bomb.point.y - bomb.height/2) + "px";
			}

			if(bomb_explosion_vector_up[j] != null){
				bomb_explosion_vector_up[j].style.left = (bomb.point.x - bomb.width/2) + "px";
				bomb_explosion_vector_up[j].style.top = (bomb.point.y - bomb.height/2 - TILE_SIDE*i) + "px";
			}

			if(bomb_explosion_vector_down[j] != null){
				bomb_explosion_vector_down[j].style.left = (bomb.point.x - bomb.width/2) + "px";
				bomb_explosion_vector_down[j].style.top = (bomb.point.y - bomb.height/2 + TILE_SIDE*i) + "px";
			}
		}

		if(bomb_explosion_vector_left[j] != null){
			bomb_explosion_vector_left[j].style.width = bomb.width + "px";
			bomb_explosion_vector_left[j].style.height = bomb.height + "px";
		}		

		if(bomb_explosion_vector_right[j] != null){
			bomb_explosion_vector_right[j].style.width = bomb.width + "px";
			bomb_explosion_vector_right[j].style.height = bomb.height + "px";
		}

		if(bomb_explosion_vector_down[j] != null){
			bomb_explosion_vector_down[j].style.width = bomb.width + "px";
			bomb_explosion_vector_down[j].style.height = bomb.height + "px";
		}

		if(bomb_explosion_vector_up[j] != null){
			bomb_explosion_vector_up[j].style.width = bomb.width + "px";
			bomb_explosion_vector_up[j].style.height = bomb.height + "px";
		}
}

// Funzione che gestisce le animazioni delle esplosioni
Sketcher.prototype.draw_explosion_animation = function(bomb_explosion_vector, bomb, dir){
	
	var explosion_string;

	if(dir == "left" || dir == "right")
		var bomb_dir = "horizontal";
	else if(dir == "up" || dir == "down")
		var bomb_dir = "vertical";
	
	for(var i = 0; i < bomb_explosion_vector.length; i++){
		if(i + 1 == bomb_explosion_vector.length)
			explosion_string = dir;
		else 
			explosion_string = bomb_dir;  	
		if(bomb_explosion_vector[i] === null)
			return;

		var sprite;
		if(bomb.counter_pace == 138 || bomb.counter_pace == 174)
			sprite = INIT_EXPLOSION + explosion_string + END_EXPLOSION_3;
		
		else if(bomb.counter_pace == 144 || bomb.counter_pace == 168)
			sprite = INIT_EXPLOSION + explosion_string + END_EXPLOSION_2;
		
		else if(bomb.counter_pace == 150 || bomb.counter_pace == 162)
			sprite = INIT_EXPLOSION + explosion_string + END_EXPLOSION_1;

		else if(bomb.counter_pace == 156)	
			sprite = INIT_EXPLOSION + explosion_string + END_EXPLOSION_0;

		else if(bomb.counter_pace == 180){
			this.move_out_object(bomb_explosion_vector[i]);
		}
		bomb_explosion_vector[i].style.backgroundImage = sprite;
	}
	
}

// Funzione che gestisce la grafica dei blocchi
Sketcher.prototype.draw_block = function(block, index_block) {

	//Modifico il documento html in modo dinamico creando un nuovo div con id e classe settati
	var blockNodeId = BLOCK_BASE_ID + index_block + "_[" + block.type_block + "]";
	var blockNode = document.getElementById(this.baseElementsId + blockNodeId);

	if(blockNode === null){
		blockNode = document.createElement('div');
		blockNode.setAttribute('id', this.baseElementsId + blockNodeId);
		blockNode.setAttribute('class', BLOCK_BASE_ID);
		
		if(block.type_block == 0)
			blockNode.style.backgroundImage = "url('./../css/img/block_0.png')";
		else if(block.type_block == 1)
			blockNode.style.backgroundImage = "url('./../css/img/broken_block/broken_block_0.png')"
		else if(block.type_block == 2)
			blockNode.style.backgroundImage = null;


		this.playground.appendChild(blockNode);
	}
	
	//Setto la posizione del punto, rispetto alla grafica del blocco
	blockNode.style.left = (block.point.x - block.width/2) + "px";
	blockNode.style.top = (block.point.y - block.height/2) + "px";

	//console.log("wwwe2");
	this.draw_block_explosion_animation(block, index_block, blockNode, block.type_bonus_malus);

	blockNode.style.width = block.width + "px";
	blockNode.style.height = block.height + "px";
}

// Funzione che gestisce l'animazione dei blocchi distrutti
Sketcher.prototype.draw_block_explosion_animation = function(block, index_block, blockNode, type_bonus){;

	var sprite = blockNode.style.backgroundImage;

	if(block.animation_counter == 1)
		sprite = BROKEN_BLOCK_1;
	else if(block.animation_counter == 11)
		sprite = BROKEN_BLOCK_2;
	else if(block.animation_counter == 21)
		sprite = BROKEN_BLOCK_3;
	else if(block.animation_counter == 31)
		sprite = BROKEN_BLOCK_4;

	else if(block.animation_counter >= 40 && type_bonus == NO_BONUS_MALUS){
		sprite = null;
	}

	else if(block.animation_counter >= 40){
		switch(type_bonus){
			case BOMB_PLUS: 		
				sprite = BOMB_BONUS;
				break;
			case BOMB_MINUS:    
			    sprite = BOMB_MALUS;
				break;
			case SPEED_PLUS:     
				sprite = SPEED_BONUS;
				break;
			case SPEED_MINUS:    
				sprite = SPEED_MALUS;
				break;
			case HEARTH_PLUS:    
				sprite = HEARTH_BONUS;
				break;
			case POWER_PLUS:     
				sprite = POWER_BONUS;
				break;
			case POWER_MINUS:    
				sprite = POWER_MALUS;
				break;
		}
	}
	blockNode.style.backgroundImage = sprite;
}

//Funzione che aggiorna graficamente la finestra degli score
Sketcher.prototype.update_score_stats = function(scoreStat, index_player){
	var gameStats = this.gameStat[index_player].getElementsByTagName('span');
	gameStats[0].firstChild.nodeValue = scoreStat.bomb_power;
 	gameStats[2].firstChild.nodeValue = scoreStat.lives;
 	gameStats[1].firstChild.nodeValue = scoreStat.speed;
 	gameStats[3].firstChild.nodeValue = scoreStat.contemporary_bombs;
 	gameStats[4].firstChild.nodeValue = scoreStat.score;
}

// Funzione che ha il compito di gestire la grafica dei balloon
Sketcher.prototype.draw_balloon = function(balloon, index_balloon){
	//Modifico il documento html in modo dinamico creando un nuovo div con id e classe settati
	var balloonNode = document.getElementById(this.baseElementsId + BALLOON_ID + "_" + index_balloon);
	var balloonNodeBlock = document.getElementById(this.baseElementsId + BALLOON_BLOCK_ID + "_" + index_balloon);

	// Creazione dinamica del div relativo al giocatore
	if(balloonNode === null){
		balloonNode = document.createElement('div');
		balloonNode.setAttribute('id', this.baseElementsId + BALLOON_ID + "_" + index_balloon);
		balloonNode.setAttribute('class', BALLOON_ID);
		this.playground.appendChild(balloonNode);
	}
	
	// Memorizzazione caratteristiche geometriche e posizione del giocatore nel playground
	balloonNode.style.left = (balloon.point.x - balloon.width/2) + "px";
	balloonNode.style.top = (balloon.point.y + balloon.height/2 - balloon.sprite_height) + "px";

	this.draw_animation_balloon(balloonNode, balloon.animation_counter, balloon.last_decision);

	balloonNode.style.width = balloon.width  + "px";
	balloonNode.style.height = balloon.sprite_height + "px";
}

// Funzione che ha il compito di gestire le animazioni dei balloon
Sketcher.prototype.draw_animation_balloon = function(balloonNode, animation_counter, last_decision){
	var sprite = balloonNode.style.backgroundImage;

	if(animation_counter == 0)
		sprite = INIT_BALLOON + last_decision + END_BALLOON_0;
	else if(animation_counter == 10)
		sprite = INIT_BALLOON + last_decision + END_BALLOON_1;
	else if(animation_counter == 20)
		sprite = INIT_BALLOON + last_decision + END_BALLOON_2;
	else if(animation_counter == 30)
		sprite = INIT_BALLOON + last_decision + END_BALLOON_1;

	balloonNode.style.backgroundImage = sprite;
}

// Funzione che ha il compito di gestire l'animazione di morte del balloon
Sketcher.prototype.draw_balloon_death = function(index_balloon, balloon){
	var balloonNode = document.getElementById(this.baseElementsId + BALLOON_ID + "_" + index_balloon);
	var sprite;
	//console.log(sprite);

	if(balloon.death_counter < 50)
		sprite = DEATH_BALLOON;
	else if(balloon.death_counter >= 50)
		// In caso di fine del ciclo di animazione il giocatore viene 'eliminato' completamente dal playground
		this.move_out_object(balloonNode);

	// Aggiornamento grafica e caratteristiche geometriche del giocatore (sprite morte sono più grandi)
	balloonNode.style.backgroundImage = sprite;
}

// Funzione che elimina tutti gli elementi del gioco
Sketcher.prototype.removeAll = function() {
		var elements = this.playground.getElementsByTagName('div');
		for (var i = elements.length-1; i >=0; i--)
			this.playground.removeChild(elements[i]);

}

// Funzione che gestisce il tempo rimanente
Sketcher.prototype.update_time = function(time){
	var time_node = document.getElementById('time');
	var node = time_node.getElementsByTagName('span');
	node[0].firstChild.nodeValue = time;
}
