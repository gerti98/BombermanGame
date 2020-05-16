/****     
+++++  Gestione base del gioco +++++++++++++++++++++++++++++++++++++++++++++
----------------------------------------------------------------------------
	Controlli del giocatore 1:
	WASD: Movimento
	J: Piazzamento bomba

	Controlli del giocatore 2:
	TASTI FRECCIA: Movimento
	ENTER (Blocco Numerico) : Piazzamento Bomba
----------------------------------------------------------------------------
****/

// File iniziale chiamato dopo il caricamento della pagina
var game = null;
var modality = null;
var first_game = true;
var second_game = false;


//Gestione modalità singleplayer
function begin_single_player(){
	modality = "singleplayer";
	begin_game();
}

//Gestione modalità multiplayer
function begin_multi_player(){
	modality = "multiplayer";
	begin_game();
}

// Funzione di inizializzazione del gioco
function begin_game(){
	var playground = document.getElementsByClassName('playground_menu');

	
	playground[0].removeChild(playground[0].childNodes[0]);
	playground[0].removeChild(playground[0].childNodes[0]);
	
	if(first_game || second_game){
		playground[0].removeChild(playground[0].childNodes[0]);
		second_game = false;
	}

	if(first_game){
		playground[0].removeChild(playground[0].childNodes[0]);
		first_game = false;
		second_game = true;
	}
	
	playground[0].setAttribute('class', 'playground');

	//Funzione che renderizza la finestra del gameStat con le informazioni 
	//relative alla modalità di gioco corrente
	set_gameStat();

	console.log("Gioco in avvio...");
	game = new Game(document.getElementById('playgroundWrapper'));
}

//Funzione che setta la finestra del gamestat (in base alla modalità scelta)
function set_gameStat(){
	var player1_stats_node = document.getElementById('player1_stats');
	player1_stats_node.style.display = "inline";

	var player2_stats_node = document.getElementById('player2_stats');

	if(modality == "multiplayer")
		player2_stats_node.style.display = "inline";
}

//Funzione che nasconde la finestra del gamestat
function unset_gameStat(){
	var player1_stats_node = document.getElementById('player1_stats');
	player1_stats_node.style.display = "none";

	var player2_stats_node = document.getElementById('player2_stats');
	player2_stats_node.style.display = "none";
}

// Oggetto game
function Game(playgroundWrapper){
	var playground = playgroundWrapper.childNodes[1];
	
	this.playgroundWrapper = playgroundWrapper;

	this.func_1 = this.take_input.bind(this);
	this.func_2 = this.release_input.bind(this);

	// Sezione di intercettazione dei input da tastiera
	document.addEventListener("keydown", this.func_1);
	document.addEventListener("keyup", this.func_2);

	// Creazione degli di interesse del gioco
	this.player = [];
	this.player[0] = new Player(72, 72, PLAYER_RADIUS, 0, DEFAULT_LIVES);
	

	if(modality == "multiplayer"){
		this.player[1] = new Player(72 + 12*48, 72 + 8*48, PLAYER_RADIUS, 0, DEFAULT_LIVES);
	}

	this.ScoreStats = [];
	this.ScoreStats[0] = new ScoreStat(0);
	if(this.player.length == 2){
		this.ScoreStats[1] = new ScoreStat(1);
	}

	this.playground = new Playground(playground); 

	var score_container = document.getElementById('gameStat_container');
	console.log(score_container);
	console.log(playgroundWrapper);
	this.sketcher = new Sketcher(playgroundWrapper, score_container);	
	this.blocks = [];
	this.build_playground();
	this.bombs = [];

	if(this.player.length == 1){
		this.level = 1;
		this.balloon_number = 2;

		this.balloons = [];
		this.spawn_ballons();
		this.time = TIME_SINGLEPLAYER;

	}
	else{
		this.time = TIME_MULTIPLAYER;
	}

	this.clock_manager();
}

