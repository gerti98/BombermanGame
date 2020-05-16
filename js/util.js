/***************
++++++ Contenitore di costanti, di funzioni di utilità ed oggetti utili +++++++++++++++
---------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------
***************/

// Caratteristiche geometriche del giocatore
var PLAYER_RADIUS = 10;
var PLAYER_WIDTH = 45; 
var PLAYER_HEIGHT = 45;
var PLAYER_SPRITE_HEIGHT = 66;

// Caratteristiche geometriche del nemico 'balloon'

var BALLOON_HEIGHT = 45;
var BALLOON_WIDTH = 45;
var BALLOON_SPRITE_HEIGHT = 60;

// Caratteristiche geometriche del playground
var ROW_BLOCKS = 6;
var COLUMN_BLOCKS = 4;
var Y_TILES = 9;
var X_TILES = 13;
var TILE_SIDE = 48;
var PLAYGROUND_OFFSET_LEFT = 48;
var PLAYGROUND_OFFSET_TOP = 48;

var TIME_SINGLEPLAYER = 60;
var TIME_MULTIPLAYER = 180;


// Numero di blocchi iniziali all'inizio della partita
var START_BREAKABLE_BLOCK = 10;


// Determinazione di che tipo di bonus/malus e' presente
var NO_BONUS_MALUS = 0
var BOMB_PLUS = +1;
var BOMB_MINUS = +5;
var SPEED_PLUS = +2;
var SPEED_MINUS = +6;
var POWER_PLUS = +3;
var POWER_MINUS = +7;
var HEARTH_PLUS = +4; 

/* Costanti per la gestione dei path delle risorse grafiche, in modo da rendere più snello il codice */

// Movimento giocatore
var DOWN_IDLE = "url(\"./../css/img/player_sprites/down_idle";
var DOWN_MOVEMENT_DX = "url(\"./../css/img/player_sprites/down_movement_dx";
var DOWN_MOVEMENT_SX = "url(\"./../css/img/player_sprites/down_movement_sx";

var UP_IDLE = "url(\"./../css/img/player_sprites/up_idle";
var UP_MOVEMENT_DX = "url(\"./../css/img/player_sprites/up_movement_dx";
var UP_MOVEMENT_SX = "url(\"./../css/img/player_sprites/up_movement_sx";

var LEFT_IDLE = "url(\"./../css/img/player_sprites/left_idle";
var LEFT_MOVEMENT_DX = "url(\"./../css/img/player_sprites/left_movement_dx";
var LEFT_MOVEMENT_SX = "url(\"./../css/img/player_sprites/left_movement_sx";

var RIGHT_IDLE = "url(\"./../css/img/player_sprites/right_idle";
var RIGHT_MOVEMENT_DX = "url(\"./../css/img/player_sprites/right_movement_dx";
var RIGHT_MOVEMENT_SX = "url(\"./../css/img/player_sprites/right_movement_sx";

var END_MOVEMENT = ".png\")";
// Animazione bomba
var BOMB_0 = "url(\"./../css/img/bomb_explosion/bomb0.png\")";
var BOMB_1 = "url(\"./../css/img/bomb_explosion/bomb1.png\")";
var BOMB_2 = "url(\"./../css/img/bomb_explosion/bomb2.png\")";

// Animazione esplosione
var HORIZONTAL_EXPLOSION_0 = "url(\"./../css/img/bomb_explosion/explode_horizontal_0.png\")";
var HORIZONTAL_EXPLOSION_1 = "url(\"./../css/img/bomb_explosion/explode_horizontal_1.png\")";
var HORIZONTAL_EXPLOSION_2 = "url(\"./../css/img/bomb_explosion/explode_horizontal_2.png\")";
var HORIZONTAL_EXPLOSION_3 = "url(\"./../css/img/bomb_explosion/explode_horizontal_3.png\")";

