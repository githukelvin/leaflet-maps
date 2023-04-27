import ky from "./apikey.js";

let map = L.map('map')
map.setView([0,0],1);

let link = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
L.tileLayer(
//   `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${ky}`
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    
    attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom:18,
  }
).addTo(map);

navigator.geolocation.watchPosition(sucess,error);


function sucess(pos){
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const acc = pos.coords.accuracy
    // add custom marker 
    var myIcon = L.icon({
      iconUrl: "../images/icon-location.svg",
      iconSize: [50, 50]
    });

    // L.marker([50.505, 30.57], { icon: myIcon }).addTo(map);

    let marker =  L.marker([lat,lng],{icon: myIcon}).addTo(map);
    let circle= L.circle([lat,lng]).addTo(map);

    // fit bound
    map.fitBounds(circle.getBounds())


}

function error(err){
    if(err ===1){
        alert("You denied the permission");
    }
    else{
        alert("Unable to fetch the location");
    }
}