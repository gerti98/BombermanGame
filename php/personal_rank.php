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
		<title>Bomberman</title>
	</head>
	<body onload="RankEventHandler.personal_singleplayer_rank()">
		<?php 
			include DIR_LAYOUT . "navbar.php"; 
		?>
		<div class="head_section">Ranking</div>
		
			<section class="main_rank_section">
				<h4>Tabelle</h4>
			<div class="tabs">    
			   	<div class="tab">
			      <input type="radio" name="tabgroup" onchange="RankEventHandler.personal_singleplayer_rank()" id="tab-1" checked>
			      <label for="tab-1"> Personal Singleplayer</label>
			     
			   	</div>
			   	<div class="tab">
			      <input type="radio" name="tabgroup" onchange="RankEventHandler.personal_multiplayer_rank()" id="tab-2">
			      <label for="tab-2"> Personal Multiplayer</label>
			     
			   	</div>
			</div>
			 

			</section>

			<?php 
				include DIR_LAYOUT . "footer_page.php"; 
			?>
	</body>
</html>
