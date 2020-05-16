<?php
	phpinfo();
	session_start();
	require_once __DIR__ . "/php/config.php";
    include DIR_UTIL . "sessionUtil.php";

    if (isLogged()){ //Controllo se sono loggato
		    header('Location: ./php/game.php');
		    exit;
    }	
?>

<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="utf-8"> 
    	<meta name = "author" content = "Xhanej Olgerti">
    	<meta name = "keywords" content = "game">
   	 	<link rel="shortcut icon" type="image/x-icon" href="./css/img/favicon.ico" />
		<link rel="stylesheet" href="./css/login.css" type="text/css" media="screen">		
		<title>Bomberman</title>
	</head>
	<body>
		<section id="sign_in_content">
		<h2 id="sign_in_content_header">
			Bomberman
		</h2>
		<div id="login_form">
			<form name="login" action="./php/login.php" method="post">
				<div>
					<label>Username</label>
					<input type="text" placeholder="Username" maxlength="20" pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$" name="username" required autofocus>
				</div>
				<div>
					<label>Password</label>
					<input type="password" placeholder="Password" name="password" required>
				</div>	
				<button type="submit" id="btn"> Enter
				</button>
				Non sei registrato? <a href="./register.php">Registrati qui</a>
				<?php
					if (isset($_GET['errorMessage'])){
						echo '<div class="sign_in_error">';
						echo '<span>' . $_GET['errorMessage'] . '</span>';
						echo '</div>';
					}
				?>
			</form>
		</div>
		</section>
		<?php 
			include DIR_LAYOUT . "footer_page.php"; 
		?>
	</body>
</html>
