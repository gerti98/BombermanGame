<?php
	header("Access-Control-Allow-Origin:*");
	require_once __DIR__ . "/../paths.php";
	require_once DIR_AJAX . "ajaxResponse.php";
	require_once DIR_UTILS . "dbManager.php";
    
    $result = checkClientLogin($_POST['username'], $_POST['password']);
    
    if(mysqli_num_rows($result) != 0){
        $response = new AjaxResponse("1", $result);
        echo json_encode($response);
        return;
    }
    
    $result = checkOperatorLogin($_POST['username'], $_POST['password']);
    if(mysqli_num_rows($result) != 0){
        $response = new AjaxResponse("0", $result);
        echo json_encode($response);
        return;
    }
    
    $response = new AjaxResponse("2", $result);
    echo json_encode($response);
    return;

    function checkClientLogin($username, $password){
        global $project_db;        
        $queryText = "SELECT * FROM Utente WHERE email = '" . $username . "' AND password = '" . $password . "';";
        $result = $project_db->performQuery($queryText);
        //$project_db->closeConnection(); 
        return $result; 
    }

    function checkOperatorLogin($username, $password){
        global $project_db;        
        $queryText = "SELECT * FROM Operatore WHERE username = '" . $username . "' AND password = '" . $password . "';";
        $result = $project_db->performQuery($queryText);
        //$project_db->closeConnection();
        return $result;
    }
?>