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
   

    function addNewMarker(title, coordinates) {

        var self = this;
        self.showLocation = ko.observable(true);
        self.title = title;
        self.location = coordinates;
        self.description = ko.observable("Marker Aditional Info");

        // Create a marker per location
        var marker = new google.maps.Marker({
            map: map,
            title: title,
            position: coordinates,
            animation: google.maps.Animation.DROP
        });

        var largeInfowindow = new google.maps.InfoWindow({maxWidth: 200});

        // Get aditional info from wikipedia
        getAditionalInfo(self);
        
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function () {
            addInfoWindow(this, largeInfowindow, self.description());
            marker.setAnimation(google.maps.Animation.BOUNCE);
        });
        
        
        this.marker = marker;
    }

    
    // Function to populate description info with wikipedia information based on the name of the marker
    function getAditionalInfo(markerObj) {
        // load wikipedia data
        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + markerObj.title + '&limit=1&format=json&callback=wikiCallback';
        
        var wikiRequestTimeout = setTimeout(function(){
            markerObj.description("failed to get wikipedia resources");
        }, 5000);

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            jsonp: "callback",
            success: function( response ) {
                // On Success grab description
                var description = response[2][0];
                // Add description to obj
                var infoAknow = "</br><strong>Information Provided by Wikipedia</strong>"
                markerObj.description(description + infoAknow);
                
                clearTimeout(wikiRequestTimeout);
            }
        });        
    }


    // This function populates the infowindow when the marker is clicked.
    function addInfoWindow(marker, infowindow, markerInfo) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div><strong><h3>' + marker.title + '</h3></strong></br><em>' + markerInfo + '</em></div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                // When closing info window stop animation as well
                infowindow.marker = null;
                marker.setAnimation(null);
            });
        }
    }


    var ViewModel = function() {
        var self = this;
        self.input = ko.observable();
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
        
        // Filter Locations based on User Input
        self.inputSearch = function() {
           self.locations().forEach(function(location) {
               if (location.title.toLocaleLowerCase().indexOf(self.input().toLocaleLowerCase()) === -1) {
                    location.marker.setVisible(false);
                    location.showLocation(false);
               } else  {
                    location.marker.setVisible(true);
                    location.showLocation(true);
               }
           });
        };
    };
    
    ko.applyBindings(new ViewModel());
}



// Clear All markers and Add Animation only on the one we clicked opening it to view its info
viewLocation = function() {
    this.marker.setAnimation(google.maps.Animation.BOUNCE);
    google.maps.event.trigger(this.marker, "click");
};