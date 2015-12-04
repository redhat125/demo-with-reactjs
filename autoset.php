<?php

session_start();
include("./opencon.php");
//initializing wrong data
$sent_data = "";

class autogenpwd{
	
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

// mail sending fn
function send_mail($to, $linker){
$subject = "Password reset link";

$message = "
<html>
<head>
<title>Password reset</title>
</head>
<body>

<p><a href='".$globals['site_url']."?link=$linkler'>click here </a> to reset your password</p>

</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <admin@demo.com>' . "\r\n";

$mailsent = mail($to,$subject,$message,$headers);
	
	if($mailsent){
		return true;
	}
	else{
		return false;
	}
}

public function updatensend($uname){
	
	
	$user_qry = sprintf("SELECT COUNT(id) as user_num FROM user WHERE email = '%s' AND active = 1", $uname);
	
	//$isUser = mysql_num_rows(mysql_query($user_qry));	
	$user_res = mysql_fetch_assoc(mysql_query($user_qry));	
	
	if(!$user_res){
		$sent_data = "Oops!! something went wrong. Please try later";
	}
	else if($user_res['user_num'] == 1){	// checking if available user 
		$gen_pwd = autogenpwd::generateRandomString(10);
	$forgot_qry = sprintf("UPDATE user SET auto_pwd = '%s' WHERE email = '%s' ", $gen_pwd, $uname);
	
	$forgot_res = mysql_query($forgot_qry);	
	
		if(!$forgot_res){
			$sent_data = "Oops!! something went wrong. Please try later";
		}
		else{
			if(autogenpwd::send_mail($uname, $gen_pwd)){
				$sent_data = "ok";			
			}
			else{
				$sent_data = "could not send mail";
			}
		}
		
	}
	else{
		$sent_data = "Wrong user name ";
	}
	return $sent_data;
}

}

// checking login credentials
if(isset($_POST['user'])){
	$u_mail = mysql_real_escape_string($_POST['user']);
	$pwdsender = new autogenpwd();
	$sent_data = $pwdsender->updatensend($u_mail);
}
else{
		$sent_data = "user not set ";
}

echo $sent_data;
?>

