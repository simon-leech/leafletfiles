//create the global map variable
var map;
// Create Milkmarkers as a feature group of the map
var MilkMarkers = L.featureGroup();
// Create Breadmarkers as a feature group of the map
var BreadMarkers = L.featureGroup();
// Create Toiletmarkers as a feature group of the map
var ToiletMarkers = L.featureGroup();
// Create Friesmarkers as a feature group of the map
var FriesMarkers = L.featureGroup();
// Create Coffeemarkers as a feature group of the map
var CoffeeMarkers = L.featureGroup();
// Create Tweet_Heat as a feature group of the map
var Tweet_Heat = L.featureGroup();

// Function for example.html page, this will load the page with the first slide displayed.
// // Code adapted from: https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_slideshow_caption
var slideIndex = 1;
function SlideshowLoad() {
showSlides(slideIndex);
}
//When the plus button is clicked, this function will show the slide of number 'n'.
function plusSlides(n) {
  showSlides(slideIndex += n);
}
//The current slide shows the number in top left of the page, out of 3, using number 'n'.
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//This function alters the slide on display, by setting the slide display to none for all other slides than the slide of the current number of 'n'.
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}
// End of adaptation

//fetch data function, which will occur on load of the map.html page. 
function fetchData()	{
	// Create map and its initial position and zoom
	map = L.map('mapid').setView([38.394043, -98.761763], 4);
	// Add the tilelayer map to the map 
	L.tileLayer('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=61bd47663b7d42a8867be1fbb9c31c9e', {
    attribution: 'Map (c) <a href="http://thunderforest.com">Thunderforest</a> Data (c) <a href= "http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors</a>'
}).addTo(map);
	// Create mapbase and add the tilelayer to the mapbase
	mapbase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap contributors </a>)'
});


	// Create overlaymaps for user activity to alter map layers that are plotted.
	overlayMaps = {
	 // Define layers for user control
	 "Show OSM Basemap": mapbase,
     "Milk" : MilkMarkers, 
     "Bread" : BreadMarkers,
     "Toilet Roll" : ToiletMarkers,
     "Fries and Chips": FriesMarkers,
     "Coffee" : CoffeeMarkers,
	 "Heat Map" : Tweet_Heat,
	 };
	// Add the control to the map
	L.control.layers(null, overlayMaps).addTo(map); 

	// Add print function 
	//today set as the date.tostring to ensure that when downloading the map from map.html that each download is stored as 'Map' and the date, to enable them to be found more easily than Map(x).
	var today = new Date().toString().replace(/[^\w]/g, '');
	// Code taken from: https://github.com/rowanwins/leaflet-easyPrint
	L.easyPrint({
	title: 'Click to Download Map as Image',
	position: 'topleft',
	sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
    filename: ('Map '+ today),
    exportOnly: true,
    hideControlContainer: true
	}).addTo(map);
	// End of adaptation
	//Setting up the DOM elements, and defining their initial state when the map is loading, all these elements will appear within the formbox at the left of map.html.
	document.getElementById("ResetButton").style.display='none';
	document.getElementById("WeightInfo").style.display='none';
	document.getElementById("SubmitButtonWeight").style.display='none';
	document.getElementById("BackButton").style.display='none';
	document.getElementById("FriesWeight").style.display='none';
	document.getElementById("MilkWeight").style.display='none';
	document.getElementById("BreadWeight").style.display='none';
	document.getElementById("CoffeeWeight").style.display='none';
	document.getElementById("ToiletWeight").style.display='none';
	document.getElementById("WeightTitle").style.display='none';
	document.getElementById("TweetsInclude").style.display='none';
	document.getElementById("SubmitButton").style.display='none';
	document.getElementById("webpageinfo").style.display='block';
	document.getElementById("heatdens").style.display='block';
	document.getElementById("densitybutton").style.display='block';
	document.getElementById("weightvalues").style.display='none';
	document.getElementById("CancelButton").style.display='none';
	document.getElementById("userinfo").style.display='none';
	document.getElementById("NewHeatButton").style.display='none';
	document.getElementById("resetcheck").style.display='none';
	document.getElementById("yesbutton").style.display='none';
	
//JSON call to access all the GEOJSON files. 
// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
 $.getJSON("coffee.geojson", function(coffee) {
	  // 
      L.geoJson(coffee, {
		// onEachFeature, store the feature, with a custom marker, and bind a popup with the Date and Text of the Tweet to the CoffeeMarkers feature group for display.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// create a marker style
            var logoMarkerStyle = L.Icon.extend({
                                            options: {
                                            iconSize: [30, 30],
                                            iconAnchor: [30, 30],
                                            popupAnchor: [-15, -20]
                                        }
                                    });
			var lat= feature.geometry.coordinates[1];
			var lon= feature.geometry.coordinates[0];
			// SVG from: https://www.svgrepo.com/svg/63866/coffee 
			var logoMarker= new logoMarkerStyle({iconUrl: 'coffeeicon2.svg'});
			L.marker([lat, lon], {icon:logoMarker}).bindPopup("<b> Date created: </b> " + feature.properties.Date + "<b> </br> Tweet: </b>" + feature.properties.Text).addTo(CoffeeMarkers);
			// End of adaption
        }
      }
      )

    });
