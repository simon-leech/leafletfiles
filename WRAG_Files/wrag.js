 // Set global variable of mymap
var mymap;

// Create Commentmarkers as a feature group of the map
var CommentMarkers = L.featureGroup();
// Create Treesmarkers as a feature group of the map
var TreesMarkers = L.featureGroup();
// Create Markersmarkers as a feature group of the map
var MarkersMarkers = L.featureGroup();

// Set up initialise function of the map
function initialize() {
   let latLng;
   mymap = new L.map('mapid').setView([53.819012,-1.556897], 15);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 22,
		maxNativeZoom: 19,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11'
	}).addTo(mymap);

// Add WRAG Polygon to the map
// Code adapted from: https://leafletjs.com/examples/quick-start/
	var latlngs = [
	[53.82219525757908,-1.567266320092831],
	[53.822134436957654,-1.567266320092831],
	[53.8220938898767,-1.567043311147587],
	[53.82203306925527,-1.566333737230902],
	[53.822316898821946,-1.566090454745181],
	[53.822337172362424,-1.565684983935647],
	[53.82225607820052,-1.565097051261822],
	[53.82221553111956,-1.565157871883252],
	[53.82205334279575,-1.5657255310166],
	[53.821891154471935,-1.565867445799937],
	[53.82140458950049,-1.564711853992764],
	[53.8211410334743,-1.563475168023684],
	[53.821242401176676,-1.562866961809382],
	[53.821222127636204,-1.561569455218872],
	[53.82110048639334,-1.560494957573606],
	[53.8208774774481,-1.560231401547408],
	[53.820776109745715,-1.559562374711676],
	[53.8208774774481,-1.558954168497375],
	[53.821201854095726,-1.558751433092608],
	[53.82089775098857,-1.558224321040213],
	[53.8202692712338,-1.556582164261598],
	[53.820107082909985,-1.556237514073494],
	[53.81996516812664,-1.556379428856831],
	[53.81988407396474,-1.556318608235401],
	[53.819721885640924,-1.556561890721122],
	[53.81962051793854,-1.556663258423505],
	[53.81929614129091,-1.556419975937785],
	[53.81891094402185,-1.555021101644891],
	[53.81864738799566,-1.554027698161531],
	[53.81820137010517,-1.552811285732928],
	[53.81842437905041,-1.552649097409114],
	[53.81828246426708,-1.55224362659958],
	[53.818160823024215,-1.55230444722101],
	[53.81797836115992,-1.551797608709092],
	[53.81775535221468,-1.551858429330522],
	[53.81755261680991,-1.551392137899557],
	[53.81753234326944,-1.551534052682894],
	[53.81722824016229,-1.55112858187336],
	[53.817066051838474,-1.550662290442395],
	[53.817005231217045,-1.550216272551907],
	[53.81684304289323,-1.549466151554268],
	[53.816599760407506,-1.548675483475676],
	[53.81666058102894,-1.548472748070909],
	[53.816376751462265,-1.547905088937561],
	[53.81601182773368,-1.547317156263736],
	[53.81586991295035,-1.547377976885166],
	[53.81558608338367,-1.547195515020876],
	[53.81552526276224,-1.54766180645184],
	[53.815951007112254,-1.548330833287572],
	[53.81635647792179,-1.549344510311408],
	[53.816376751462265,-1.549445878013792],
	[53.81653893978608,-1.549648613418559],
	[53.81666058102894,-1.54995271652571],
	[53.81732960786467,-1.551980070573382],
	[53.817674258052776,-1.553216756542462],
	[53.81818109656469,-1.55465617791631],
	[53.81838383196946,-1.555609034318716],
	[53.81846492613137,-1.556156419911587],
	[53.818789302778995,-1.556683531963982],
	[53.818829849859945,-1.557352558799714],
	[53.819032585264715,-1.558345962283073],
	[53.819215047129006,-1.559359639306909],
	[53.81935696191234,-1.560576051735513],
	[53.819417782533776,-1.561589728759349],
	[53.81960024439806,-1.562562858702232],
	[53.819661065019496,-1.563231885537963],
	[53.81992462104569,-1.564245562561799],
	[53.820127356450456,-1.564792948154671],
	[53.82049228017904,-1.565380880828496],
	[53.82112075993382,-1.567550149659505],
	[53.82142486304097,-1.567448781957122],
	[53.82160732490526,-1.56795562046904],
	[53.82219525757908,-1.567266320092831]];
	var polygon = L.polygon(latlngs, {color: 'green'}).addTo(mymap);

	var popup = L.popup();
