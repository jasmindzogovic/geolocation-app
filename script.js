"use strict";

const map = L.map("map");

let marker, circle;

const tile = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "png",
  }
).addTo(map);

const geoLocation = () => {
  navigator.geolocation.watchPosition(
    (pos) => {

      const { latitude: lat, longitude: lng } = pos.coords;

      map.setView([`${lat}`, `${lng}`], 13);
      if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
      }

      marker = L.marker([lat, lng]).addTo(map);
      circle = L.circle([lat, lng]).addTo(map);

      marker.bindTooltip(
        `These are your current coordinates: Latitude ${lat.toFixed(
          5
        )}, Longitude ${lng.toFixed(5)}`,
        {
          permanent: true,
          className: "my-label",
          offset: [0, 0],
        }
      );
    },
    () => console.log(error)
  );
};

map.addEventListener("click", (e) => {
  const { lat, lng } = e.latlng;

  const newMarker = new L.marker(e.latlng).addTo(map);
  const newCircle = new L.circle(e.latlng).addTo(map);

  newMarker.bindTooltip(
    `These are your current coordinates: Latitude ${lat.toFixed(
      5
    )}, Longitude ${lng.toFixed(5)}`,
    {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    }
  );
});

geoLocation();