// End of adaptation

// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
 $.getJSON("milk.geojson", function(milk) {

      L.geoJson(milk, {
		// onEachFeature, store the feature, with a custom marker, and bind a popup with the Date and Text of the Tweet to the MilkMarkers feature group for display.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// create a marker style
            var logoMarkerStyle = L.Icon.extend({
                                            options: {
                                            iconSize: [30, 30],
                                            iconAnchor: [30, 30],
                                            popupAnchor: [-15, -20]
                                        }
                                    });
			lat= feature.geometry.coordinates[1];
			lon= feature.geometry.coordinates[0];
			// SVG from: https://www.svgrepo.com/svg/52398/milk
			var logoMarker= new logoMarkerStyle({iconUrl: 'milkicon2.svg'});
			L.marker([lat, lon], {icon:logoMarker}).bindPopup("<b> Date created: </b> " + feature.properties.Date + "<b> </br> Tweet: </b>" + feature.properties.Text).addTo(MilkMarkers);
			// End of adaption
        }
      }
      )

    });
// End of adaptation

// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
 $.getJSON("bread.geojson", function(bread) {

      L.geoJson(bread, {
		// onEachFeature, store the feature, with a custom marker, and bind a popup with the Date and Text of the Tweet to the BreadMarkers feature group for display.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// create a marker style
            var logoMarkerStyle = L.Icon.extend({
                                            options: {
                                            iconSize: [30, 30],
                                            iconAnchor: [30, 30],
                                            popupAnchor: [-15, -20]
                                        }
                                    });
			var lat= feature.geometry.coordinates[1];
			var lon= feature.geometry.coordinates[0];
			// SVG from: // https://freesvg.org/loaf-of-bread-vector
			var logoMarker= new logoMarkerStyle({iconUrl: 'breadicon.svg'});
			L.marker([lat, lon], {icon:logoMarker}).bindPopup("<b> Date created: </b> " + feature.properties.Date + "<b> </br> Tweet: </b>" + feature.properties.Text).addTo(BreadMarkers);
			// End of adaption
        }
      }
      )

    });
// End of adaptation

// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
 $.getJSON("fries.geojson", function(fries) {

      L.geoJson(fries, {
		// onEachFeature, store the feature, with a custom marker, and bind a popup with the Date and Text of the Tweet to the FriesMarkers feature group for display.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// create a marker style
            var logoMarkerStyle = L.Icon.extend({
                                            options: {
                                            iconSize: [30, 30],
                                            iconAnchor: [30, 30],
                                            popupAnchor: [-15, -20]
                                        }
                                    });
			var lat= feature.geometry.coordinates[1];
			var lon= feature.geometry.coordinates[0];
			// // SVG FROM: https://www.svgrepo.com/svg/127809/fries
			var logoMarker= new logoMarkerStyle({iconUrl: 'friesicon2.svg'});
			L.marker([lat, lon], {icon:logoMarker}).bindPopup("<b> Date created: </b> " + feature.properties.Date + "<b> </br> Tweet: </b>" + feature.properties.Text).addTo(FriesMarkers);
			// End of adaption
        }
      }
      )

    });
// End of adaptation

// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
 $.getJSON("toilet.geojson", function(toilet) {

      L.geoJson(toilet, {
		// onEachFeature, store the feature, with a custom marker, and bind a popup with the Date and Text of the Tweet to the ToiletMarkers feature group for display.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// create a marker style
            var logoMarkerStyle = L.Icon.extend({
                                            options: {
                                            iconSize: [30, 30],
                                            iconAnchor: [30, 30],
                                            popupAnchor: [-15, -20]
                                        }
                                    });
			var lat= feature.geometry.coordinates[1];
			var lon= feature.geometry.coordinates[0];
			// SVG from: https://www.svgrepo.com/svg/61555/toilet-paper
			var logoMarker= new logoMarkerStyle({iconUrl: 'toileticon2.svg'});
			L.marker([lat, lon], {icon:logoMarker}).bindPopup("<b> Date created: </b> " + feature.properties.Date + "<b> </br> Tweet: </b>" + feature.properties.Text).addTo(ToiletMarkers);
			// var heat = L.heatLayer ([[lat, lon]], {radius:25}).addTo(Tweet_Heat);
			// End of adaption
        }
      }
      )

    });
// End of adaptation
}

// This function will Show these buttons when any of the radio buttons are clicked, they are shown only once a radio button is selected as you cannot reset nothing, and cannot submit no selections. 
function showButtons() {
  document.getElementById("SubmitButton").style.display='block';
  document.getElementById("ResetButton").style.display ='block';
}

