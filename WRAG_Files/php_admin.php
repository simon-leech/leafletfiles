<?php

	header("Content-type:application/json");
	
	//CONNECTION REQUEST
	// $pgOptions = "host = 'localhost' dbname = 'WRAG' user = 'postgres' password = 'WRAG2020$$'";
	$pgOptions = "host = 'localhost' dbname = 'geog5871' user = 'geog5871student' password = 'Geibeu9b'";
	$dbconn = pg_connect($pgOptions) or die ('connection failure');
	
	
	//PROTECTEDTREES PHP
	// $query = "SELECT treetype,protectiontype,dateadded,lat,lon FROM protectedtrees;";
	$query = "SELECT username, password FROM gy19sml_admin;";
	$result = pg_query($dbconn, $query) or die ('Query failed: '.pg_last_error());

	$adminData = array();
	while ($row = pg_fetch_array($result, null, PGSQL_ASSOC))	{
		$adminData[] = array("id" => $row["username"], "pass" => $row["password"]);
	}

	echo json_encode($adminData); 

	pg_close($dbconn);

?>