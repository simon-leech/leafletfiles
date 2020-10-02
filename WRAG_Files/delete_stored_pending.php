
	<?php 
		include ("wrag.html");
		//Connect to db 
		$pgsqlOptions = "host='localhost' dbname='geog5871' user= 'geog5871student' password= 'Geibeu9b'";
		$dbconn = pg_connect($pgsqlOptions) or die ('connection failure');
		
		$dbconn = pg_connect($pgsqlOptions);
		$insertQuery = pg_prepare($dbconn, "my_query", "DELETE FROM gy19sml_pendingcomments"); 
		$result = pg_execute($dbconn, "my_query");  
		
		if (is_null($result))	{
			echo '<script> alert("Comment not removed, Invalid pending CommentID") </script>';
		}
		
		else {
			echo '<script> alert("Pending Comment Removed") </script>';
		}
		
		
		//Close db connection
		pg_close($dbconn);
	?>