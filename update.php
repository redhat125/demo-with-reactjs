<?php

session_start();
include("./opencon.php");

//initializing wrong data
$sent_data = "";

class updater{
	
	// for generating random string
	function generateRandomString($length) {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}

	// pwd updater fn
	public function pwdupdater($linker, $pwd){
		$user_qry = sprintf("SELECT COUNT(id) as user_num FROM user WHERE auto_pwd = '%s' ", $linker);
		//$isUser = mysql_num_rows(mysql_query($user_qry));	
		$user_res = mysql_fetch_assoc(mysql_query($user_qry));	
		if(!$user_res){
			$sent_data = "Oops!! something went wrong. Please try later";
		}
		else if($user_res['user_num'] == 1){	// updating
		$gen_pwd = updater::generateRandomString(10);
		$user_qry = sprintf("UPDATE user SET pwd = '%s', auto_pwd = '%s' WHERE auto_pwd = '%s' ", $pwd, $gen_pwd, $linker);
		//$isUser = mysql_num_rows(mysql_query($user_qry));	
		$update_res = mysql_query($user_qry);	
	
		if(!$update_res){
			$sent_data = "Oops!! something went wrong. Please try later";
		}
		else{
			$sent_data = "ok";
		}
	
		}
		else{
			$sent_data = "expired";
		}
		return $sent_data;
	}

}

// checking login credentials
if(isset($_POST['pwd']) && isset($_POST['pwdlink'])){
	$u_linker = mysql_real_escape_string($_POST['pwdlink']);
	$u_pwd = mysql_real_escape_string($_POST['pwd']);
	$update = new updater();
	$sent_data = $update->pwdupdater($u_linker, $u_pwd);
}
else{
	$sent_data = "data not set";
}

echo $sent_data;
?>

