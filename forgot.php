<?php

session_start();
include("./opencon.php");

//initializing wrong data
$wrongdata = "";
?>

<!DOCTYPE html>
<html lang="en">
 <head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="CG UAE - CyberGuru.ae">
<title>demo login</title>
<!-- external css lib -->
  <link rel="stylesheet" href="./cdn-library/bootstrap-3.3.6/css/bootstrap.css" type="text/css" />
  <link rel="stylesheet" href="./cdn-library/bootstrap-3.3.6/css/bootstrap-theme.css" type="text/css" />
<!-- Custom styles for this page -->
<link href="./css/signin.css" rel="stylesheet">
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<script type="text/javascript">
		var loggedin = 0;
	</script>
 
  </head>


	
  <body id="home" style="margin:0px; padding:0px; background-color:white" >
<?php
	 //include('../header.php');	
	
	?>
	<div  style="margin-top:7%"></div>
	<div class="container">
		<div id="container" ></div>
	</div> <!-- /container -->
	<div  style="margin-top:12%"></div>
	
	
	
	<?php	
	//include('../footer.php');?>
	
	<!-- all js lib--><script src="./cdn-library/react-0.14.3/build/react.js"></script>
    <script src="./cdn-library/react-0.14.3/build/react-dom.js"></script>
    <script src="./cdn-library/browser.min.js"></script>
    <script src="./cdn-library/jquery-1.11.3.min.js" charset="utf-8"></script>
    <script src="./cdn-library/bootstrap-3.3.6/js/bootstrap.js" charset="utf-8"></script>
		<script type="text/babel" src="./js/autoset.js"></script>
	
  </body>
  </html> 