// Funzione che gestisce il ritorno al menu iniziale
Game.prototype.return_menu = function(){

	document.removeEventListener("keydown", this.func_1);
	document.removeEventListener("keyup", this.func_2);

	//Rimuovi popup
	this.player = [];
	this.remove_popup();
	this.sketcher.removeAll();
	this.blocks = [];
	this.bombs = [];
	this.balloons = [];	

	this.time = "-";
	this.sketcher.update_time(this.time);
	var playground = document.getElementsByClassName('playground');

	
	var img = document.createElement('img');
	img.setAttribute('src', './../css/img/bomberman_logo.png');
	img.setAttribute('alt', 'Bomberman_logo');
	img.setAttribute('class', 'logo_img_start_game');

	var options = document.createElement('div');
	options.setAttribute('class', 'options');

	var button = document.createElement('button');
	button.setAttribute('class', 'btn');
	button.setAttribute('onclick', 'begin_single_player()');

	var button_value = document.createTextNode('Single Player');
	button.appendChild(button_value);
	
	var button2 = document.createElement('button');
	button2.setAttribute('class', 'btn');
	button2.setAttribute('onclick', 'begin_multi_player()');

	var button_value2 = document.createTextNode('Multiplayer Locale');
	button2.appendChild(button_value2);

	console.log(button);
	console.log(button2);
	console.log(options);
	options.appendChild(button);
	options.appendChild(button2);
	
	playground[0].appendChild(img);
	playground[0].appendChild(options);
	playground[0].setAttribute('class', 'playground_menu');

	unset_gameStat();
	console.log("Pausa")
}

//Funzione che resetta il tempo del timer
Game.prototype.reset_time = function(){
	if(this.player.length == 1)
		this.time = TIME_SINGLEPLAYER;
	
	else
		this.time = TIME_MULTIPLAYER;
}

// Funzione che gestisce il passaggio al livello successivo dopo aver sconfitto tutti
// i balloon presenti nel playground
Game.prototype.next_level = function(){

	this.level++;
	this.balloon_number = this.level*2; //Ogni livetto in piu, aumenta di due il numero di palloncini

	// Rimuove tutti gli elementi del gioco
	this.sketcher.removeAll();

	// Massimizza bombe contemporanee
	this.player[0].reset_bomb();

	this.player[0].point.x = 72;
	this.player[0].point.y = 72;

	this.blocks = [];
	this.bombs = [];
	this.balloons = [];

	this.playground.init_matrix_playground();
	this.playground.reset_positions();

	this.build_playground();
	this.spawn_ballons();
	this.reset_time();
}

//Funzione per il resettamento del livello in caso di morte del giocatore (in caso di presenza di più di una vita)
Game.prototype.reset_level = function(){

	this.player[0].remove_hearth();
	this.balloon_number = this.level*2; //Ogni livetto in piu, aumenta di due il numero di palloncini

	// Rimuove tutti gli elementi del gioco
	this.sketcher.removeAll();

	// Massimizza bombe contemporanee
	this.player[0] = new Player(72, 72, 100, 1, this.player[0].lives--);

	this.blocks = [];
	this.bombs = [];
	this.balloons = [];

	this.playground.init_matrix_playground();
	this.playground.reset_positions();

	//	this.sketcher.draw_player();
	this.build_playground();
	this.spawn_ballons();
	this.reset_time();
}

// Funzione che gestisce la creazione di una nuova partita singleplayer dal popup
Game.prototype.new_game_single_player = function(){
	
	//Rimuovi popup
	this.remove_popup();

	//Resetta livello
	this.level = 1;
	this.balloon_number = this.level*2;

	//Elimina tutta la grafica del gioco
	this.sketcher.removeAll();

	//Resetta posizione iniziale del giocatore
	this.player[0] = new Player(72, 72, 100, 1, DEFAULT_LIVES);

	this.blocks = [];
	this.bombs = [];
	this.balloons = [];

	this.playground.init_matrix_playground();
	this.playground.reset_positions();

	this.build_playground();
	this.spawn_ballons();

	this.player[0].reset_powers();
	this.ScoreStats[0].reset_score();
	this.ScoreStats[0].update_stats();

	this.reset_time();
	this.clock_manager();
}


//Funzione che gestisce la creazione di una nuova partita multiplayer dal popup
Game.prototype.new_game_multi_player = function(){
	//Rimuovi popup
	this.remove_popup();

	//Elimina tutta la grafica del gioco
	this.sketcher.removeAll();

	//Resetta posizione iniziale del giocatore
	this.player[0] = new Player(72, 72, PLAYER_RADIUS, 1, DEFAULT_LIVES);
	this.player[1] = new Player(72 + 12*48, 72 + 8*48, PLAYER_RADIUS, 0, DEFAULT_LIVES);

	this.blocks = [];
	this.bombs = [];

	this.playground.init_matrix_playground();
	this.playground.reset_positions();

	this.build_playground();
	this.player[0].reset_powers();
	this.player[1].reset_powers();
	this.ScoreStats[0].reset_score();
	this.ScoreStats[0].update_stats();

	this.reset_time();
	this.clock_manager();
}


