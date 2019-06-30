  // Create the map object with options
  var map = L.map("map-id", {
    center: [33.6846, -117.8265],
    zoom: 3,
    // layers: [lightmap, weekEarthquakes]
  });

  // Create the tile layer that will be the background of our map
  // var lightmap = 
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    minZoom: 0,
    maxZoom: 12,
    id: "mapbox.dark",
    accessToken: API_KEY
  }).addTo(map);

  //url to geojson
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

  //Grab data with d3
  d3.json(url, function(response) {
    console.log(url)

    console.log(response.features.length)

    for (var i=0; i < response.features.length; i++){
      var geometry = response.features[i].geometry
      var long = geometry.coordinates[0]
      var lat = geometry.coordinates[1]
      var place = response.features[i].properties.place
      var title = response.features[i].properties.title
      var type = response.features[i].properties.type
      coordinates = [lat,long]
      console.log(coordinates,radius)

      //  test output
       //  console.log(geometry)
      var radius = response.features[i].properties.mag



      var circle = L.circle(coordinates,radius*20000).addTo(map);
        // , circleOptions
      //   var circleOptions = {
      //     color: getColor(radius),
      //     fillColor: getColor(radius),
      //     fillOpacity: 0.5
      //  }

 
      circle.bindPopup('<p>'+'Description: '+title+'<br>' +'Magnitude: '+radius+'<br>'+'Place: '+place +'<br>'+'Type: '+type+'</p>');
  }
    // Add baseLayers to map as control layers
    // Tile type: openstreetmap normal
    var openstreetmap = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 6
    })

    // Tile type: openstreetmap Hot
    var openstreetmapHot = L.tileLayer(
    'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 6
    })

// Tile type: openstreetmap Osm
  var openstreetmapOsm = L.tileLayer(
    'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 6
    })

    var allOptions = {
      "Open streetmap": openstreetmap,
      "Open streetmap: Hot": openstreetmapHot,
      "Open streetmap: Osm": openstreetmapOsm
    };

    // Initialize with openstreetmap
    openstreetmap.addTo(map);

// Add baseLayers to map as control layers
    L.control.layers(allOptions).addTo(map);


    map.addLayer(circle)
});



