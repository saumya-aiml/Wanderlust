
// const coordinates = listing.geometry.coordinates;
console.log("Coordinates:", coordinates);


console.log("Map JS coordinates:", coordinates);
console.log("Coordinates type:", typeof coordinates);
console.log("Is array:", Array.isArray(coordinates));

mapboxgl.accessToken = mapToken;


const map = new mapboxgl.Map({
    container: "map",// container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates, //starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});
console.log(coordinates);


const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)//listing.geometry.coordinates
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${listing.location}</h4><p>Welcome to Wanderlust</p>`)
    )
    .addTo(map);



map.on("load", () => {
    console.log("Map successfully loaded!");
});

map.on("error", (e) => {
    console.error("Mapbox error:", e.error);
});