// Funzione che controlla se vi è un input relativo al movimento in corso 
Game.prototype.find_input = function(player) {
	if(player.vector_movement[0] || player.vector_movement[1] || 
	   player.vector_movement[2] || player.vector_movement[3]  )
		return true;
	else
		return false;
}


// Funzione che gestisce e controlla se si è verificato un game over
Game.prototype.game_over = function(player, index){
	
	if(this.playground.matrix_playground[this.playground.x_matrix_player[index]][this.playground.y_matrix_player[index]] > 0){
		this.sketcher.draw_death(player, index);
		this.player[index].set_death();
	}

	//Solo per giocatore singolo
	else if(this.player.length == 1){
		for(var i = 0; i < this.balloons.length; i++){
			if(this.playground.check_balloon_murder(i, this.player[0].is_dead) && !this.balloons[i].is_dead){
				this.sketcher.draw_death(player, 0);
				this.player[index].set_death();
			}
		}	

		if(this.player[index].death_counter >= 41 || this.time == 0)
			if(this.player[index].lives > 1)
				this.reset_level();
			else
				this.show_popup("Nuova partita", "Torna al menu", "Game Over");
	}

	// Solo per secondo giocatore
	if(this.player.length == 2){
		this.game_over_multi(player, index);
	}
}

// Gestione del game_over per il multiplayer
Game.prototype.game_over_multi = function(player, index){
	//Controllo che siano morti entrambi i giocatori o solo uno dei due (per modalità multiplayer)
	if((this.player[0].death_counter >= 41 && this.player[1].death_counter > 0) || 
		(this.player[0].death_counter > 0 && this.player[1].death_counter >= 41) || this.time == 0){
		
		//Pareggio
		this.show_popup("Nuova partita", "Torna al menu", "Pareggio");
	}

	else if(this.player[1].death_counter >= 41){
		//Vittoria del player 1
		this.show_popup("Nuova partita", "Torna al menu", "Vittoria del Giocatore 1");
	}

	else if(this.player[0].death_counter >= 41){
		//Vittoria del player 2
		this.show_popup("Nuova partita", "Torna al menu", "Vittoria del Giocatore 2");
	}
}

//Funzione che permette la memorizzazione dei punteggi nel database
Game.prototype.mem_score = function(){
	
	if(modality == "singleplayer"){
		var node = document.getElementById('score');
		
		var value = node.childNodes[1].childNodes[0];
		var score = value.textContent;

		ScoreHandler.update_singleplayer_rank(score);
	}

	else if(modality == "multiplayer"){
		var winner;

		//In caso di pareggio nessuna vittoria
		if(this.player[0].is_dead && this.player[1].is_dead)
			winner = 0;
		else if(this.player[0].is_dead)
			winner = 2;
		else
			winner = 1;

		ScoreHandler.update_multiplayer_rank(winner);
	}
}

// Funzione che fa comparire un popup dopo la morte del giocatore o alla fine di un livello
Game.prototype.show_popup = function(first_string, second_string, message){
	this.stop_clock(); 
	this.mem_score(); //Memorizza il risultato della partita

	var new_game_func;
	var popup = document.createElement('div');
	popup.setAttribute('class', 'popup');
	popup.setAttribute('id', 'popupId');
	var popup_value = document.createTextNode(message);
	popup.appendChild(popup_value);

	this.playgroundWrapper.appendChild(popup);

	var button = document.createElement('button');
	button.setAttribute('class', 'btn choice');
	button.setAttribute('id', 'left_choice');

	//Controllo in base alla modalità corrente a cosa corrisponde il tasto nuova partita
	if(modality == "singleplayer")
		new_game_func = 'game.new_game_single_player()';
	else
		new_game_func = 'game.new_game_multi_player()';

	button.setAttribute('onclick', new_game_func);
	var button_value = document.createTextNode(first_string);
	button.appendChild(button_value);
	var button2 = document.createElement('button');
	button2.setAttribute('class', 'btn choice');
	button2.setAttribute('id', 'right_choice');
	button2.setAttribute('onclick', 'game.return_menu()');
	var button2_value = document.createTextNode(second_string);
	button2.appendChild(button2_value);

	var elements = document.getElementsByClassName('popup');

	elements[0].appendChild(button);  
	elements[0].appendChild(button2);  
}

