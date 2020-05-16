<?php
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
		<section id="sign_up_content">
		<h2 id="sign_in_content_header">
			Registrazione
		</h2>
		<div id="login_form">
			<form name="registration" action="./php/check_registration_validity.php" method="post">
				<div>
					<label>Username</label>
					<input type="text" maxlength="20" pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$" placeholder="Username" name="username" required autofocus>
				</div>
				<div>
					<label>Password</label>
					<input type="password" placeholder="Password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" name="password" required>
				</div>	
				<div>
					<label>Conferma Password</label>
					<input type="password" placeholder="Conferma Password" type="password" name="repassword" required>
				</div>
				<div>
					<label>Email</label>
					<input type="email" placeholder="Email@mail.it" name="email" required>
				</div>	
				<button type="submit" value="Register" id="btn"> Register </button>
				Sei già membro? <a href="./index.php">Login</a>
				<?php
					if (isset($_GET['errorMessage'])){
						
							echo '<div class="'. $_GET['class']. '">';
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
