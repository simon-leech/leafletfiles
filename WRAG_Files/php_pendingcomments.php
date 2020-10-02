<?php

	header("Content-type:application/json");
	
	//CONNECTION REQUEST
	$pgOptions = "host = 'localhost' dbname = 'geog5871' user = 'geog5871student' password = 'Geibeu9b'";
	$dbconn = pg_connect($pgOptions) or die ('connection failure');
	
	
	$query = "SELECT commentext, dateadded, photo,lat,lon, oid FROM gy19sml_pendingcomments;";
	$result = pg_query($dbconn, $query) or die ('Query failed: '.pg_last_error());

	$pendingcommentsData = array();
	while ($row = pg_fetch_array($result, null, PGSQL_ASSOC))	{
		$pendingcommentsData[] = array("id" => $row["commentext"], "date" => $row["dateadded"],"photo" => $row["photo"],"lat" => $row["lat"], "lon" => $row["lon"],"oid"=> $row["oid"],);
	}
	echo json_encode($pendingcommentsData); 

?>	