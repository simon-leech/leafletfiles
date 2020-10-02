<?php

	header("Content-type:application/json");
	
	//CONNECTION REQUEST
	// $pgOptions = "host = 'localhost' dbname = 'WRAG' user = 'postgres' password = 'WRAG2020$$'";
	$pgOptions = "host = 'localhost' dbname = 'geog5871' user = 'geog5871student' password = 'Geibeu9b'";
	$dbconn = pg_connect($pgOptions) or die ('connection failure');
	
	
	//PROTECTEDTREES PHP
	$query = "SELECT commentext, dateadded, photo,lat,lon, oid FROM gy19sml_comments;";
	$result = pg_query($dbconn, $query) or die ('Query failed: '.pg_last_error());

	$commentsData = array();
	while ($row = pg_fetch_array($result, null, PGSQL_ASSOC))	{
		$commentsData[] = array("id" => $row["commentext"], "date" => $row["dateadded"],"photo" => $row["photo"],"lat" => $row["lat"], "lon" => $row["lon"],"oid"=> $row["oid"],);
	}
	echo json_encode($commentsData); 

?>	