//Funzione che permette la rimozione del popup
Game.prototype.remove_popup = function(){
	var button_left = document.getElementById('left_choice');
	button_left.removeChild(button_left.childNodes[0]);

	var button_right = document.getElementById('right_choice');
	button_right.removeChild(button_right.childNodes[0]);

	var popup= document.getElementById('popupId');
	popup.removeChild(popup.childNodes[0]);
	popup.removeChild(popup.childNodes[0]);

	popup.remove();
}

//Funzione che gestisce la comparsa iniziale dei balloon
Game.prototype.spawn_ballons = function(){
	// Creazione di START_BREAKABLE_BLOCK blocchi in START_BREAKABLE_BLOCK posti casuali 
	for(var counter = 0; counter < this.balloon_number; ){
		var x_matrix = Math.floor(Math.random() * X_TILES);
		var y_matrix = Math.floor(Math.random() * Y_TILES);

		// Esclusione dei punti di nascita del giocatore e punti contigui tra i posti casuali
		if(this.playground.matrix_playground[x_matrix][y_matrix] == 0 
		   && !(x_matrix == 0 && y_matrix == 0) && !(x_matrix == X_TILES -1 && y_matrix == Y_TILES - 1) 
		   && !(x_matrix == 0 && y_matrix == 1) && !(x_matrix == 1 && y_matrix == 0)){ 
		
			this.balloons[this.balloons.length] = new Balloon(this.playground.offsetLeft*(3/2) + x_matrix * TILE_SIDE, 
				this.playground.offsetTop*(3/2) + y_matrix * TILE_SIDE, 1);
			counter++
		}
	}
}

// Funzione che inizializza il playground costruendo i blocchi indistruttibili fissi
Game.prototype.build_playground = function(){

	for(var i = 0; i < COLUMN_BLOCKS; i++){
		for(var j = 0; j < ROW_BLOCKS; j++){
			this.blocks[ROW_BLOCKS*i + j] = new Block(120 + 96*j, 120 + 96*i, 0);
			console.log(ROW_BLOCKS*i + j);
		}
	}

	// Creazione di START_BREAKABLE_BLOCK blocchi in START_BREAKABLE_BLOCK posti casuali 
	for(var counter = 0; counter < START_BREAKABLE_BLOCK;){
		var x_matrix = Math.floor(Math.random() * X_TILES);
		var y_matrix = Math.floor(Math.random() * Y_TILES);

		// Esclusione dei punti di nascita dei giocatori e punti contigui tra i posti casuali
		if(this.playground.matrix_playground[x_matrix][y_matrix] == 0 
		   && !(x_matrix == 0 && y_matrix == 0) && !(x_matrix == X_TILES -1 && y_matrix == Y_TILES - 1)
		   && !(x_matrix == 0 && y_matrix == 1) && !(x_matrix == 1 && y_matrix == 0)
		   && !(x_matrix == X_TILES - 1 && y_matrix == Y_TILES - 2) && !(x_matrix == X_TILES - 2 && y_matrix == Y_TILES - 1)){ 
			this.blocks[this.blocks.length] = new Block(this.playground.offsetLeft*(3/2) + x_matrix * TILE_SIDE, this.playground.offsetTop*(3/2) + y_matrix * TILE_SIDE, 1);
			this.playground.set_breakable_block(x_matrix, y_matrix);
			counter++;
		}
	}
	
	// Creazione delle immagini dei blocchi 
	for(var i=0; i<this.blocks.length; i++)
		this.sketcher.draw_block(this.blocks[i], i);
}

