var map;

// Create a new blank array for all the listing markers.
var markers = [];


function initMap() {
    // Create new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.7449005,
            lng: -25.6664418
        },
        zoom: 15,
    });
}

    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.
    var locations = [
        {
            title: 'Park Ave Penthouse',
            location: {
                lat: 40.7713024,
                lng: -73.9632393
            }
        },
        {
            title: 'Chelsea Loft',
            location: {
                lat: 40.7444883,
                lng: -73.9949465
            }
        },
        {
            title: 'Union Square Open Floor Plan',
            location: {
                lat: 40.7347062,
                lng: -73.9895759
            }
        },
        {
            title: 'East Village Hip Studio',
            location: {
                lat: 40.7281777,
                lng: -73.984377
            }
        },
        {
            title: 'TriBeCa Artsy Bachelor Pad',
            location: {
                lat: 40.7195264,
                lng: -74.0089934
            }
        },
        {
            title: 'Chinatown Homey Space',
            location: {
                lat: 40.7180628,
                lng: -73.9961237
            }
        }
        ];
   

function addNewMarker(title, coordinates) {

    var self = this;
    self.title = title;
    self.location = coordinates;
    self.info = ko.observable("Place");
    self.visible = ko.observable(true);

    // Create a marker per location
    var marker = new google.maps.Marker({
        map: map,
        title: title,
        position: location,
        animation: google.maps.Animation.DROP,
    });

    var largeInfowindow = new google.maps.InfoWindow();

    // Add Other API = YELP INFO

    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function () {
        addInfoWindow(this, largeInfowindow);
    });
    
    this.marker = marker;
}



// This function populates the infowindow when the marker is clicked.
function addInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function () {
            infowindow.marker = null;
        });
    }
}


var ViewModel = function() {
    var self = this;
    
    // Create Marker Locations Array
    self.locations = ko.observableArray([
        new addNewMarker("Test 1", {lat: 37.739431 , lng: -25.663011})
    ]);
    
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
    
    
}
























