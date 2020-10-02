var map;
var myCentreLat = 53.803338;
var myCentreLng = -1.542511;
var initialZoom = 14;

function infoCallback(infowindow, marker) {
   return function() {
      infowindow.open(map, marker);
   };
}

function addMarker(myPos,myTitle,myInfo) {
   var marker = new google.maps.Marker(
      {position: myPos, map: map, title: myTitle, icon:'marker.png' }
   );
   var infowindow = new google.maps.InfoWindow({content: myInfo});
   google.maps.event.addListener
      (marker, 'click', infoCallback(infowindow, marker));
}

function initialize() {
   var latlng = new google.maps.LatLng(myCentreLat,myCentreLng);
   var myOptions = {
      zoom: initialZoom,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   map = new google.maps.Map
      (document.getElementById("map_canvas"), myOptions);

for (id in markerData) {
   var info = "<div class=infowindow><h1>" +
      markerData[id].name + "</h1><p>Time spent at location: " +
      markerData[id].time_spent + "</p></div>";
   addMarker(new google.maps.LatLng(
      markerData[id].lat,markerData[id].lng), markerData[id].name,info);
}
}