// This function will occur once you click Submit your radio button choices. 
function SubmitFunc() {
	//TweetsInclude, the radio buttons, are all turned off, as they have been used now. 
	document.getElementById("TweetsInclude").style.display='none';
	// WeightInfo, display paragraph outlining what to do with the sliders is now displayed for user understanding. 
	document.getElementById("WeightInfo").style.display='block';
	// If function for if the fries radio button was clicked, then display the fries weighting slider. Needed as otherwise sliders would be seen for layers that were not selected for use. 
	if (document.getElementById("fries").checked==true) {
	document.getElementById("FriesWeight").style.display='block';}
	// If function for if the milk radio button was clicked, then display the fries weighting slider. Needed as otherwise sliders would be seen for layers that were not selected for use. 
	if (document.getElementById("milk").checked==true) {
	document.getElementById("MilkWeight").style.display='block';}
	// If function for if the bread radio button was clicked, then display the fries weighting slider. Needed as otherwise sliders would be seen for layers that were not selected for use. 
	if (document.getElementById("bread").checked==true) {
	document.getElementById("BreadWeight").style.display='block';}
	// If function for if the coffee radio button was clicked, then display the fries weighting slider. Needed as otherwise sliders would be seen for layers that were not selected for use. 
	if (document.getElementById("coffee").checked==true) {
	document.getElementById("CoffeeWeight").style.display='block';}
	// If function for if the toilet radio button was clicked, then display the fries weighting slider. Needed as otherwise sliders would be seen for layers that were not selected for use. 
	if (document.getElementById("toilet").checked==true) {
	document.getElementById("ToiletWeight").style.display='block';}
	// Back button is displayed. Through testing it was seen that a back button was needed in case the user included radio buttons that did not want, or changed their mind. 
	document.getElementById("BackButton").style.display='block';
	// Submit Button is turned off, as this has now served its function.
	document.getElementById("SubmitButton").style.display='none';
	// Reset Button is turned off, as the user is able, through user input, to move the sliders to any number from 0-100, so can choose their values freely.
	document.getElementById("ResetButton").style.display='none';
	// Weightvalues displayed. Through testing, it wasn't clear to the user that the weightings needed to sum to 100, so this dynamic box was added as a user validation for when values summed to 100.
	document.getElementById("weightvalues").style.display='block';
	// totalcheck function ran, which resets any weighting values to 0 to prevent bugs occuring where the value can be above 100%.
	totalcheck();
} 
// Reset function which can be clicked when selecting radio buttons only.
function ResetFunc() {
		// This function will reset the checked buttons, so all buttons are not selected. This is needed, as radio buttons cannot be selected and then deselected by clicking on them, so needed in case the user makes a mistake. 
		document.getElementById("fries").checked=false;
		document.getElementById("toilet").checked=false;
		document.getElementById("bread").checked=false;
		document.getElementById("milk").checked=false;
		document.getElementById("coffee").checked=false;
		// Turn off the display of the submit button. This is needed as you cannot submit the form with no radio buttons selected. 
		document.getElementById("SubmitButton").style.display='none';
		//Turn off display of Reset Button, as not required.
		document.getElementById("ResetButton").style.display='none';
}

//Back function.
function BackFunc() {
		// This back function is used to return to the radio button page from the slider page. 
		//TweetsInclude (radio buttons form) set to display as user needs to select from these options.
		document.getElementById("TweetsInclude").style.display='block';
		//Turn off display of the Back Button, as you have already pressed it.
		document.getElementById("BackButton").style.display='none';
		// WeightNoDisplay will turn off display of all weight sliders, their info and associated text.
		WeightNoDisplay();
		// ResetFunc will reset all radio buttons to unchecked, and remove display of SubmitButton. This was included as an efficiency improvement as these lines of code are repeatedly ran.
		ResetFunc();
		// totalcheck function ran again, to reset any weighting values.
		totalcheck();
		// Turn on display of WeightTitle text.
		document.getElementById("WeightTitle").style.display='block';
	}
//End of adaptation

function totalcheck () {
	// If total.innerHTML (weightings sum) not 0, then reset all values to 0. Through testing, noticed this bug after cancelling the creation of a heat map, the layers still retained their values so the total will be above 100% and cannot be brought below, so here this validation checks if they were previously more than 0, and reset them accordingly.
	if (document.getElementById("total").innerHTML !=0) {
		document.getElementById('Coffeerange').value=0;
		document.getElementById('Milkrange').value=0;
		document.getElementById('Toiletrange').value=0;
		document.getElementById('Breadrange').value=0;
		document.getElementById('Friesrange').value=0;
		document.getElementById('valuemilk').innerHTML=0;
		document.getElementById('valuetoilet').innerHTML=0;
		document.getElementById("valuefries").innerHTML=0;
		document.getElementById('valuebread').innerHTML=0;
		document.getElementById("valuecoffee").innerHTML=0;
		document.getElementById("total").innerHTML=0;
	}
}