// End of adaptation
//Add the toggleable layers to the map
	 var overlayMaps = {
     "Protected Trees": TreesMarkers,
	 "Markers" : MarkersMarkers,
	 "Comments" : CommentMarkers, 
	 };
L.control.layers(null, overlayMaps).addTo(mymap); 
//Added a print control to print the map display.
L.control.browserPrint({
			closePopupsOnPrint: false,
			}).addTo(mymap);
	
	//Define array to hold results returned from server
	treeData = new Array();
	commentData=new Array();
	markerData=new Array();
	adminData=new Array();
	pendingCommentsData= new Array();
	
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("php_trees.php", function(results)	{ 
		//Populate treeData with results
		for (var i = 0; i < results.length; i++ )	{
			treeData.push ({
				id: results[i].id, 
				date: results[i].date,
				protection: results[i].protection, 
				lat: results[i].lat, 
				lon: results[i].lon,
				oid: results[i].oid,
			}); 
		}
		
		plotTrees(); 
	});
	
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("php_comments.php", function(results)	{ 
		//Populate commentData with results
		for (var i = 0; i < results.length; i++ )	{
			commentData.push ({
				id: results[i].id, 
				date: results[i].date,
				photo: results[i].photo, 
				lat: results[i].lat, 
				lon: results[i].lon,
				oid: results[i].oid,
			}); 
		}
		plotComments(); 
   });

$.getJSON("php_pendingcomments.php", function(results)	{ 
		//Populate commentData with results
		for (var i = 0; i < results.length; i++ )	{
			pendingCommentsData.push ({
			id: results[i].id,
			oid: results[i].oid,
			});
		// On return of the PendingComments, display these within the PendingComments.innerHTML, but filter out any brackets inside the data, and attach a line break between each tweet for ease of reading by the user.
		document.getElementById("PendingComments").innerHTML=(JSON.stringify(pendingCommentsData).replace(/[{}]/g, '<br>'));
		}
   });
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("php_markers.php", function(results)	{ 
		//Populate commentData with results
		for (var i = 0; i < results.length; i++ )	{
			markerData.push ({
				id: results[i].id, 
				date: results[i].date, 
				lat: results[i].lat, 
				lon: results[i].lon,
				oid: results[i].oid,
			}); 
		}

		plotMarkers(); 
	});	
	
		$.getJSON("php_admin.php", function(results)	{ 
		//Populate adminData with results
		for (var i = 0; i < results.length; i++ )	{
			adminData.push ({
				id: results[i].id, 
				pass: results[i].pass,
			}); 
		} 
	});	
	
// plotTrees function   
 function plotTrees() { 
   //Loop through treeData to create marker at each location
   for (var i = 0; i < treeData.length; i++) {
      var markerLocation =
         new L.LatLng(treeData[i].lat, treeData[i].lon);
		 treedate=new Date(treeData[i].date); 
		 //Converting YYYY-MM-DD date to day date year, more user friendly.
		 var treedateUK=treedate.toLocaleDateString('en-GB',options);
		 treeid= treeData[i].oid;
		// create the marker, give it the TreeIcon and the treetype, protection type and date added and treeID from the treeData array at that position
      var marker = new L.Marker(markerLocation,{icon:TreeIcon}).bindPopup("Tree Type:" + treeData[i].id + "<br>Protection type: " + treeData[i].protection + "<br>Date Recorded: " + treedateUK + "<br>Tree ID " + treeid);
	  // Add the marker to the TreesMarkers featuregroup
	  marker.addTo(TreesMarkers);
	 // Plot the TweetMarkers on the map initially, so trees are displayed on map load.
    TreesMarkers.addTo(mymap);
   }
}	

