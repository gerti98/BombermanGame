<nav>
	
	<a href="./personal_rank.php" class="nav_item_left">
	<img class="utente_img" src="./../css/img/utente.png" alt="Utente"/>
	
	<?php
		$var = $_SESSION['username'];
		echo "<div class='nav_description'> $var </div>";
	?>
	
	</a>

	<a href="./game.php" class="nav_item_user nav_item_logo">
	<img id="logo_img" class="navbar_img" src="./../css/img/bomberman_logo.png" alt="Bomberman_logo"/>	
	<div class="nav_description">
	GAME
	</div>
	</a>

	<a href="./manual.php" class="nav_item_user">	
	<img class="navbar_img" src="./../css/img/user_manual.png.png" alt="User Manual"/> 
	<div class="nav_description">
	MANUAL
	</div>
	</a>

	<a class="nav_item_user" href="./rank.php">
	<img class="navbar_img" src="./../css/img/ranking.png.png" alt="Rank"/>
	<div class="nav_description">
	RANK
	</div>
	</a>

	<a href="./logout.php" class="nav_item_right nav_item_user">
		<img class="navbar_img" src="./../css/img/logout.png" alt="Logout"/>
		<div class="nav_description">LOG OUT</div>
	</a>
</nav>
