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
		<title>Bomberman</title>
	</head>
	<body>
		<?php 
			include DIR_LAYOUT . "navbar.php"; 
		?>
		<article class="main_article">
			<h4>Tabelle</h4>
			<div class="head_section">
				Manuale
			</div>

			<section class="main_section">
				<h4>Tabelle</h4>
				<header id="top_header">
					<img id="logo_manual_img" src="./../css/img/bomberman_logo.png" alt="Bomberman_logo"/>
					Gioco interattivo che si può usufruire in due modalità:
				</header>
				<article id="article_left">
					<header class="manual_header">
						<img src="./../gif/balloon.gif" alt="Balloon animation" class="img_header"> 
						<h2>
						Giocatore Singolo 
						</h2>
					</header> 
					
					
					<section class="section_manual">
						<h4>Tabelle</h4>
						Elimina i nemici entro il tempo limite per aumentare 
						il tuo punteggio e passare al prossimo livello. Piazza le bombe
						nel campo di gioco ed aspetta che esplodino.
						Raccogli i bonus nel campo di gioco per potenziarti e diventare ancora più forte. 
						Attento! Il contatto con i nemici e l'esplosione delle bombe sono 
						mortali!
					</section>
				
				</article>

				<article id="article_right">

					<header class="manual_header"> 
						<div class="container_img_right">
						<img src="./../gif/right.gif" alt="Right movement animation" class="img_header"/> 
						<img src="./../gif/left.gif" alt="Left movement animation" class="img_header"/> 
						</div>
						<h2>
						Multigiocatore 
						</h2>
					</header>
					
					
					
					<section class="section_manual">
						<h4>Tabelle</h4>
						Divertiti con un amico in sfide 1 contro 1 per determinare chi è il più forte.
						Nessun nemico, solo tu ed il tuo avversario. Oltre ai bonus sono presenti anche 
						dei malus per danneggiare l'avversario.
					</section>
				
				</article>
				
				<article class="article_bottom">
					
					<header class="bottom_header"> 

					<h2> 
						Comandi  
					</h2>
					
					</header>

					<table id="keys_table">
						<tr>
							<th>
								Azione
							</th>

							<th>
								Comando Player 1
							</th>

							<th>
								Comando Player 2
							</th>
						</tr>

						<tr>
							<td>
								Movimento verso l'alto
							</td>

							<td>
								W
							</td>

							<td>
								Numpad_8
							</td>
						</tr>

						<tr>
							<td>
								Movimento verso sinistra
							</td>

							<td>
								A
							</td>

							<td>
								Numpad_4
							</td>
						</tr>

						<tr>
							<td>
								Movimento verso il basso
							</td>

							<td>
								S
							</td>

							<td>
								Numpad_2
							</td>
						</tr>

						<tr>
							<td>
								Movimento verso destra
							</td>

							<td>
								D
							</td>

							<td>
								Numpad_6
							</td>
						</tr>

						<tr>
							<td>
								Piazzamento Bomba
							</td>

							<td>
								J
							</td>

							<td>
								Numpad Enter
							</td>
						</tr>	
					</table>
				</article>

				<article class="article_bottom">
					
					<header class="bottom_header"> 
					<img src="./../gif/block_bonus.gif" alt="Block bonus animation" class ="img_header"/>

					<h2> 
						Bonus e Malus 
					</h2>
					
					
					
					</header>
					
					<section class="section_manual">
						<h4>Tabelle</h4>
						Distruggi i blocchi per raccogliere i vari bonus ed i vari malus.
					</section>

					<table id="bonus_malus_description_table">
						<tr>
							<th>Img</th>
							<th>Nome</th>
							<th>Descrizione</th> 
						</tr>	

						<tr>
							<td> 
								<img src="./../css/img/bonus_and_malus/bomb_bonus.png" alt="Bomb bonus"/> 
							</td>

							<td>
								<b> Bonus Bomba </b>
							</td>

							<td>
								Aumenta di 1 il numero massimo di bombe piazzabili contemporaneamente
							</td>
						</tr>

						<tr>
							<td> 
								<img src="./../css/img/bonus_and_malus/speed_bonus.png" alt="Speed bonus"/> 
							</td>

							<td>
								<b> Bonus Velocità </b>
							</td>

							<td>
								Aumenta la rapidità di movimento del giocatore	
							</td>
						</tr>
				

						<tr>
							<td> 
								<img src="./../css/img/bonus_and_malus/power_bonus.png" alt="Power bonus"/> 
							</td>

							<td>
								<b> Bonus Potenza </b>
							</td>

							<td>
								Aumenta di un blocco il raggio di esplosione della bomba
							</td>
						</tr>

						<tr>
							<td> 
								<img src="./../css/img/bonus_and_malus/hearth_bonus.png" alt="Hearth bonus"/> 
							</td>

							<td>
								<b> Bonus Vita </b>
							</td>

							<td>
								Aumenta di uno il conteggio delle vite del giocatore
							</td>
						</tr>

							<tr>
							<td> 
								<img src="./../css/img/bonus_and_malus/bomb_malus.png" alt="Bomb malus"/> 
							</td>

							<td>
								<b> Malus Bomba </b>
							</td>

							<td>
								Indebolisci il giocatore avversario portando ad uno il numero di bombe piazzabili contemporaneamente. (Solo Multigiocatore)
							</td>
						</tr>


						<tr>
							<td> 
								<img src="./../css/img/bonus_and_malus/speed_malus.png" alt="Speed malus"/>
							</td>

							<td>
								<b> Malus Velocità </b>
							</td>

							<td>
								Indebolisci il giocatore avversario rallentandolo. (Solo Multigiocatore).
							</td>
						</tr>

						<tr>
							<td> 
								<img src="./../css/img/bonus_and_malus/power_malus.png" alt="Power malus"/> 
							</td>

							<td>
								<b> Malus Potenza </b>
							</td>

							<td>
								Indebolisci il giocatore avversario portando al minimo il raggio di esplosione delle sue bombe. (Solo Multigiocatore).
							</td>
						</tr>

					</table>
				</article>


					
			</section>


		</article>

		<?php 
			include DIR_LAYOUT . "footer_page.php"; 
		?>
	</body>

</html>
