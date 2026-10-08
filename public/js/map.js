{/* let mapToken = mapToken;

    console.log(mapToken); */}

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',// container ID
    center: listing.geometry.coordinates, //starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});
console.log(coordinates);


const marker1 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)//listing.geometry.coordinates
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${listing.location}</h4><p>Welcome to Wanderlust</p>`)
    )
    .addTo(map);


