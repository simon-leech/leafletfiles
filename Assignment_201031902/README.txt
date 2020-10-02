Files included: 
map.html (main map file, displays the map and form for weighting heat maps)
examples.html (webpage displaying examples of work created using the map.html page)
about.html (webpage outlining the use of the website and the python script used to generate the data)
tweet.html (webpage that enables the user to display tweets about the products)
bread.geojson (contains the bread tweets and their associated information)
milk.geojson (contains the milk tweets and their associated information)
toilet.geojson (contains the toilet tweets and their associated information)
fries.geojson (contains the fries tweets and their associated information)
coffee.geojson (contains the coffee tweets and their associated information)
style.css (stylesheet for the website)
map.htmlUML.jpeg (diagram showing the UML for the map.html webpage)
toggle.png (image of the button used to toggle layers on and off)
download.png (image of the button used to download the map)
website.js (Javascript file holding the JavaScript for the website)
bundle.js (JavaScript file holding the Javascript for the Leaflet.EasyPrint plugin)
leaflet-heat.js (Javascript file holding the JavaScript for the Leaflet.Heat Plugin)
heatmap.png (example of heat map created using the site)
leaflet.ajax.min.js (Javascript file holding the JavaScript for AJAX Plugin)
coffee.png (example of coffee layer output created using the site)
bread.png (example of bread layer output created using the site)
toileticon2.svg (icon to display on map)
breadicon.svg (icon to display on map)
coffeeicon2.svg (icon to display on map)
friesicon2.svg (icon to display on map)
milkicon2.svg (icon to display on map)

What is expected when the website is run: 
The map.html page will load a map with no popups displayed,as they are all initially turned off. This can be toggled using the controls. The form on the left of the page will allow the user to build a heat map and its weightings, and add this to the map. 
The about.html page will load two boxes filled with text, one to outline the importance of the site, and the other holding the python script used to collate the tweets.
The tweet.html page will load two boxes, one with a dropdown to select tweets to display, and one that holds those tweets once selected.
The examples.html page will load a slideshow of 3 images, to give the user examples of maps created on the site.

Known Errors: 
Currently, only one error is known; that when adding many layers to the weightings, the layer control button and its toggles may display or function incorrectly. This is due to the L.Heat plugin and has been previously reported by other users.