// Funzione che cattura e gestisce gli input da tastiera 
Game.prototype.take_input = function(evt) {

	// Variabile che associa all'input un codice relativo al tasto premuto
	var key = (evt.which!= null) ? evt.which : evt.keyCode;
	
	// Gestione tasti Giocatore 1
	
	if(key == 65){ // Tasto A
		this.player[0].vector_movement[0] = true;
		this.player[0].latest_input = "left";
		this.player[0].any_input = true;
	}

	else if(key == 87){ // Tasto W
		this.player[0].vector_movement[1] = true; 
		this.player[0].latest_input = "up";
		this.player[0].any_input = true;
	}

	else if(key == 68){ // Tasto D
		this.player[0].vector_movement[2] = true; 
		this.player[0].latest_input = "right";
		this.player[0].any_input = true;
	}	

	else if(key == 83){ // Tasto S
		this.player[0].vector_movement[3] = true; 
		this.player[0].latest_input = "down";
		this.player[0].any_input = true;
	}

	else if(key == 74){ // Tasto J
		//Creazione della bomba
		this.create_bomb(this.player[0], 0);
		console.log(this.playground.matrix_playground);
		this.player[0].special_input = true;
	}

	// Gestione tasti Giocatore 2 (se presente)
	if(this.player.length == 2){
		this.take_input_player2(key, evt)
	}
}

// Funzione che cattura e gestisce gli input da tastiera del giocatore 2
Game.prototype.take_input_player2 = function(key, evt){

	if(key == 100){ // Tasto NUMPAD_4
			this.player[1].vector_movement[0] = true;
			this.player[1].latest_input = "left";
			this.player[1].any_input = true;
		}

		else if(key == 104){ // Tasto NUMPAD_8
			this.player[1].vector_movement[1] = true; 
			this.player[1].latest_input = "up";
			this.player[1].any_input = true;
		}

		else if(key == 102){ // Tasto NUMPAD_6
			this.player[1].vector_movement[2] = true; 
			this.player[1].latest_input = "right";
			this.player[1].any_input = true;
		}

		else if(key == 98){ // Tasto NUMPAD_2
			this.player[1].vector_movement[3] = true; 
			this.player[1].latest_input = "down";
			this.player[1].any_input = true;

		}

		else if(key == 13){ // Tasto NUMPAD_ENTER (blocco numerico)

			this.create_bomb(this.player[1], 1);
			console.log(this.playground.matrix_playground);
			this.player[1].special_input = true;

	    }
}

// Funzione che gestisce la creazione di una bomba dopo 
Game.prototype.create_bomb = function(player, index_player){
	// Variabili di utilità per snellire il codice
	var x_matrix = this.playground.x_matrix_player[index_player];
	var y_matrix = this.playground.y_matrix_player[index_player];

	// Creazione nuova bomba (se il campo è libero)
	if(this.playground.matrix_playground[x_matrix][y_matrix] == 0 && this.player[index_player].register_bomb()){
		
		var current_bomb = this.bombs.length;
		var current_block = this.blocks.length;

		console.log("Current bomb: ", current_bomb);
		this.bombs[current_bomb] = new Bomb(x_matrix, y_matrix, player.power_bomb, index_player, current_block);
		
		// Aggiornamento matrix_playground
		this.playground.set_bomb_matrix_position(x_matrix, y_matrix);

		// Creazione e disattivazione blocco momentaneo
		this.blocks[current_block] = new Block(this.bombs[current_bomb].point.x, this.bombs[current_bomb].point.y, 2);
	}
}

// Funzione che gestisce il rilascio di un input da tastiera
Game.prototype.release_input = function(evt) {
	// Variabile che associa all'input un codice relativo al tasto premuto
	var key = (evt.which!= null) ? evt.which : evt.keyCode;
	// Gestione input rilasciato Giocatore 1
	if(key == 65){ // Tasto A
		this.player[0].vector_movement[0] = false; 
		if(this.player[0].latest_input == "left"){
			this.player[0].latest_input = (this.player[0].vector_movement[1] == true) ? "up" :
								(this.player[0].vector_movement[2] == true) ? "right" :
								(this.player[0].vector_movement[3] == true) ? "down" : this.player[0].latest_input;
		}
		this.player[0].left_counter_pace = 0;
	}

	if(key == 87){ // Tasto W
		this.player[0].vector_movement[1] = false; 
		if(this.player[0].latest_input == "up"){
			this.player[0].latest_input = (this.player[0].vector_movement[0] == true) ? "left" :
								(this.player[0].vector_movement[2] == true) ? "right" :
								(this.player[0].vector_movement[3] == true) ? "down" : this.player[0].latest_input;
		}
		this.player[0].up_counter_pace = 0;
	}

	if(key == 68){ // Tasto D
		this.player[0].vector_movement[2] = false; 
		if(this.player[0].latest_input == "right"){
			this.player[0].latest_input = (this.player[0].vector_movement[0] == true) ? "left" :
								(this.player[0].vector_movement[1] == true) ? "up" :
								(this.player[0].vector_movement[3] == true) ? "down" : this.player[0].latest_input;
		}
		this.player[0].right_counter_pace = 0;
	}

	if(key == 83){ // Tasto S
		this.player[0].vector_movement[3] = false; 
		if(this.player[0].latest_input == "down"){
			this.player[0].latest_input = (this.player[0].vector_movement[0] == true) ? "left" :
								(this.player[0].vector_movement[1] == true) ? "up" :
								(this.player[0].vector_movement[2] == true) ? "right" : this.player[0].latest_input;
		}
		this.player[0].down_counter_pace = 0;
	}

	if(key == 74)// Tasto J
		this.player[0].special_input = false;

	// Controlla se non vi sono input di movimento in corso per poter disegnare la grafica 'idle' del giocatore 1
	if(!this.find_input(this.player[0]) && !game.player[0].is_dead){
		this.player[0].any_input = false;
		this.sketcher.draw_player_idle_sprite(this.player[0], 0);
	}

	// Gestione tasti Giocatore 2 (se presente)
	if(this.player.length == 2)
		this.release_input_player2(key, evt);
}

