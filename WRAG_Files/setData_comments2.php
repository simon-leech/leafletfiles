
	<?php 
		include("wrag.html");
		
		array_filter($_POST, 'trim_value');
		
		$pattern = "/[^A-Za-z0-9\s\.\:\-\+\!\@\,\'\"]/";
		$text		= sanitize('commenttext',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		$date 		= sanitize('commentdate',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		$pattern = "/[^A-Za-z0-9\s\.\:\-\+\.\°\,\'\"]/";
		// Convert to base64 
		// Read in a binary file
		$data = file_get_contents('photo');
		// Escape the binary data
		$photo = pg_escape_bytea($data);
		$lat 		= sanitize('lat',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		$lon 		= sanitize('lon',FILTER_SANITIZE_SPECIAL_CHARS,$pattern);
		
		//Connect to db 
		$pgsqlOptions = "host='localhost' dbname='geog5871' user= 'geog5871student' password= 'Geibeu9b'";
		$dbconn = pg_connect($pgsqlOptions) or die ('connection failure');
		
		//Return current maximum ID
		$getOID = pg_query($dbconn, "SELECT MAX(oid) FROM gy19sml_comments") or die ('Adding data failed: '.pg_last_error());
		$oid = pg_fetch_result($getOID, 0, 0);
		
		//Increment ID by one to create new row ID
		$oid++; 
		
		// code adapted from: https://makitweb.com/upload-and-store-an-image-in-the-database-with-php/
				
		$dbconn = pg_connect($pgsqlOptions);
		$query = pg_prepare($dbconn, "my_query", "INSERT INTO gy19sml_pendingcomments(commentext, dateadded, photo, lat,lon,oid) VALUES($1,$2,$3,$4,$5,$6)");
		$result = pg_execute($dbconn, "my_query", array($text,$date,$photo,$lat,$lon,$oid)); 

		if (is_null($result))	{
			echo '<script> alert("Comment not stored, please ensure data field is set.") </script>';
		}
		
		else {
			echo '<script> alert("Comment Successfully stored.") </script>';
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