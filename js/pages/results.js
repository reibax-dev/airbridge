import FlightSearch from "../models/FlightSearch.js";

const searchCriteria = {
    "origin": "BIO",
    "destination": "VLC",
    "departureDate": "2026-11-20",
    "returnDate": "2026-11-27",
    "tripType": "roundTrip",
    "passengers": 2,
    "directOnly": true
};

const flightSearch = new FlightSearch();

flightSearch.loadResults(searchCriteria);