// plotMarkers function   
 function plotMarkers() { 
   //Loop through markerData to create marker at each location
   for (var i = 0; i < markerData.length; i++) {
      var markerLocation =
         new L.LatLng(markerData[i].lat, markerData[i].lon);
		 markerdate=new Date(markerData[i].date); 
		 markerid= markerData[i].oid;
		 var markerdateUK=markerdate.toLocaleDateString('en-GB',options);
		// create the marker, give it the markerIcon and the marker text, date recorded, and markerID  from the markerData array at that position
      var marker = new L.Marker(markerLocation,{icon:markerIcon}).bindPopup("Text:" + markerData[i].id + "<br>On: " + markerdateUK+ "<br>Marker ID " + markerid);
	  // Add the marker to the MarkersMarkers featuregroup
	  marker.addTo(MarkersMarkers);
	 // Plot the MarkersMarkers on the map initially, so markers are displayed on map load.
    MarkersMarkers.addTo(mymap);
   }
}	
// plotComments function   
 function plotComments() { 
   //Loop through CommentsData to create marker at each location
   for (var i = 0; i < commentData.length; i++) {
      var markerLocation =
         new L.LatLng(commentData[i].lat, commentData[i].lon);
		 commentdate=new Date(commentData[i].date); 
		 commentid= commentData[i].oid;
		 var commentdateUK=commentdate.toLocaleDateString('en-GB',options);
		 var photoImg = '<img src="'+commentData[i].photo +'" style="width:auto; max-width:10px;max-height:10px;">';
		 var picURL2 = 'fallen_tree.jpg';
		// create the marker, give it the commentIcon and the comment, date recorded and commentID from the commentData array at that position
      var marker = new L.Marker(markerLocation,{icon:commentIcon}).bindPopup("Comment:" + commentData[i].id + "<br>Date Recorded: " + commentdateUK +  "<br>Comment ID " + commentid);
	  // Add the marker to the CommentMarkers featuregroup
	  marker.addTo(CommentMarkers);
	 // Plot the CommentMarkers on the map initially, so markers are displayed on map load.
    CommentMarkers.addTo(mymap);
   }
}		
		
// Add button to reorientate map to WRAG
// Code adapted from: http://danielmontague.com/projects/easyButton.js/v1/examples/
L.easyButton('fas fa-location-arrow', function(btn, map) {
	mymap.setView([53.819012,-1.556897], 16);
	}, 'Return to Woodhouse Ridge').addTo(mymap);
// End of adaptation

// Creating font awesome icon for each layer, code adapted from: https://stackoverflow.com/questions/52136700/how-to-use-font-awesome-as-an-icon-in-leaflet-instead-of-marker/52136826
const commentIcon = L.divIcon({
    html: '<i class="far fa-comment fa-1x"></i>',
    iconSize: [25, 25],
    className: 'myDivIcon'
});
const TreeIcon = L.divIcon({
    html: '<i class="fas fa-tree fa-2x"></i>',
    iconSize: [20, 20],
    className: 'myDivIcon'
});
const markerIcon = L.divIcon({
    html: '<i class="fas fa-map-pin fa-2x"></i>',
    iconSize: [20, 20],
    className: 'myDivIcon'
});
//End of adaptation 

// Add location button to the map
// Code adapted from: https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.70.0/README.md
	L.control.locate().addTo(mymap);
// End of adaptation