//DensityYes function which occurs when the user clicks they would like to build a heat layer.
function DensityYes() {
	//Set display of webpageinfo to none.
	document.getElementById("webpageinfo").style.display='none';
	//Set display of heatdens to none.
	document.getElementById("heatdens").style.display='none';
	//Set WeightTitle to display.
	document.getElementById("WeightTitle").style.display='block';
	//Display the radio button form.
	document.getElementById("TweetsInclude").style.display='block';
	// Remove display of the button that is clicked when the user would like to build a heat layer.
	document.getElementById("densitybutton").style.display='none';
	// Display the Cancel Button. Important for use of the website so the user can click this if they accidentally clicked the previous button.
	document.getElementById("CancelButton").style.display='block';
	// Do not display the NewHeatButton, this button will only display once a Heat Map has already been generated.
	document.getElementById("NewHeatButton").style.display='none';
	// Do not display userinfo, as this is telling the user what they can do on the site.
	document.getElementById("userinfo").style.display='none';
	// Do not display the reset button, as no radio buttons have been checked yet.
	document.getElementById("resetcheck").style.display='none';
	// Do not display the yesbutton, as this will display once a Heat Map has already been generated.
	document.getElementById("yesbutton").style.display='none';
}

// Code adapted from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider
// Creating toiletslider using DOM element, setting outputtoilet to the DOM, and attaching the innerHTML of outputtoilet to the slidertoilet.value for the slider.
var slidertoilet = document.getElementById("Toiletrange");
	outputtoilet = document.getElementById("valuetoilet");
	outputtoilet.innerHTML = slidertoilet.value;
// Creating milkslider using DOM element, setting outputmilk to the DOM, and attaching the innerHTML of outputmilk to the slidermilk.value for the slider.
var slidermilk = document.getElementById("Milkrange");
var outputmilk = document.getElementById("valuemilk");
	outputmilk.innerHTML = slidermilk.value;
// Creating breadslider using DOM element, setting outputbread to the DOM, and attaching the innerHTML of outputbread to the sliderbread.value for the slider.
var sliderbread = document.getElementById("Breadrange");
var outputbread = document.getElementById("valuebread");
	outputbread.innerHTML = sliderbread.value;
// Creating coffeeslider using DOM element, setting outputcoffee to the DOM, and attaching the innerHTML of outputcoffee to the slidercoffee.value for the slider.
var slidercoffee = document.getElementById("Coffeerange");
var outputcoffee = document.getElementById("valuecoffee");
	outputcoffee.innerHTML = slidercoffee.value;
// Creating friesslider using DOM element, setting outputfries to the DOM, and attaching the innerHTML of outputfries to the sliderfries.value for the slider.
var sliderfries = document.getElementById("Friesrange");
var outputfries = document.getElementById("valuefries");
	outputfries.innerHTML = sliderfries.value;

// On input to each slider, set the innerHTML to the value of that slider. This is needed as the value needs to constantly update as the user interacts with the sliders displayed, and the value is displayed for the user to see also.
sliderfries.oninput = function() {
  outputfries.innerHTML = sliderfries.value;
}
slidercoffee.oninput = function() {
  outputcoffee.innerHTML = slidercoffee.value;
}
sliderbread.oninput = function() {
  outputbread.innerHTML = sliderbread.value;
}
slidermilk.oninput = function() {
  outputmilk.innerHTML = slidermilk.value;
}
slidertoilet.oninput = function() {
  outputtoilet.innerHTML = slidertoilet.value;
}
//End of adaptation

// Code adapted from: https://stackoverflow.com/questions/48267942/how-to-get-the-sum-of-values-derived-from-range-sliders
$(function() {
  $('input[type=range]').change(getTotal); // not () - you're not calling the function
  getTotal(); // initially call it
});
//getTotal Function
function getTotal() {
  // This function will parse the integer value of slidertoilet.value and set this to the variable toilet.
  var toilet = parseInt(slidertoilet.value) || 0;
  // This function will parse the integer value of slidermilk.value and set this to the variable milk.
  var milk = parseInt(slidermilk.value) || 0;
  // This function will parse the integer value of sliderbread.value and set this to the variable bread.
  var bread = parseInt(sliderbread.value) || 0;
  // This function will parse the integer value of slidercoffee.value and set this to the variable coffee.
  var coffee = parseInt(slidercoffee.value) || 0;
  // This function will parse the integer value of sliderfries.value and set this to the variable fries.
  var fries = parseInt(sliderfries.value) || 0;
  // Set total.innerHTML to the sum of all 5 slider values. This is needed so the user can see the value of the sum, which must add to 100.
  document.getElementById("total").innerHTML = toilet + milk + bread + coffee + fries;
  // If the value of total is 100, then update the CSS of the weightvalues box to display as green, and remove the line of text that says 'Sum must add to 100'. This is for ease of use for the user as they are told when their inputs are correct. 
  if (document.getElementById("total").innerHTML== 100){
	  // Display the submit button as they can submit when the sum is at 100.
	  document.getElementById("SubmitButtonWeight").style.display='block';
	  document.getElementById("weightvalues").style.backgroundColor='#39ff14';
	  document.getElementById("weightvalues").style.height="35px";
	  document.getElementById("WeightInfo").style.display='none';
  }
  // Need the else clause as during testing noted that you could set the value to 100, then move the sliders, and it would still display as a green box, so the else clause causes the if to update the box dynamically with changes to inputs.
  else { 
  // If the sum is not 100, then remove the display of submit button, and display the weightvalues box to red, and display the line of text 'Sum must add to 100', to tell the user they need to change their inputs.
	  document.getElementById("SubmitButtonWeight").style.display='none';
	  document.getElementById("weightvalues").style.backgroundColor='#ff3300';
	  document.getElementById("WeightInfo").style.display='block';
	  document.getElementById("weightvalues").style.height="60px";
  }
}
//End of adaptation

