var map; // The map object
var myCentreLat = 53.797316;
var myCentreLng = -1.542664;
var initialZoom = 14;

function infoCallback(infowindow, marker) {
   return function() {
      infowindow.open(map, marker);
   };
}

function addMarker(myPos,myTitle,myInfo) {
   var marker = new google.maps.Marker({
      position: myPos,
      map: map,
      title: myTitle,
	  icon: 'blueplaque2.png'
   });
   var infowindow = new google.maps.InfoWindow({content: myInfo});
   google.maps.event.addListener(marker,
      'click', infoCallback(infowindow, marker));
}

function initialize() {
   var latlng = new google.maps.LatLng(myCentreLat,myCentreLng);
   var myOptions = {
      zoom: initialZoom,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   map = new google.maps.Map(
      document.getElementById("map_canvas"),myOptions);

   for (no in os_plaques) {
      var info = "<div class=infowindow><h1>" +
         os_plaques[no].Title + "</h1><p>Caption: "
         + os_plaques[no].Caption +
         "</p></div>";

      // Convert co-ords
      var osPt = new OSRef(
         os_plaques[no].Easting,os_plaques[no].Northing);
      var llPt = osPt.toLatLng(osPt);
      llPt.OSGB36ToWGS84();

		 
      addMarker(
         new google.maps.LatLng(llPt.lat,llPt.lng),
         os_plaques[no].Title,
		 info);
   }

}