// Add dropdown options when the map is clicked. 
  DropdownFunction = () => {
	// if admin is logged in, they have access to adding comments, trees, or markers.
	if (admin="yes") {
	var optionValue= document.getElementById("optionchosen").value;
	if (optionValue=="comment") {
		onCommentClick();}
	if (optionValue=="tree") {
		onTreeClick();}
	if (optionValue=="marker") {
		onMarkerClick(); }
		
  }
  else {
	// if admin is not logged in, only display the ability to add comments, and hide all other options.
	// hide the delete options for non-admins also.
	document.getElementById("deletemarker").style.display='none';
	document.getElementById("deletetree").style.display='none';
	document.getElementById("deletecomment").style.display='none';
    var optionValue= document.getElementById("optionchosen").value;
	if (optionValue=="comment") {
		onCommentClick();}
	} 
  }
  var admin="no"; 
  
  var loginbutton= document.getElementById("loginbutton"); 

CloseFunction=() => {
	mymap.closePopup()
    }
// Options adapted from: https://stackoverflow.com/questions/26146420/how-to-format-date-without-time-using-tolocaletimestring
const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
// End of adaptation
var latclick='';
var lonclick='';

// Add dropdown for initial map click
// Code adapted from: jsfiddle.net/rs52zfuk/
  const dropdown =
      "<b>" + `Select what you wish to add at this location: </b>
      <select id="optionchosen">
      <option value="comment">Add comment</option>
      </select> </br> <button onclick="DropdownFunction()">Choose</button> <button onclick="CloseFunction()">Close</button>`;

//Add dropdown for initial map click if admin is logged in, they have access to all functions.
// Code adapted from: jsfiddle.net/rs52zfuk/
  const dropdownAdmin =
      "<b>" + `Select what you wish to add at this location: </b>
      <select id="optionchosen">
      <option value="comment">Add comment</option>
      <option value="tree">Record protected tree</option>
	  <option value="marker"> Add Marker </option>
      </select> </br> <button onclick="DropdownFunction()">Choose</button> <button onclick="CloseFunction()">Close</button>`;
//End of adaptation

// Login portal creation
// Code adapted from: jsfiddle.net/rs52zfuk/
  const login =
      "<b>" + `Please sign in: </b>
      <select id="optionchosen">
      <input type=text value="logina">Insert Username</input>
	  <input type=text value="loginb">Insert Password</input>
      </select> </br> <button onclick="DropdownFunctionAdmin()">Choose</button> <button onclick="CloseFunction()">Close</button>`;

// Add information for marker options
// Code adapted from: jsfiddle.net/rs52zfuk/ and Web-based GIS work.
  const markeroptions =
      "<b>" + `Add data about this marker: </b> </br>
	  <form id = 'insertData' onsubmit ='return validate();' method ='POST' action ='setData_markers.php' enctype="multipart/form-data">
			<p>Add Marker Title: <input type = 'text' id = 'body' name = 'markercomment'></p>
			<input type = 'text' class='coord' id = 'lat' name = 'lat'>
			<input type = 'text'  class='coord' id = 'lon' name = 'lon'>
			<p>Date: <input type = 'date' id = 'date' name = 'markerdate'></p>
			<input type='submit' id ='submit' name = 'Submit' value= 'Submit Form'>
	  </form>`;
	  
// End of adaptation

// Add information for tree options
// Code adapted from: jsfiddle.net/rs52zfuk/ and Web-based GIS work.
  const treeoptions =
      "<b>" + `Add data about the tree: </b> </br>
      <form id = 'insertData' onsubmit ='return validate();' method ='POST' action ='setData_trees2.php' enctype="multipart/form-data">
			<p>Tree Type : <input type = 'text' id = 'body' name = 'treetype'></p>
			<p>Protection Type: <input type = 'text' id = 'bodyprot' name = 'protectiontype'></p>
			<input type = 'text' class='coord' id = 'lat' name = 'lat'>
			<input type = 'text'  class='coord' id = 'lon' name = 'lon'>
			<p>Date: <input type = 'date' id = 'date' name = 'treedate'></p>
			<input type='submit' id ='submit' name = 'Submit' value= 'Submit Form'>
	  </form>`;
// End of adaptation

