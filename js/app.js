var map;



function initMap() {
    // Create new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.4383491,
            lng: -27.6328654
        },
        zoom: 8,
    });


    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.
    /*var locations = [
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
        ];*/
   

    function addNewMarker(title, coordinates) {

        var self = this;
        self.title = title;
        self.location = coordinates;
        self.description = ko.observable("Place");

        // Create a marker per location
        var marker = new google.maps.Marker({
            map: map,
            title: title,
            position: coordinates,
            animation: google.maps.Animation.DROP
        });

        var largeInfowindow = new google.maps.InfoWindow();

        // Add Other API = WIKI
        getAditionalInfo(self);

        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function () {
            addInfoWindow(this, largeInfowindow);
        });

        this.marker = marker;
    }

    
    
    function getAditionalInfo(markerObj) {
        // load wikipedia data
        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + markerObj.title + '&limit=1&format=json&callback=wikiCallback';
        
        var wikiRequestTimeout = setTimeout(function(){
            markerObj.description = "failed to get wikipedia resources";
        }, 8000);

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            jsonp: "callback",
            success: function( response ) {
                
                var articleList = response[1];

                //for (var i = 0; i < articleList.length; i++) {
                //    articleStr = articleList[i];
                //    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                //    $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
                //};

                clearTimeout(wikiRequestTimeout);
            }
        });        
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
            new addNewMarker("São Miguel Island", {lat: 37.754023 , lng: -25.463562}),
            new addNewMarker("Santa Maria Island", {lat: 36.969987 , lng: -25.094147}),
            new addNewMarker("Terceira Island", {lat: 38.711567 , lng: -27.211761}),
            new addNewMarker("Pico Island", {lat: 38.458226 , lng: -28.357086}),
            new addNewMarker("Faial Island", {lat: 38.580715 , lng: -28.692169}),
            new addNewMarker("São Jorge Island", {lat: 38.630081 , lng: -28.024750}),
            new addNewMarker("Graciosa", {lat: 39.049385 , lng: -28.011017}),
            new addNewMarker("Flores Island", {lat: 39.428039 , lng: -31.210785}),
            new addNewMarker("Corvo Island", {lat: 39.703291 , lng: -31.109161})
        ]);

    };
    
    ko.applyBindings(new ViewModel());
}




viewLocation = function() {
    this.marker.setAnimation(google.maps.Animation.BOUNCE);
    google.maps.event.trigger(this.marker, "click");
    // Some Timeout
    this.marker.setAnimation(null);
    
};


















