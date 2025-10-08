function initialize() {
    const ftWayne = { lat: 41.1168, lng: -85.1085 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: ftWayne,
      zoom: 14,
    });
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: ftWayne,
        pov: {
          heading: 34,
          pitch: 10,
        },
      },
    );
  
    map.setStreetView(panorama);
  }
  
  window.initialize = initialize;