// Enables the lat lon of the point the map was clicked to be accessed, it is initally stored to a html element, then returned. Code adapted from: https://stackoverflow.com/questions/26995223/how-to-transfer-leaflet-markers-lat-long-in-textbox
var latval=document.getElementById("userLat1").value;
var lngval=document.getElementById("userLat1").value;

// Add information for comment options.
// Code adapted from: jsfiddle.net/rs52zfuk/ and Web-based GIS work.
  const commentoptions =
      "<b>" + `Add comment: </b> </br>
       <form id = 'insertData' onsubmit ='return validate();' method ='POST' action ='setData_comments2.php' enctype="multipart/form-data">
			<p>Insert Comment: <input type = 'text' id = 'body' name = 'commenttext'></p>
			<input type = 'text' class='coord' id = 'lat' name = 'lat'>
			<input type = 'text'  class='coord' id = 'lon' name = 'lon'>
			<p>Date: <input type = 'date' id = 'date' name = 'commentdate'></p>
			<input type='submit' id ='submit' name = 'submit' value= 'Submit Form'>
	  </form>`;
// End of adaptation

 
// Add function that enables functions to be clicked on on map click
// Code taken from tutorial at: https://leafletjs.com/examples/quick-start/
	var popup = L.popup();
	function onMapClick(e) {
		if (admin=="yes") {
		popup
        .setLatLng(e.latlng)
		.setContent(dropdownAdmin)
		.openOn(mymap); 
		}
		else { 
		popup
		.setLatLng(e.latlng)
		.setContent(dropdown)
		.openOn(mymap);
		}
	latLng=e.latlng;
	var latLngstore= e.latlng;
}
mymap.on('click', onMapClick);


// Add function that enables marker to be added
// Code taken from tutorial at: https://leafletjs.com/examples/quick-start/
	var popup = L.popup();

	function onMarkerClick(e) {
    popup
        .setContent(markeroptions)
        .openOn(mymap);
		latval=document.getElementById("userLat1").value;
		document.querySelector('#lat').value=latval;
		lngval=document.getElementById("userLng1").value;
		document.querySelector('#lon').value=lngval;
}


// Add function that enables trees to be recorded
// Code taken from tutorial at: https://leafletjs.com/examples/quick-start/
	var popup = L.popup();

	function onTreeClick(e) {
    popup
        .setContent(treeoptions)
        .openOn(mymap);
		latval=document.getElementById("userLat1").value;
		document.querySelector('#lat').value=latval;
		lngval=document.getElementById("userLng1").value;
		document.querySelector('#lon').value=lngval;
}

// Add function that enables comments to be recorded
// Code taken from tutorial at: https://leafletjs.com/examples/quick-start/
	var popup = L.popup();

	function onCommentClick(e) {
    popup
        .setContent(commentoptions)
        .openOn(mymap);
		latval=document.getElementById("userLat1").value;
		document.querySelector('#lat').value=latval;
		lngval=document.getElementById("userLng1").value;
		document.querySelector('#lon').value=lngval;
	}
// Function to create buttons on map click to store the protected trees location
// Code adapted from: https://stackoverflow.com/questions/52619186/why-are-these-buttons-undefined?noredirect=1&lq=1
 function storecoordsChoice(e) {
	 latclick= e.latlng.lat;
	 lonclick= e.latlng.lng;
	 document.querySelector('#userLat1').value = latclick;
	 document.querySelector('#userLng1').value = lonclick;
 }

 mymap.on('click', storecoordsChoice);

//Define the modal textbox as a global variable
var modal = document.getElementById("ModalLogin");
// Get the <span> element, the cross in the top right that closes the modal
var span = document.getElementsByClassName("close")[0];

