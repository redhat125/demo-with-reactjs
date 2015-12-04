<?php
session_start();
include("./opencon.php");
//echo "user is ".$_SESSION['user'];
if(isset($_SESSION['user'])){
	unset($_SESSION['user']);
	$_SESSION = Array();
	header("Location: http://".$globals['site_url']);
}

?>
