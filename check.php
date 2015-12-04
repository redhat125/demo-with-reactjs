<?php

session_start();
include("./opencon.php");

class validator{
	
// for sign up
public function signup($uname, $email, $pwd){
	
	$user_qry = sprintf("INSERT INTO user (name, email, pwd, active) VALUES ('%s', '%s', '%s', 1)", $uname, mysql_real_escape_string($email), mysql_real_escape_string($pwd));
	
	//$isUser = mysql_num_rows(mysql_query($user_qry));	
	$user_res = mysql_query($user_qry);	
	
	if(!$user_res){
		$sent_data = "Oops!! something went wrong. Please try later ".mysql_error();
	}
	else{	// checking if available user and pwd
		$_SESSION['user'] = $email;
		$sent_data = "ok";
	}
	
	return $sent_data;
}

//for sign in
public function signin($uname, $pwd){
	
	$user_qry = sprintf("SELECT COUNT(id) as user_num FROM user WHERE email = '%s' AND pwd = '%s' AND active = 1", $uname, $pwd);
	
	//$isUser = mysql_num_rows(mysql_query($user_qry));	
	$user_res = mysql_fetch_assoc(mysql_query($user_qry));	
	
	if(!$user_res){
		$sent_data = "Oops!! something went wrong. Please try later";
	}
	else if($user_res['user_num'] == 1){	// checking if available user and pwd
		$_SESSION['user'] = $uname;
		$sent_data = "ok";
	}
	else{
		$sent_data = "Wrong user name or password";
	}
	
	return $sent_data;
}

}
//initializing wrong data
$sent_data = "";
$validate = new validator();
// checking login credentials
if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['pwd'])){
	$uname = mysql_real_escape_string($_POST['name']);
	$email = mysql_real_escape_string($_POST['email']);
	$pwd = mysql_real_escape_string($_POST['pwd']);
	$sent_data = $validate->signup($uname, $email, $pwd);
}
// checking login credentials
else if(isset($_POST['user']) && isset($_POST['pwd'])){
	$uname = mysql_real_escape_string($_POST['user']);
	$pwd = mysql_real_escape_string($_POST['pwd']);
	$sent_data = $validate->signin($uname, $pwd);
}

echo $sent_data;
?>

