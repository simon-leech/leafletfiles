Files included: 
wrag.html (webpage with the WRAG map displayed on it)
wrag.js (JavaScript file for the wrag.html webpage)
wrag.css (Cascading Style Sheet for the WRAG Map)
php_comments.php (PHP file to plot the comments from the PostgreSQL comments database)
php_trees.php (PHP file to plot the protected trees from the PostgreSQL protected_trees database)
php_markers.php (PHP file to plot the comments from the PostgreSQL markers database)
php_admin.php (PHP file to pull the administrator data into an array from the PostgreSQL admin database)
setData_comments2.php (PHP file to add a new comment to the PostgreSQL pendingcomments database)
setData_trees2.php (PHP file to add a new protected tree to the PostgreSQL protected_trees database)
setData_markers.php (PHP file to add a new marker to the PostgreSQL marker database)
remove_comment.php (PHP file to remove a comment from the PostgreSQL comments database)
remove_tree.php (PHP file to remove a protected tree from the PostgreSQL protected_trees database)
remove_markers.php (PHP file to remove a marker from the PostgreSQL markers database)
delete_stored_pending.php (PHP file to delete pendingcomments from the PostgreSQL pendingcomments database once they have been stored to PostgreSQL comments database)
remove_pendingcomment.php (PHP file to delete pending comments from the PostgreSQL pendingcomments database)
store_pendingcomments.php (PHP file to store pending comments to the PostgreSQL comments database)
leaflet.browser.min.js (JavaScript file for the Leaflet.Browser.Print plugin to function)
layers.png (PNG file of where to toggle layers on and off)
locatewrag.png (PNG file of the icon for locating the Woodhouse Ridge site)
login.JPG (JPG file of the icon to click to login)
print.JPG (JPG file of the icon to click to print)
geolocate.PNG (PNG file of the icon to click to geolocate yourself)
fontawesome folder (holds the files needed for the FontAwesomeIcons library to function).

What is expected when the website is run: 
The webpage will load with all the comments, protected trees, and markers displayed,with a map legend also. The user can click the map to add comments, or login to add comments, protected trees or markers, and delete any of these.