Game.prototype.release_input_player2 = function(key, evt){

	if(key == 100){ // Tasto NUMPAD_4
		this.player[1].vector_movement[0] = false; 
		if(this.player[1].latest_input == "left"){
			this.player[1].latest_input = (this.player[1].vector_movement[1] == true) ? "up" :
								(this.player[1].vector_movement[2] == true) ? "right" :
								(this.player[1].vector_movement[3] == true) ? "down" : this.player[1].latest_input;
		}
		this.player[1].left_counter_pace = 0;
	}

	if(key == 104){ // Tasto NUMPAD_8
		this.player[1].vector_movement[1] = false; 
		if(this.player[1].latest_input == "up"){
			this.player[1].latest_input = (this.player[1].vector_movement[0] == true) ? "left" :
								(this.player[1].vector_movement[2] == true) ? "right" :
								(this.player[1].vector_movement[3] == true) ? "down" : this.player[1].latest_input;
		}
		this.player[1].up_counter_pace = 0;
	}

	if(key == 102){ // Tasto NUMPAD_6
		this.player[1].vector_movement[2] = false; 		
		if(this.player[1].latest_input == "right"){
			this.player[1].latest_input = (this.player[1].vector_movement[0] == true) ? "left" :
								(this.player[1].vector_movement[1] == true) ? "up" :
								(this.player[1].vector_movement[3] == true) ? "down" : this.player[1].latest_input;
		}
		this.player[1].right_counter_pace = 0;
	}

	if(key == 98){ // Tasto NUMPAD_2
		this.player[1].vector_movement[3] = false; 
		if(this.player[1].latest_input == "down"){
			this.player[1].latest_input = (this.player[1].vector_movement[0] == true) ? "left" :
								(this.player[1].vector_movement[1] == true) ? "up" :
								(this.player[1].vector_movement[2] == true) ? "right" : this.player[1].latest_input;
		}
		this.player[1].down_counter_pace = 0;
	}

	if(key == 13) // Tasto NUMPAD_ENTER (blocco numerico)
		this.player[1].special_input = false;
	
	// Controlla se non vi sono input di movimento in corso per poter disegnare la grafica 'idle' del giocatore 2
	if(!this.find_input(this.player[1]) && !game.player[1].is_dead){
		this.player[1].any_input = false;
		this.sketcher.draw_player_idle_sprite(this.player[1], 1);
	}
}


//Controlla la distanza tra due punti (per settare il blocco momentaneo della bomba)
Game.prototype.check_distance = function(point_a, point_b){
	var dist_x = Math.abs(point_a.x - point_b.x);
	var dist_y = Math.abs(point_a.y - point_b.y);

	var dist = Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y, 2));

	if(dist >= TILE_SIDE)
		return true;

	else 
		return false;
}

