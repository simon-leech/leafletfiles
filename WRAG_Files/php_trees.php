<?php

	header("Content-type:application/json");
	
	//CONNECTION REQUEST
	// $pgOptions = "host = 'localhost' dbname = 'WRAG' user = 'postgres' password = 'WRAG2020$$'";
	$pgOptions = "host = 'localhost' dbname = 'geog5871' user = 'geog5871student' password = 'Geibeu9b'";
	$dbconn = pg_connect($pgOptions) or die ('connection failure');
	
	
	//PROTECTEDTREES PHP
	// $query = "SELECT treetype,protectiontype,dateadded,lat,lon FROM protectedtrees;";
	$query = "SELECT treetype,protectiontype,dateadded,lat,lon,oid FROM gy19sml_protectedtrees;";
	$result = pg_query($dbconn, $query) or die ('Query failed: '.pg_last_error());

	$treeData = array();
	while ($row = pg_fetch_array($result, null, PGSQL_ASSOC))	{
		$treeData[] = array("id" => $row["treetype"],  "protection" => $row["protectiontype"], "date" => $row["dateadded"],"lat" => $row["lat"], "lon" => $row["lon"], "oid" => $row["oid"],);
	}

	echo json_encode($treeData); 

	pg_close($dbconn);

?>