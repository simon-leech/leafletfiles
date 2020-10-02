
	<?php 
		include("wrag.html");
		//Connect to db 
		$pgsqlOptions = "host='localhost' dbname='geog5871' user= 'geog5871student' password= 'Geibeu9b'";
		$dbconn = pg_connect($pgsqlOptions) or die ('connection failure');
		
		// code adapted from: https://makitweb.com/upload-and-store-an-image-in-the-database-with-php/	
		$dbconn = pg_connect($pgsqlOptions);
		$query = "INSERT INTO gy19sml_comments SELECT * FROM gy19sml_pendingcomments";
		// $query .= "DELETE from gy19sml_pendingcomments";
		$result = pg_query($dbconn, $query);

		if (is_null($result))	{
			echo '<script> alert("All pending comments not stored, try again.") </script>';
		}
		
		else {
			echo '<script> alert("All pending comments have been successfully stored.") </script>';
		}


		$query2 = "DELETE FROM gy19sml_pendingcomments";
		$result2 = pg_query($dbconn, $query2);
		
		//Close db connection
		pg_close($dbconn);		
	?>