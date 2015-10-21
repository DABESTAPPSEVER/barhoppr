var map, service;
var markers = [];

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
				service = new google.maps.places.PlacesService(map);
				map.addListener('idle',performSearch);
				// console.log('search performed');
			},
			function(){
				handleLocationError(true,map.getCenter());
			}
		);
	} else {
		handleLocationError(false,map.getCenter());
	}
}

function performSearch(){
	var request = {
		// bounds: map.getBounds(),
		location: map.getCenter(),
		radius: 1000,
		types: [
			'bar',
			'night_club'
		]
	};
	// console.log(map);
	deleteMarkers()
	service.radarSearch(request,callback);
}

function callback(results,status){
	if(status == google.maps.places.PlacesServiceStatus.OK){
		for(var i=0; i<results.length; i++){
			var place = results[i];
			// console.log(place);
			addMarker(place);
		}
	}
}

function addMarker(place){
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker,'click',function(){
		service.getDetails(place, function(result,status){
			if(status!==google.maps.places.PlacesServiceStatus.OK){
				console.error(status);
				return;
			}

			var lat = result.geometry.location.lat();
			var lng = result.geometry.location.lng();
			var obj = {
				lat: lat,
				lng: lng
			};
			$.get('/bar?lat='+lat+'&lng='+lng,function(data){
				console.log(data);
			})
		});
	});

	markers.push(marker);
}

function deleteMarkers(){
	for(var i=0; i<markers.length; i++){
		markers[i].setMap(null);
	}
	markers = [];
}

function handleLocationError(browserHasGeolocation, pos){
	if(browserHasGeolocation===true){
		console.log(pos,"geolocation service failed");
	} else {
		console.log(pos,"browser don't support geoloco");
	}
}

google.maps.event.addDomListener(window,'load',initialize);