// SubmitFuncWeight function which is ran when the user clicks submit after the weightings all sum to 100.
function SubmitFuncweight() {
	// if statement to check the length of the Tweet_Heat Heat Map layer. During testing this was noted as required as the user is able to add another heat layer but to do so the previous heat layer must be reset. 
	if (Tweet_Heat.length!=0) {
		// Clears the Tweet_Heat layer so it can be reused.
		Tweet_Heat.clearLayers();
	}
	// If total.innerHTML (sum of weightings) equal to 100. This is included as a secondary validation method to ensure that no weightings are attempted that do not add to 100.
	if ((document.getElementById("total").innerHTML)==100) {
		//If the parsed value of slidertoilet is not equal to 100. Needed to ensure that only sliders set to a value are included in the heat map.
		if (parseInt(slidertoilet.value)!=0) {
			// Call GEOJSON
			// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
			$.getJSON("toilet.geojson", function(toilet) {
				L.geoJson(toilet, {
					//for each feature in the layer, run these functions.
					onEachFeature: function(feature, layer) {
					// Collect the lat and lon of the feature and store to a variable.
					lat= feature.geometry.coordinates[1];
					lon= feature.geometry.coordinates[0];
					// Add to the Tweet_Heat layer, the lat and lon (location), and use the value of (parseInt(slidertoilet.value/100)) as the weight to include on the heat map. This is included as it is hugely important for the user to control the relative importance of each food type, depending on their choices.
					var heat = L.heatLayer ([[lat, lon]], (parseInt(slidertoilet.value)/100), {radius:25}).addTo(Tweet_Heat);
			// End of adaption
			}
	  }
      )

    });
	}
	// If the parsed value of slidermilk is not equal to 100.Needed to ensure that only sliders set to a value are included in the heat map.
	if (parseInt(slidermilk.value)!=0) {
			// Call GEOJSON
			// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
			$.getJSON("milk.geojson", function(milk) {
				L.geoJson(milk, {
					// for each feature in the layer, run these functions.
					onEachFeature: function(feature, layer) {
					lat= feature.geometry.coordinates[1];
					lon= feature.geometry.coordinates[0];
					// Add to the Tweet_Heat layer, the lat and lon (location), and use the value of (parseInt(slidermilk.value/100)) as the weight to include on the heat map. This is included as it is hugely important for the user to control the relative importance of each food type, depending on their choices.
					var heat = L.heatLayer ([[lat, lon]], (parseInt(slidermilk.value)/100), {radius:25}).addTo(Tweet_Heat);
			// End of adaption
			}
	  }
      )

    });
		}
	// If the parsed value of sliderbread is not equal to 100.Needed to ensure that only sliders set to a value are included in the heat map.
	if (parseInt(sliderbread.value)!=0) {
			// Call GEOJSON
			// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
			$.getJSON("bread.geojson", function(bread) {
				L.geoJson(bread, {
					// for each feature in the layer, run these functions.
					onEachFeature: function(feature, layer) {
					lat= feature.geometry.coordinates[1];
					lon= feature.geometry.coordinates[0];
					// Add to the Tweet_Heat layer, the lat and lon (location), and use the value of (parseInt(sliderbread.value/100)) as the weight to include on the heat map. This is included as it is hugely important for the user to control the relative importance of each food type, depending on their choices.
					var heat = L.heatLayer ([[lat, lon]], (parseInt(sliderbread.value)/100), {radius:25}).addTo(Tweet_Heat);
			// End of adaption
			}
	  }
      )

    });
		}
	// If the parsed value of slidercoffee is not equal to 100.Needed to ensure that only sliders set to a value are included in the heat map.
	if (parseInt(slidercoffee.value)!=0) {
			// Call GEOJSON
			// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
			$.getJSON("coffee.geojson", function(coffee) {
				L.geoJson(coffee, {
					//for each feature in the layer, run these functions.
					onEachFeature: function(feature, layer) {
					lat= feature.geometry.coordinates[1];
					lon= feature.geometry.coordinates[0];
					// Add to the Tweet_Heat layer, the lat and lon (location), and use the value of (parseInt(slidercoffee.value/100)) as the weight to include on the heat map. This is included as it is hugely important for the user to control the relative importance of each food type, depending on their choices.
					var heat = L.heatLayer ([[lat, lon]], (parseInt(slidercoffee.value)/100), {radius:25}).addTo(Tweet_Heat);
			// End of adaption
			}
	  }
      )

    });
		}
	// If the parsed value of sliderfries is not equal to 100.Needed to ensure that only sliders set to a value are included in the heat map.
	if (parseInt(sliderfries.value)!=0) {
			//Call GEOJSON
			// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
			$.getJSON("fries.geojson", function(fries) {
				L.geoJson(fries, {
					onEachFeature: function(feature, layer) {
					lat= feature.geometry.coordinates[1];
					lon= feature.geometry.coordinates[0];
					// Add to the Tweet_Heat layer, the lat and lon (location), and use the value of (parseInt(sliderbread.value/100)) as the weight to include on the heat map. This is included as it is hugely important for the user to control the relative importance of each food type, depending on their choices.
					var heat = L.heatLayer ([[lat, lon]], (parseInt(sliderfries.value)/100), {radius:25}).addTo(Tweet_Heat);
			// End of adaption
			}
	  }
      )

    });
		}
	}
	
	// Turn off display of the Back Button.
	document.getElementById("BackButton").style.display='none';
	// This function will remove display of all sliders, and their associated text.
	WeightNoDisplay(); 
	// Turn off display of Cancel Button, as it has already been submitted.
	document.getElementById("CancelButton").style.display='none';
	// Turn on display of userinfo, we are now reloading the display at the start of the website.
	document.getElementById("userinfo").style.display='block';
	// Turn off display of densitybutton, as the first density map has been created, so instead we now need a new button to add another heat map.
	document.getElementById("densitybutton").style.display='none';
	// Turn on display of webpage info, as this was loading initially on the webpage.
	document.getElementById("webpageinfo").style.display='block';
	// Turn off the heatdens text.
	document.getElementById("heatdens").style.display='none';
	// Turn on the NewHeatButton, this effectively replaces the densitybutton, but includes a few extra validations when pressed.
	document.getElementById("NewHeatButton").style.display='block';
	
}

