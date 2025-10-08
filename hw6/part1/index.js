// Initialize and add the map
let map

async function initMap() {
    // The location of PFW
    const position = { lat: 41.118626975369125, lng: -85.10597318650548}
    
    // Request needed libraries
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps")
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
    map = new Map(document.getElementById("map"), {
        zoom: 14,
        center: position,
        mapId: "DEMO_MAP_ID",
    })

    // The marker, at PFW
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "PFW",
    })
}

initMap()