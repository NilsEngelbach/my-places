// Setup the map
const mymap = L.map("map").setView([51, 11], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(mymap);

// Initally get all places and display the markers
fetch("/api/v1/places")
  .then(response => response.json())
  .then(places => {
    places.forEach(place => {
      new L.Marker([place.lat, place.lng], {
        name: place.name,
        imageUrl: place.imageUrl,
        id: place._id
      })
        .on("click", markerOnClick)
        .addTo(mymap);
    });
  });

// Setup click listener to add new markers/places
mymap.on("click", e => {
  new L.Marker(e.latlng)
    .on("click", markerOnClick)
    .addTo(mymap)
    .fire("click");
});

// Build the popup menu and register event listeners
function markerOnClick(event) {

  const marker = event.target;

  if (marker.hasOwnProperty("_popup") && marker.getPopup().isOpen()) return;

  if (marker.hasOwnProperty("_popup")) marker.unbindPopup();

  marker
    .bindPopup(
      () => {
        return `
          <form id="form-${marker._leaflet_id}">
            <p>${marker.getLatLng()}</p>
            <label for="input-name-${marker._leaflet_id}">Name</label>
            <input id="input-name-${marker._leaflet_id}" type="text" value="${marker.options.name ? marker.options.name : ""}"/>
            <label for="input-image-url-${marker._leaflet_id}">Image Url</label>
            <input id="input-image-url-${marker._leaflet_id}" type="text" value="${marker.options.imageUrl ? marker.options.imageUrl : ""}"/>
            <img id="image-${marker._leaflet_id}" class="image" src="${marker.options.imageUrl ? marker.options.imageUrl : ""}"/>
            <button id="button-submit-${marker._leaflet_id}" type="button">Save Changes</button>
            <button id="button-delete-${marker._leaflet_id}" type="button">Delete Place</button>
          </form>`;
      },
      {
        closeButton: marker.options.id !== undefined,
        closeOnClick: false,
        autoClose: false
      }
    )
    .openPopup();

  L.DomEvent.addListener(
    L.DomUtil.get("input-image-url-" + marker._leaflet_id),
    "change",
    (e) => {
      L.DomUtil.get("image-" + marker._leaflet_id).src = e.target.value;
    }
  );

  L.DomEvent.addListener(
    L.DomUtil.get("button-submit-" + marker._leaflet_id),
    "click",
    (e) => {
      (marker.options.id !== undefined) ? updatePlace(marker) : createNewPlace(marker);
    }
  );

  L.DomEvent.addListener(
    L.DomUtil.get("button-delete-" + marker._leaflet_id),
    "click",
    (e) => {
      (marker.options.id !== undefined) ? deletePlace(marker) : mymap.removeLayer(marker);
    }
  );
}

function createNewPlace(marker) {
  return fetch("/api/v1/places", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: L.DomUtil.get("input-name-" + marker._leaflet_id).value,
      lat: marker.getLatLng().lat,
      lng: marker.getLatLng().lng,
      imageUrl: L.DomUtil.get("input-image-url-" + marker._leaflet_id).value
    })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("Please check your input");
      }
    })
    .then(place => {
      marker.options.id = place._id;
      marker.options.name = place.name;
      marker.options.imageUrl = place.imageUrl;
      marker.closePopup();
    });
}

function updatePlace(marker) {
  return fetch("/api/v1/places/" + marker.options.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: L.DomUtil.get("input-name-" + marker._leaflet_id).value,
      imageUrl: L.DomUtil.get("input-image-url-" + marker._leaflet_id).value
    })
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("Please check your input");
      }
    })
    .then(place => {
      marker.options.name = place.name;
      marker.options.imageUrl = place.imageUrl;
      marker.closePopup();
    });
}

function deletePlace(marker) {
  return fetch("/api/v1/places/" + marker.options.id, {
    method: "DELETE"
  }).then(response => {
    if (response.status === 200) {
      mymap.removeLayer(marker);
    } else {
      alert("There was an error deleting the place.");
    }
  });
}