//WeightNoDisplay function, called inside other functions as a code efficiency measure.
function WeightNoDisplay() {
	//// This function will turn off display of all sliders and their associated text. This was included as this code is ran repeatedly and so code efficiency was improved by storing this in a function to call over and over.
	document.getElementById("ToiletWeight").style.display='none';
	document.getElementById("MilkWeight").style.display='none';
	document.getElementById("BreadWeight").style.display='none';
	document.getElementById("CoffeeWeight").style.display='none';
	document.getElementById("FriesWeight").style.display='none';
	document.getElementById("SubmitButtonWeight").style.display='none';
	document.getElementById("WeightInfo").style.display='none';
	document.getElementById("WeightTitle").style.display='none';
	document.getElementById("weightvalues").style.display='none';
}
//Cancel Function, ran when cancel button clicked.
function CancelFunc() {
	// Back Button no longer displayed,as not needed.
	document.getElementById("BackButton").style.display='none';
	// Cancel Button no longer displayed, as not needed.
	document.getElementById("CancelButton").style.display='none';
	// DensityButton shown to allow user to build heat map again.
	document.getElementById("densitybutton").style.display='block';
	// Webpage info text displayed.
	document.getElementById("webpageinfo").style.display='block';
	// Heatdens text displayed.
	document.getElementById("heatdens").style.display='block';
	// TweetsInclude not displayed, as no longer required.
	document.getElementById("TweetsInclude").style.display='none';
	// ResetFunc() ran which resets all values of checked radio buttons to 0.
	ResetFunc();
	// WeightNoDisplay() ran which turns off display of all weight sliders and associated text.
	WeightNoDisplay(); 
}

// newHeat function, ran when the newHeatButton is clicked.
function newHeat() {
	// Display the resetcheck text, needed to make user aware building a new heat map will reset old one.
	document.getElementById("resetcheck").style.display='block';
	// Display yes button for them to confirm this.
	document.getElementById("yesbutton").style.display='block';
	// Display cancel button in case user has made a mistake.
	document.getElementById("CancelButton").style.display='block';
	// Turn off display of NewHeatButton as this is no longer required.
	document.getElementById("NewHeatButton").style.display='none';
	// Turn off display of userinfo.
	document.getElementById("userinfo").style.display='none';
	// Run ResetFunc() which resets all values of checked radio buttons to 0.
	ResetFunc();
	}

