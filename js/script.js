var map;

function initialize(){
	var lat = 5;
	var lng = -8;
	var latLng = new google.maps.LatLng(lat,lng);
	var mapOptions = {
		zoom: 1,
		center: latLng
	};
	
	map = new google.maps.Map(document.getElementById('map'),mapOptions);

	// User geolocation via GMaps API
	// More info: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(
			function(position){
				lat = position.coords.latitude;
				lng = position.coords.longitude;
				var pos = {
					lat: lat,
					lng: lng
				};
				map.setCenter(pos);
				map.setZoom(15);

				// Using GPlaces API with GMaps API
				// More info: https://developers.google.com/maps/documentation/javascript/places
				var request = {
					location: new google.maps.LatLng(lat,lng),
					radius: '5000',
					types: [
						'bar',
						'night_club'
					]
				};
				console.log(request);

				service = new google.maps.places.PlacesService(map);
				service.nearbySearch(request,callback);
			},
			function(){
				handleLocationError(true,map.getCenter());
			}
		);
	} else {
		handleLocationError(false,map.getCenter());
	}
}

function callback(results,status){
	if(status == google.maps.places.PlacesServiceStatus.OK){
		for(var i=0; i<results.length; i++){
			var place = results[i];
			console.log(place);
			createMarker(place);
		}
	}
}

function createMarker(place){
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	})
}

function handleLocationError(browserHasGeolocation, pos){
	if(browserHasGeolocation===true){
		console.log(pos,"geolocation service failed");
	} else {
		console.log(pos,"browser don't support geoloco");
	}
}

google.maps.event.addDomListener(window,'load',initialize);