// Funzione che permette il refresh delle componenti grafiche del gioco
Game.prototype.draw_game = function(game){

	// Gestione di tutte le bombe presenti nel playground (e non solo)
	game.draw_bombs(game);
	
	game.draw_blocks(game);
	// Aggiorna la grafica del/dei giocatore/i
	for(var z = 0; z < game.player.length; z++){
		if(!game.player[z].is_dead)
			game.sketcher.draw_player(game.player[z], z);

		game.sketcher.update_score_stats(game.ScoreStats[z], z);
	}	

	// Aggiorna la grafica del balloons 
	if(game.player.length == 1){
		game.draw_balloons(game);
	}
}

Game.prototype.draw_bombs = function(game){
	for(var i=0; i<game.bombs.length; i++){
		
		// Variabili di utilità per snellire il codice
		var bomb_x_matrix = game.bombs[i].x_matrix;
		var bomb_y_matrix = game.bombs[i].y_matrix;
		var index_player = game.bombs[i].index_player;
		var block_index = game.bombs[i].block_index;
		var bomb_power = game.bombs[i].power;

		//Controlla che sia nel punto di esplosione 
		if(game.bombs[i].counter_pace >= 138 && !game.bombs[i].check_explosion){

			// Aggiorna la matrix_playground disattivando momentaneamente la bomba
			game.playground.unset_bomb_matrix_position(bomb_x_matrix, bomb_y_matrix);

			// Aggiorna la matrix_playground registrando i dati dell'esplosione in tutti i tile interessati dalla bomba
			game.playground.set_explosion_matrix_position(bomb_x_matrix, bomb_y_matrix, bomb_power);
			game.bombs[i].check_explosion = true;
		}

		// Controlla se la bomba non è ancora esplosa ed il giocatore si è allontanato dalla
		// bomba, permettendo l'attivazione del blocco momentaneo associato
		if(game.bombs[i].counter_pace < 138 && game.check_distance(game.bombs[i].point, game.player[index_player].point)){
			game.blocks[block_index].activate_block();
		}

		// Controlla se l'esplosione è terminata
		if(game.bombs[i].counter_pace == 180){
			// Disattivazione del blocco momentaneo associato
			var current_block = game.blocks.length - 1;
			game.blocks[game.bombs[i].block_index].deactivate_block(); 
			game.player[game.bombs[i].index_player].unregister_bomb();
			// Aggiorna la matrix_playground registrando i dati di fine esplosione in tutti i tile interessati dalla bomba
			game.playground.unset_explosion_matrix_position(game.bombs[i].x_matrix, game.bombs[i].y_matrix, game.bombs[i].power);
		}

		// Aggiorna la grafica del gioco
		game.sketcher.draw_bomb(game.bombs[i], i, game.player[index_player].power_bomb, game.playground.matrix_playground);
		game.sketcher.draw_explosion(game.bombs[i], i, game.bombs[i].power, game.playground.matrix_playground);
		
		// Aggiorna i contatori	delle animazioni delle bombe
		game.bombs[i].update_counter(game.playground.matrix_playground);
	}
}

Game.prototype.draw_blocks = function(game){

	for(var j = 0; j < game.blocks.length; j++){		
		
		// Variabile di utilità per snellire il codice
		var block_matrix_value = game.playground.matrix_playground[game.blocks[j].x_matrix][game.blocks[j].y_matrix];
		var x_matrix_player = [];
		var y_matrix_player = [];
		x_matrix_player[0] = game.playground.x_matrix_player[0];
		y_matrix_player[0] = game.playground.y_matrix_player[0];
		
		if(game.player.length == 2){
			x_matrix_player[1] = game.playground.x_matrix_player[1];
			y_matrix_player[1] = game.playground.y_matrix_player[1];	
		}

		// Controlla che un blocco distruttubile stia esplodendo
		if((block_matrix_value == -4 || block_matrix_value == -3 || block_matrix_value >= 0) && (game.blocks[j].type_block == 1)){
		
			game.sketcher.draw_block(game.blocks[j], j);
			game.blocks[j].animation_counter++; // Incrementa il contatore relativo all'animazione dell'esplosione
			if(game.blocks[j].animation_counter == 50){ // Determinazione tipo di bonus/malus
				var probability = 100;

				probability = Math.floor(Math.random()*probability);
				
				if(probability >= 25){ // Vi è un bonus/malus
					game.blocks[j].get_bonus(game.player.length); 
					game.playground.set_bonus(game.blocks[j].x_matrix, game.blocks[j].y_matrix);
				}
			}
			game.blocks[j].deactivate_block();
		}

		// Controlla se un giocatore ha preso un bonus/malus
		if(block_matrix_value == -3 || block_matrix_value == 0){
			for(var i = 0; i < game.player.length; i++){
				if(block_matrix_value == 0){
					game.blocks[j].type_bonus_malus = NO_BONUS_MALUS;
					game.playground.unset_bonus(game.blocks[j].x_matrix, game.blocks[j].y_matrix);
				}

				else if(game.blocks[j].x_matrix == x_matrix_player[i] && game.blocks[j].y_matrix == y_matrix_player[i]){
					if(game.blocks[j].type_bonus_malus <= +4)
						game.player[i].catch_bonus(game.blocks[j].type_bonus_malus);
					else	
						game.player[(i+1)%2].catch_bonus(game.blocks[j].type_bonus_malus);
					
					game.blocks[j].type_bonus_malus = NO_BONUS_MALUS;
					game.playground.unset_bonus(game.blocks[j].x_matrix, game.blocks[j].y_matrix);
				}
			}	
		}
	}
}