// ResetTweets function, ran in the tweets.html webpage when button clicked.
function ResetTweets() {
	// Will just display text in innerHTML telling user that they need to select tweets to see. Included for ease of use through testing the blank box did not look good and was unclear why it was there. 
	document.getElementById("tweet1").innerHTML=("This space will populate with Tweets when the dropdown buttons are used!");
}
// ShowTweets function, ran in the tweets.html webpage when button clicked.
function showTweets () {
	// Will reset the innerHTML to null, to remove the text added to tell the user what to do. 
	document.getElementById("tweet1").innerHTML=null;
	// If the dropdown selected was Friesdropdown.
	if (document.getElementById("tweetsdropdown1").value=="Friesdropdown") {
	//Add a title to the set of tweets appearing for better user experience.	
	document.getElementById("tweet1").innerHTML=("<br>"+"Fries Tweets Shown Below"+"<br>");
	//Call GEOJSON
	// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
	$.getJSON("fries.geojson", function(fries) {

      L.geoJson(fries, {
		// For each feature in the layer.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// Create Array called friesData
			var friesData = [];
			// Code adapted from: https://stackoverflow.com/questions/39924582/why-does-my-array-return-undefined-as-array-element
			// This code was required as previously the outputs from friesData were 'undefined', upon researching this code was found that waits upon the creation of async operation, and will only attempt to push all the data to the FriesData layer once it has done so. The previous error was a result of the program and asyncronous nature of it, storing data to the FriesData before it had been created.
			var p = new Promise(function(resolve, reject) {
			  // Runs the asyncPush function, using friesData, and its Text, and the promise keyword resolve, which will only run once the state returns as fulfilled.
			  asyncPush(friesData, feature.properties.Text, resolve);
			});
			// Set a to getData() function, which simply returns the friesData.As p is set as a promise, the data is wrapped in a promise that will wait until the calling function knows it has been completed. This prevents the data being displayed as Undefined.
			p.then(function() {
			  var a = getData();
			  // On return of the friesData, display this within the tweet1.innerHTML, but filter out any brackets inside the data, and attach a line break between each tweet for ease of reading by the user.
			  document.getElementById("tweet1").innerHTML+=(JSON.stringify(a).replace(/"]|[[]"/g, '<br>'));
			});
			// this function will set a Timeout to ensure the function waits before attempting to push the data to the friesData, using the cb or callback method to ensure this occurs.
			function asyncPush(a, val, cb) {
			  setTimeout(function() { a.push(val); cb(); }, 0);
			}
			// This function will simply return the friesData array when called.
			function getData() { return friesData; }
			// End of adaption
					}
				  }
      )

    });
	}
	if (document.getElementById("tweetsdropdown1").value=="Milkdropdown") {
	// Call GEOJSON	
	//Add a title to the set of tweets appearing for better user experience.	
	document.getElementById("tweet1").innerHTML=("<br>"+"Milk Tweets Shown Below"+"<br>");
	// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
	$.getJSON("milk.geojson", function(milk) {

      L.geoJson(milk, {
		// For each feature in the layer.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// Create Array called milkData
			var milkData = [];
			// Code adapted from: https://stackoverflow.com/questions/39924582/why-does-my-array-return-undefined-as-array-element
			// This code was required as previously the outputs from milkData were 'undefined', upon researching this code was found that waits upon the creation of async operation, and will only attempt to push all the data to the FriesData layer once it has done so. The previous error was a result of the program and asyncronous nature of it, storing data to the FriesData before it had been created.
			var p = new Promise(function(resolve, reject) {
			  // Runs the asyncPush function, using milkData, and its Text, and the promise keyword resolve, which will only run once the state returns as fulfilled.
			  asyncPush(milkData, feature.properties.Text, resolve);
			});
			// Set a to getData() function, which simply returns the milkData.As p is set as a promise, the data is wrapped in a promise that will wait until the calling function knows it has been completed. This prevents the data being displayed as Undefined.
			p.then(function() {
			  var a = getData();
			  // On return of the milkData, display this within the tweet1.innerHTML, but filter out any brackets inside the data, and attach a line break between each tweet for ease of reading by the user.
			  document.getElementById("tweet1").innerHTML+=(JSON.stringify(a).replace(/"]|[[]"/g, '<br>'));
			});
			// this function will set a Timeout to ensure the function waits before attempting to push the data to the milkData, using the cb or callback method to ensure this occurs.
			function asyncPush(a, val, cb) {
			  setTimeout(function() { a.push(val); cb(); }, 0);
			}
			// This function will simply return the milkData array when called.
			function getData() { return milkData; }
			// End of adaption
					}
				  }
      )

    });
	}
	
	if (document.getElementById("tweetsdropdown1").value=="Toiletdropdown") {
	//Add a title to the set of tweets appearing for better user experience.	
	document.getElementById("tweet1").innerHTML=("<br>"+"Toilet Tweets Shown Below"+"<br>");
	// Call GEOJSON	
	// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
	$.getJSON("toilet.geojson", function(toilet) {

      L.geoJson(toilet, {
		// For each feature in the layer.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// Create Array called toiletData
			var toiletData = [];
			// Code adapted from: https://stackoverflow.com/questions/39924582/why-does-my-array-return-undefined-as-array-element
			// This code was required as previously the outputs from toiletData were 'undefined', upon researching this code was found that waits upon the creation of async operation, and will only attempt to push all the data to the toiletData layer once it has done so. The previous error was a result of the program and asyncronous nature of it, storing data to the FriesData before it had been created.
			var p = new Promise(function(resolve, reject) {
			  // Runs the asyncPush function, using toiletData, and its Text, and the promise keyword resolve, which will only run once the state returns as fulfilled.
			  asyncPush(toiletData, feature.properties.Text, resolve);
			});
			// Set a to getData() function, which simply returns the toiletData.As p is set as a promise, the data is wrapped in a promise that will wait until the calling function knows it has been completed. This prevents the data being displayed as Undefined.
			p.then(function() {
			  var a = getData();
			  // On return of the toiletData, display this within the tweet1.innerHTML, but filter out any brackets inside the data, and attach a line break between each tweet for ease of reading by the user.
			  document.getElementById("tweet1").innerHTML+=(JSON.stringify(a).replace(/"]|[[]"/g, '<br>'));
			});
			// this function will set a Timeout to ensure the function waits before attempting to push the data to the toiletData, using the cb or callback method to ensure this occurs.
			function asyncPush(a, val, cb) {
			  setTimeout(function() { a.push(val); cb(); }, 0);
			}
			// This function will simply return the toiletData array when called.
			function getData() { return toiletData; }
			// End of adaption
					}
				  }
      )

    });
	}
