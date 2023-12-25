//1. Global variables to hold the map and search box instances
let map, searchBox;
//2. Function to initialize the map
function initMap() {
  // Create a new map inside the 'map' div
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  // Get the input element for the location search
  let input = document.getElementById("location-input");
  // Create a search box linked to the input element
  searchBox = new google.maps.places.SearchBox(input);
}
// Event listener for the 'Find Location' button click

document.getElementById("find-location").addEventListener("click", function () {
  console.log("Button clicked");
  let places = searchBox.getPlaces();
  if (places.length === 0) {
    return;
  }
  let bounds = new google.maps.LatLngBounds();
  places.forEach(function (place) {
    if (!place.geometry) {
      return;
    }
    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.viewport);
    }
  });
  map.fitBounds(bounds);
});
