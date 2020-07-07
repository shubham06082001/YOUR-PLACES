const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = process.env.GEOLOCATION_API_KEY;

async function getCoordsForAddresses(address) {
  //   return {
  //     lat: 40.71,
  //     lng: -73.98,
  //   };
  const response = await axios.get(
    `https://eu1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );

  const data = response.data;

  if (!data || !data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address",
      422
    );
    throw error;
  }
  var coordinates = { lat: data[0].lat, lng: data[0].lon };

  console.log("coordinates " + coordinates);
  console.log(coordinates.lat, coordinates.lng);

  return coordinates;
}

module.exports = getCoordsForAddresses;