var VERTICAL_EXPLOSION_0 = "url(\"./../css/img/bomb_explosion/explode_vertical_0.png\")";
var VERTICAL_EXPLOSION_1 = "url(\"./../css/img/bomb_explosion/explode_vertical_1.png\")";
var VERTICAL_EXPLOSION_2 = "url(\"./../css/img/bomb_explosion/explode_vertical_2.png\")";
var VERTICAL_EXPLOSION_3 = "url(\"./../css/img/bomb_explosion/explode_vertical_3.png\")";

var LEFT_EXPLOSION_0 = "url(\"./../css/img/bomb_explosion/explode_left_0.png\")";
var LEFT_EXPLOSION_1 = "url(\"./../css/img/bomb_explosion/explode_left_1.png\")";
var LEFT_EXPLOSION_2 = "url(\"./../css/img/bomb_explosion/explode_left_2.png\")";
var LEFT_EXPLOSION_3 = "url(\"./../css/img/bomb_explosion/explode_left_3.png\")";

var UP_EXPLOSION_0 = "url(\"./../css/img/bomb_explosion/explode_up_0.png\")";
var UP_EXPLOSION_1 = "url(\"./../css/img/bomb_explosion/explode_up_1.png\")";
var UP_EXPLOSION_2 = "url(\"./../css/img/bomb_explosion/explode_up_2.png\")";
var UP_EXPLOSION_3 = "url(\"./../css/img/bomb_explosion/explode_up_3.png\")";

var RIGHT_EXPLOSION_0 = "url(\"./../css/img/bomb_explosion/explode_right_0.png\")";
var RIGHT_EXPLOSION_1 = "url(\"./../css/img/bomb_explosion/explode_right_1.png\")";
var RIGHT_EXPLOSION_2 = "url(\"./../css/img/bomb_explosion/explode_right_2.png\")";
var RIGHT_EXPLOSION_3 = "url(\"./../css/img/bomb_explosion/explode_right_3.png\")";

var DOWN_EXPLOSION_0 = "url(\"./../css/img/bomb_explosion/explode_down_0.png\")";
var DOWN_EXPLOSION_1 = "url(\"./../css/img/bomb_explosion/explode_down_1.png\")";
var DOWN_EXPLOSION_2 = "url(\"./../css/img/bomb_explosion/explode_down_2.png\")";
var DOWN_EXPLOSION_3 = "url(\"./../css/img/bomb_explosion/explode_down_3.png\")";

var CENTER_EXPLOSION_0 = "url(\"./../css/img/bomb_explosion/explode_center_0.png\")";
var CENTER_EXPLOSION_1 = "url(\"./../css/img/bomb_explosion/explode_center_1.png\")";
var CENTER_EXPLOSION_2 = "url(\"./../css/img/bomb_explosion/explode_center_2.png\")";
var CENTER_EXPLOSION_3 = "url(\"./../css/img/bomb_explosion/explode_center_3.png\")";

var INIT_EXPLOSION = "url(\"./../css/img/bomb_explosion/explode_";

var END_EXPLOSION_0 = "_0.png\")";
var END_EXPLOSION_1 = "_1.png\")";
var END_EXPLOSION_2 = "_2.png\")";
var END_EXPLOSION_3 = "_3.png\")";


// Animazione morte del giocatore
var DEATH_0 = "url(\"./../css/img/player_sprites/death_0.png\")";
var DEATH_1 = "url(\"./../css/img/player_sprites/death_1.png\")";
var DEATH_2 = "url(\"./../css/img/player_sprites/death_2.png\")";
var DEATH_3 = "url(\"./../css/img/player_sprites/death_3.png\")";

// Animazione distruzione blocco
var BROKEN_BLOCK_0 = "url(\"./../css/img/broken_block/broken_block_0.png\")";
var BROKEN_BLOCK_1 = "url(\"./../css/img/broken_block/broken_block_1.png\")";
var BROKEN_BLOCK_2 = "url(\"./../css/img/broken_block/broken_block_2.png\")";
var BROKEN_BLOCK_3 = "url(\"./../css/img/broken_block/broken_block_3.png\")";
var BROKEN_BLOCK_4 = "url(\"./../css/img/broken_block/broken_block_4.png\")";