// Code adapted from: http://danielmontague.com/projects/easyButton.js/v1/examples/
// Creating login function that updates the icon when the admin successfully logs in to the website. 
var toggle = L.easyButton({
  states: [{
    stateName: 'lock',
    icon: 'fas fa-lock',
    title: 'Administrator Login',
    onClick: function(control) {
      modal.style.display='block';
	  span.onclick= function() { 
		document.getElementById("logina").value=null;
		document.getElementById("loginb").value=null;
		document.getElementById("logintext").value=null;
		modal.style.display="none"; 
		
	  }
	  // on window click, close the modal box and set all login values back to null, as the user has clicked off the login portal. 
	  window.onclick= function(event) {
		  if (event.target==modal) {
			  modal.style.display="none";
			  document.getElementById("logina").value=null;
		      document.getElementById("loginb").value=null;
		      document.getElementById("logintext").value=null;
		  }
	  }
	    loginbutton.onclick= function () {
		//for loop to check for the presence of both the username and password on the same row in the adminData array table. Code adapted from: https://stackoverflow.com/questions/6262524/creating-a-login-in-javascript-array-comparison
		for (var i=0; i <adminData.length; i++) {
			$pattern = "/[^A-Za-z\s\.\:\-\+\!\@\,\'\"]/";
			username=(document.getElementById("logina").value.replace(/[^A-Za-z0-9\s\.\:\-\+\!\@\,\'\$\"]/));
			password=(document.getElementById("loginb").value.replace(/[^A-Za-z0-9\s\.\:\-\+\!\@\,\'\$\"]/));
			if ((username==adminData[i].id) && (password==adminData[i].pass)){ 
			// if ((document.getElementById("logina").value==adminData[i].id) && (document.getElementById("loginb").value==adminData[i].pass)) {
				document.getElementById("logintext").innerHTML=("Sucessful Login");
				admin="yes";
				document.getElementById("DeleteDataComment").style.display='block';
				document.getElementById("PendingCommentsBtn").style.display='block';
				document.getElementById("PendingCommentsBtnHide").style.display='block';
				document.getElementById("DeleteDataTree").style.display='block';
				document.getElementById("DeleteDataMarker").style.display='block';
				document.getElementById("DeleteDataPendingComment").style.display='block';
				document.getElementById("StorePendingComment").style.display='block';
				control.state('logged-in');
				// Delays the closing of the dialog box for 1 seconds to ensure the user has time to read the successful login statement.
				setTimeout(function()
				{ 
				modal.style.display="none";
				}, 1000); 
				//Used to break the for loop, so once the user is logged in the loop does not run again, this is needed as during testing was noted that the loop ran after successful login.
				break;
		} else {
			// Incorrect login given a text response, admin is set to no and all delete options are hidden from view.
			document.getElementById("logintext").innerHTML=("Incorrect Username or Password");
			admin="no";
			document.getElementById("DeleteDataComment").style.display='none';
			document.getElementById("DeleteDataTree").style.display='none';
			document.getElementById("DeleteDataMarker").style.display='none';
		}
   }
		}	
	  
    }
  },
	{
	// If user successfully logs in then the icon changes to rflect this, and if clicked will remind them they are already logged in.
    icon: 'fas fa-unlock',
    stateName: 'logged-in',
    onClick: function(control) {
      alert ("You are already logged in as an administrator.");
    },
    title: 'Logged is as admin'
  }]
});
toggle.addTo(mymap);
// End of adaptation

function DeletePending() {
	alert("Deleted Pending comment");
}
}

// Function to turn on the Pending comments and turn off the delete comments, trees, and markers when showing the pending comments to reduce clutter.
function PendingButtonShow() {
	document.getElementById("PendingComments").style.display="block"; 
	document.getElementById("DeleteDataComment").style.display="none"; 
	document.getElementById("DeleteDataMarker").style.display="none"; 
	document.getElementById("DeleteDataTree").style.display="none";
}
// function to turn on the delete comments, trees, and markers option, and hide pending comments.
function PendingButtonHide() {
document.getElementById("PendingComments").style.display="none";
document.getElementById("DeleteDataComment").style.display="block"; 
document.getElementById("DeleteDataMarker").style.display="block"; 
document.getElementById("DeleteDataTree").style.display="block";
}