Game.prototype.draw_balloons = function(game){
	for(var i = 0; i < game.balloons.length; i++){
		game.playground.update_balloon_matrix_position(game.balloons[i].point.x, game.balloons[i].point.y, i);
		var flag = game.playground.check_balloon_death(i);
		
		game.balloons[i].update_counter(flag);
		
		if(!game.balloons[i].is_dead){
			game.sketcher.draw_balloon(game.balloons[i], i);
		}

		else{
			game.sketcher.draw_balloon_death(i, game.balloons[i]);
			if(!game.balloons[i].point_taken && game.balloons[i].death_counter >= 50){
				game.balloon_number--;
				game.ScoreStats[0].increase_score();
				game.balloons[i].set_point_taken();
			}
		}

		if(game.balloons[i].decision_counter <= 23){
			game.balloons[i].move();
		}
	
		if(game.balloons[i].decision_counter == 100){
			game.balloons[i].make_decision(game.playground.x_matrix_balloon[i], game.playground.y_matrix_balloon[i], 
										   game.playground.matrix_playground);
		}
	
	}

	if(game.balloon_number <= 0){
		if(!game.player[0].is_dead)
			game.next_level();

		else if(game.player[0].lives > 1)
			game.reset_level();
		else
			game.show_popup("Nuova partita", "Torna al menu", "Game Over");
	}
}

//Funzione che gestisce le chiamate periodiche a funzioni importanti 
Game.prototype.clock_manager = function() {
	var that = this;
	this.clock = [];

	this.clock[0] = setInterval(function () { that.draw_game(that) }, 20);
	// Funzioni per giocatore 1
	this.clock[1] = setInterval(function () { that.player[0].move(that.playground, that.blocks) }, 10);
	this.clock[2] = setInterval(function() { that.playground.update_player_matrix_position(that.player[0].point.x, that.player[0].point.y, 0)}, 10);
	this.clock[3] = setInterval(function () { that.game_over(that.player[0], 0); }, 20);
	this.clock[4] = setInterval(function () { that.ScoreStats[0].update_stats(that.player[0].power_bomb,
															  that.player[0].lives,
															  that.player[0].velocity,
															  that.player[0].max_contemporary_bombs); }, 20)

	// Inizializza il contatore dei secondi 
	this.sketcher.update_time(this.time);

	this.clock[5] = setInterval(function (){ if(that.time > 0) that.time--; that.sketcher.update_time(that.time); }, 1000);

	// Funzioni per giocatore 2 (se presente)
	if(that.player.length == 2){
		this.clock[6] = setInterval(function () { that.player[1].move(that.playground, that.blocks) }, 10);
		this.clock[7] = setInterval(function () { that.playground.update_player_matrix_position(that.player[1].point.x, that.player[1].point.y, 1)}, 10);
		this.clock[8] = setInterval(function () { that.game_over(that.player[1], 1) }, 20);
		this.clock[9] = setInterval(function () { that.ScoreStats[1].update_stats(that.player[1].power_bomb,
														 		  that.player[1].lives,
														  		  that.player[1].velocity,
														  		  that.player[1].max_contemporary_bombs); }, 20)
	}
	
}

// Funzione che ferma tutti i setInterval impostati
Game.prototype.stop_clock = function(){
	for(var i=0; i< this.clock.length; i++){
		clearInterval(this.clock[i]);
	}
}