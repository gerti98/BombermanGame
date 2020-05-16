<?php
	require_once __DIR__ . "/config.php";
	session_start();
    include DIR_UTIL . "sessionUtil.php";

    if (!isLogged()){
		    header('Location: ./../index.php');
		    exit;
    }	
?>

<!DOCTYPE HTML>
<html lang="it">
	<head>
		<meta charset="utf-8">
		<meta name = "author" content = "Xhanej Olgerti">
		<meta name = "keywords" content = "game Bomberman bomb player">
		<link rel="shortcut icon" type ="image/x-con" href="./../css/img/favicon.ico">
		<link rel="stylesheet" href="./../css/page_style.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./../css/game_style.css" type="text/css" media="screen">
		<link rel="stylesheet" href="./../css/preload_style.css" type="text/css" media="screen">   
		<script src="./../js/game.js"></script>
		<script src="./../js/player.js"></script>
		<script src="./../js/util.js"></script>
		<script src="./../js/sketcher.js"></script>
		<script src="./../js/block.js"></script>
		<script src="./../js/bomb.js"></script>
		<script src="./../js/balloon.js"></script>
		<script src="./../js/playground.js"></script>
		<script src="./../js/scoreStat.js"></script>
		<script src="./../js/ajax/ajaxManager.js"></script>
		<script src="./../js/ajax/rankTable.js"></script>
		<script src="./../js/ajax/rankEventHandler.js"></script>
		<script src="./../js/ajax/scoreHandler.js"></script>
		<title>Bomberman</title>
	</head>
	<body>
		<?php 
			include DIR_LAYOUT . "navbar.php"; 
			include DIR_LAYOUT . "preload.php";
		?>
		

		<div id="game_container">

			<div id="gameStat_container">
				<div id="gameStat_1">
					<header class="gamestat_header">
						Player 1
					</header>	

					<div id="player1_stats">
						<img class="gamestat_sprite" src="./../css/img/player_sprites/down_idle.png" alt="sprite"/>

						<div class="label">POWER: 
							<span>2</span>
						</div>
						<div class="label">SPEED: 
							<span>2</span>
						</div>
						<div class="label">LIVES: 
							<span>1</span>
						</div>
						<div class="label">BOMBS:
							<span>2</span>
						</div>
						<div class="label" id="score">SCORE:
							<span>0</span>
						</div>
					</div>
					
				</div>

				<div id="gameStat_2">
					<header class="gamestat_header">
						Player 2
					</header>
					<div id="player2_stats">
						<img class="gamestat_sprite" src="./../css/img/player_sprites/down_idle_2.png" alt="sprite"/>
					
						<div class="label">POWER: 
							<span>2</span>
						</div>
						<div class="label">SPEED: 
							<span>2</span>
						</div>
						<div class="label">LIVES: 
							<span>1</span>
						</div>
						<div class="label">BOMBS:
							<span>2</span>
						</div>
					</div>
				</div>

				<div id="gameStat_3">
					<header class="gamestat_header">
						Time
					</header>
					<div class="label" id="time">
						<span> -
						</span>
					</div>
				</div>
			</div>

			<div id="playgroundWrapper" class="playgroundWrapper">

				<div class="playground_menu" style="width:720px; height:528px; margin:0px auto">
					<img class="logo_img_start_game" src="./../css/img/bomberman_logo.png" alt="Bomberman_logo"/>	
					<div class="options">
				    	<button class="btn" onclick="begin_single_player()">Single Player</button>
				    	<button class="btn" onclick="begin_multi_player()">Multiplayer Locale</button>
				  	</div>
				</div>
					
			</div>
		</div>

		<?php 
			include DIR_LAYOUT . "footer_page.php"; 
		?>
		
	</body>
</html>