var INIT_BALLOON = "url(\"./../css/img/enemy_balloon/";

var END_BALLOON_0 = "_balloon_0.png\")"; 
var END_BALLOON_1 = "_balloon_1.png\")"; 
var END_BALLOON_2 = "_balloon_2.png\")"; 

// Animazione movimento del balloon
var LEFT_BALLOON_0 = "url(\"./../css/img/enemy_balloon/left_balloon_0.png\")";
var LEFT_BALLOON_1 = "url(\"./../css/img/enemy_balloon/left_balloon_1.png\")";
var LEFT_BALLOON_2 = "url(\"./../css/img/enemy_balloon/left_balloon_2.png\")";

var RIGHT_BALLOON_0 = "url(\"./../css/img/enemy_balloon/right_balloon_0.png\")";
var RIGHT_BALLOON_1 = "url(\"./../css/img/enemy_balloon/right_balloon_1.png\")";
var RIGHT_BALLOON_2 = "url(\"./../css/img/enemy_balloon/right_balloon_2.png\")";

var UP_BALLOON_0 = "url(\"./../css/img/enemy_balloon/up_balloon_0.png\")";
var UP_BALLOON_1 = "url(\"./../css/img/enemy_balloon/up_balloon_1.png\")";
var UP_BALLOON_2 = "url(\"./../css/img/enemy_balloon/up_balloon_2.png\")";

var DOWN_BALLOON_0 = "url(\"./../css/img/enemy_balloon/down_balloon_0.png\")";
var DOWN_BALLOON_1 = "url(\"./../css/img/enemy_balloon/down_balloon_1.png\")";
var DOWN_BALLOON_2 = "url(\"./../css/img/enemy_balloon/down_balloon_2.png\")";

// Animazione morte del balloon
var DEATH_BALLOON = "url(\"./../css/img/enemy_balloon/death_balloon.png\")";

// Risorse grafiche relative ai bonus ed ai malus
var BOMB_MALUS = "url(\"./../css/img/bonus_and_malus/bomb_malus.png\")";
var BOMB_BONUS = "url(\"./../css/img/bonus_and_malus/bomb_bonus.png\")";
var HEARTH_BONUS = "url(\"./../css/img/bonus_and_malus/hearth_bonus.png\")";
var POWER_BONUS = "url(\"./../css/img/bonus_and_malus/power_bonus.png\")";
var POWER_MALUS = "url(\"./../css/img/bonus_and_malus/power_malus.png\")";
var SKULL_MALUS = "url(\"./../css/img/bonus_and_malus/skull_malus.png\")";
var SPEED_BONUS = "url(\"./../css/img/bonus_and_malus/speed_bonus.png\")";
var SPEED_MALUS = "url(\"./../css/img/bonus_and_malus/speed_malus.png\")";

// Costanti relative ai valori della matrix_playground
var BOMB_COSTANT_VALUE = -5;
var BLOCK_COSTANT_VALUE = -1
var BREAKABLE_BLOCK_COSTANT_VALUE = -2;
var BONUS_MALUS_COSTANT_VALUE = -3;

// Costanti relative a caratteristiche del giocatore (aumentabili con bonus)
var DEFAULT_CONTEMPORARY_BOMBS = 1;
var DEFAULT_POWER = 2;
var DEFAULT_VELOCITY = 2;
var DEFAULT_LIVES = 1;


var MAX_CONTEMPORARY_BOMBS = 7;
var MAX_POWER = 12;
var MAX_SPEED = 3;
var MAX_LIVES = 3;

var MIN_CONTEMPORARY_BOMBS = 1;
var MIN_POWER = 1;
var MIN_SPEED = 1;

/***********************
	Oggetti di utilità
***********************/

// Oggetto di utilità per rappresentazione punto nello spazio
function Point(x, y){

	// Coordinate dell'oggetto associato
	this.x = x;
	this.y = y;
}
