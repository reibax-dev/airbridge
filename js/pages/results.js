import createFlightCard from "../components/FlightCard.js";
import FlightSearch from "../models/FlightSearch.js";

//contenedor de las tarjetas
const resultsContainer = document.getElementById("resultsContainer");

//recuperar los criterios de busqueda del index
const searchJson = sessionStorage.getItem("searchCriteria");

let searchCriteria = null

if (searchJson) {
    searchCriteria = JSON.parse(searchJson);
}

let passengers = 1;

if (searchCriteria !== null) {
    passengers = Number(searchCriteria.passengers);
}

initResults();


//mostrar tarjetas
function renderResults(trips, passengers = 1) {

    //vaciar los resultados anteriores
    resultsContainer.innerHTML = "";

    //recorrer los viajes
    trips.forEach(trip => {

        //crear una tarjeta para este viaje
        const card = createFlightCard(trip, passengers);

        //añadirla al contenedor
        resultsContainer.append(card);
    });
}

async function initResults() {

    if (searchCriteria === null) {
        console.log("No hay criterios de búsqueda guardados");
        return;
    }

    const flightSearch = new FlightSearch();
    await flightSearch.loadResults(searchCriteria);
    renderResults(flightSearch.results, passengers);
}