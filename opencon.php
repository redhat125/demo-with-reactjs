<?php

$globals = array();

$globals['site_url']			= "localhost/";

$globals['db_server'] 			= "localhost";

$globals['db_name'] 			= "demo";

$globals['db_user'] 			= "demo";

$globals['db_pass'] 			= "upkar4792";



$link = mysql_connect($globals['db_server'], $globals['db_user'] , $globals['db_pass']) or die(" COULD not connect : " . mysql_error());
mysql_select_db($globals['db_name']);

?>
