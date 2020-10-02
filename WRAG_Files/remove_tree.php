
	<?php 
		include ("wrag.html");
		array_filter($_POST);
		$pattern = "/[^A-Za-z0-9\s\.\:\-\+\!\@\,\'\"]/";
		$oid		= sanitize('commentid',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		
		//Connect to db 
		$pgsqlOptions = "host='localhost' dbname='geog5871' user= 'geog5871student' password= 'Geibeu9b'";
		$dbconn = pg_connect($pgsqlOptions) or die ('connection failure');
		
		$dbconn = pg_connect($pgsqlOptions);
		$DeleteQuery = pg_prepare($dbconn, "my_query", "DELETE from gy19sml_protectedtrees WHERE oid=($1)"); 
		$result = pg_execute($dbconn, "my_query", array($oid))  or die ('<script> alert("Tree not deleted, incorrect TreeID.") </script>');  

		
		if (is_null($result))	{
			echo '<script> alert("Tree Not Removed, invalid TreeID.") </script>';
		}
		
		else {
			echo '<script> alert("Tree Removed.") </script>';
		}
		
		//Close db connection
		pg_close($dbconn);
		
		function sanitize($str,$filter,$pattern) {
		   $sanStr = preg_replace($pattern,"",$sanStr);
		   $sanStr = filter_var($_POST[$str], $filter);
		   if (strlen($sanStr) > 255) $sanStr = substr($sanStr,0,255);
		   return $sanStr;
		} 
	?>