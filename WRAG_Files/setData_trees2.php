
	<?php 
	include("wrag.html");
		array_filter($_POST, 'trim_value');
		
		$pattern = "/[^A-Za-z0-9\s\.\:\-\+\!\@\,\'\"]/";
		$text		= sanitize('treetype',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		$protectiontext = sanitize('protectiontype',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		$date 		= sanitize('treedate',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		$pattern = "/[^A-Za-z0-9\s\.\:\-\+\.\°\,\'\"]/";
		$lat 		= sanitize('lat',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		$lon 		= sanitize('lon',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		
		//Connect to db 
		$pgsqlOptions = "host='localhost' dbname='geog5871' user= 'geog5871student' password= 'Geibeu9b'";
		$dbconn = pg_connect($pgsqlOptions) or die ('connection failure');
		
		//Return current maximum ID
		$getOID = pg_query($dbconn, "SELECT MAX(oid) FROM gy19sml_protectedtrees") or die ('Adding data failed: '.pg_last_error());
		$oid = pg_fetch_result($getOID, 0, 0);
		
		//Increment ID by one to create new row ID
		$oid++; 
		
		$dbconn = pg_connect($pgsqlOptions);
		$insertQuery = pg_prepare($dbconn, "my_query", "INSERT INTO gy19sml_protectedtrees (treetype,protectiontype, dateadded, lat,lon,oid) VALUES($1,$2,$3,$4,$5,$6)");
		$result = pg_execute($dbconn, "my_query", array($text,$protectiontext,$date,$lat,$lon,$oid))  or die ('<script> alert("Tree not stored, please ensure date field is set.") </script>'); 

		if (is_null($result))	{
			echo '<script> alert("Tree not stored, please ensure the date field is set.") </script>';
		}
		
		else {
			echo '<script> alert("Tree successfully stored.") </script>';
		}
		
		//Close db connection
		pg_close($dbconn);
		
		
		function trim_value(&$value){
		   $value = trim($value);
		   $pattern = "/[\(\)\[\]\{\}]/";
		   $value = preg_replace($pattern," - ",$value);
		}

		

		function sanitize($str,$filter,$pattern) {
		   $sanStr = preg_replace($pattern,"",$sanStr);
		   $sanStr = filter_var($_POST[$str], $filter);
		   if (strlen($sanStr) > 255) $sanStr = substr($sanStr,0,255);
		   return $sanStr;
		} 
	?>