if (document.getElementById("tweetsdropdown1").value=="Breaddropdown") {
	//Add a title to the set of tweets appearing for better user experience.	
	document.getElementById("tweet1").innerHTML=("<br>" + "Bread Tweets Shown Below" + "<br>");
	// Call GEOJSON	
	// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
	$.getJSON("bread.geojson", function(bread) {

      L.geoJson(bread, {
		// For each feature in the layer.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// Create Array called breadData
			var breadData = [];
			// Code adapted from: https://stackoverflow.com/questions/39924582/why-does-my-array-return-undefined-as-array-element
			// This code was required as previously the outputs from breadData were 'undefined', upon researching this code was found that waits upon the creation of async operation, and will only attempt to push all the data to the FriesData layer once it has done so. The previous error was a result of the program and asyncronous nature of it, storing data to the FriesData before it had been created.
			var p = new Promise(function(resolve, reject) {
			  // Runs the asyncPush function, using breadData, and its Text, and the promise keyword resolve, which will only run once the state returns as fulfilled.
			  asyncPush(breadData, feature.properties.Text, resolve);
			});
			// Set a to getData() function, which simply returns the breadData.As p is set as a promise, the data is wrapped in a promise that will wait until the calling function knows it has been completed. This prevents the data being displayed as Undefined.
			p.then(function() {
			  var a = getData();
			  // On return of the breadData, display this within the tweet1.innerHTML, but filter out any brackets inside the data, and attach a line break between each tweet for ease of reading by the user.
			  document.getElementById("tweet1").innerHTML+=(JSON.stringify(a).replace(/"]|[[]"/g, '<br>'));
			});
			// this function will set a Timeout to ensure the function waits before attempting to push the data to the breadData, using the cb or callback method to ensure this occurs.
			function asyncPush(a, val, cb) {
			  setTimeout(function() { a.push(val); cb(); }, 0);
			}
			// This function will simply return the breadData array when called.
			function getData() { return breadData; }
			// End of adaption
					}
				  }
      )

    });
	}
if (document.getElementById("tweetsdropdown1").value=="Coffeedropdown") {
	//Add a title to the set of tweets appearing for better user experience.	
	document.getElementById("tweet1").innerHTML=("<br>"+"Coffee Tweets Shown Below" +"<br>");
	// Call GEOJSON	
	// Code adapted from: https://gis.stackexchange.com/questions/74913/adding-pop-up-to-geojson-layer-in-leaflet
	$.getJSON("coffee.geojson", function(coffee) {

      L.geoJson(coffee, {
		// For each feature in the layer.
        onEachFeature: function(feature, layer) {
			// Code adapted from: https://gis.stackexchange.com/questions/246471/images-as-markers-for-geojson
			// Create Array called coffeeData
			var coffeeData = [];
			// Code adapted from: https://stackoverflow.com/questions/39924582/why-does-my-array-return-undefined-as-array-element
			// This code was required as previously the outputs from coffeeData were 'undefined', upon researching this code was found that waits upon the creation of async operation, and will only attempt to push all the data to the FriesData layer once it has done so. The previous error was a result of the program and asyncronous nature of it, storing data to the FriesData before it had been created.
			var p = new Promise(function(resolve, reject) {
			  // Runs the asyncPush function, using coffeeData, and its Text, and the promise keyword resolve, which will only run once the state returns as fulfilled.
			  asyncPush(coffeeData, feature.properties.Text, resolve);
			});
			// Set a to getData() function, which simply returns the coffeeData.As p is set as a promise, the data is wrapped in a promise that will wait until the calling function knows it has been completed. This prevents the data being displayed as Undefined.
			p.then(function() {
			  var a = getData();
			  // On return of the cofeeData, display this within the tweet1.innerHTML, but filter out any brackets inside the data, and attach a line break between each tweet for ease of reading by the user.
			  document.getElementById("tweet1").innerHTML+=(JSON.stringify(a).replace(/"]|[[]"/g, '<br>'));
			});
			// this function will set a Timeout to ensure the function waits before attempting to push the data to the cofeeData, using the cb or callback method to ensure this occurs.
			function asyncPush(a, val, cb) {
			  setTimeout(function() { a.push(val); cb(); }, 0);
			}
			// This function will simply return the coffeeData array when called.
			function getData() { return coffeeData; }
			// End of adaption
					}
				  }
      )

    });
	}
}