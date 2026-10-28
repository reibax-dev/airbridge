import createFlightCard, { markButtonSelected, markButtonUnselected } from "../components/FlightCard.js";
import updateCartBadge from "../components/CartBadge.js";
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

//mostrar tarjetas
function renderResults(trips, passengers = 1) {

    //vaciar los resultados anteriores
    resultsContainer.innerHTML = "";

    //Viajes encontrados
    document.getElementById("resultsCount").textContent = trips.length;

    //recorrer los viajes
    trips.forEach(trip => {

        //crear una tarjeta para este viaje
        const card = createFlightCard(trip, passengers);

        const selectButton = card.querySelector('[data-action="select"]');

        //si el viaje ya está en el carrito, el botón sale ya seleccionado
        const savedTrips = JSON.parse(sessionStorage.getItem("cartTrips")) || [];

        if (savedTrips.some(savedTrip => savedTrip.idTrip === trip.idTrip)) {
            markButtonSelected(selectButton);
        }

        selectButton.addEventListener("click", () => {
            const cartTrips = JSON.parse(sessionStorage.getItem("cartTrips")) || []; //coger viajes del LocalStorage

            const alreadyExists = cartTrips.some(savedTrip => savedTrip.idTrip === trip.idTrip);

            if (alreadyExists) {
                //si ya estaba seleccionado, se quita del carrito
                const newCartTrips = cartTrips.filter(savedTrip => savedTrip.idTrip !== trip.idTrip);
                sessionStorage.setItem("cartTrips", JSON.stringify(newCartTrips));
                console.log("Viaje eliminado del carrito:", trip.idTrip);

                markButtonUnselected(selectButton);
            } else {
                cartTrips.push(trip);
                sessionStorage.setItem("cartTrips", JSON.stringify(cartTrips));
                console.log("Viaje añadido al carrito:", trip.idTrip);

                markButtonSelected(selectButton);
            }

            //actualizar el círculo del carrito
            updateCartBadge();
        });

        //añadirla al contenedor
        resultsContainer.append(card);
    });
}





//elementos de filtros y orden
const filtersForm = document.getElementById("filtersForm");
const sortSelect = document.getElementById("sortSelect");
const filtersButton = document.getElementById("filtersButton");
const filtersAside = document.getElementById("filters");
const priceRange = filtersForm.querySelector('[name="maxPrice"]');
const priceLabels = filtersForm.querySelectorAll(".filters__range-labels span");

const flightSearch = new FlightSearch();

//ordenar los resultados según el valor del select
function getSortedTrips() {
    if (sortSelect.value === "priceDesc") {
        return flightSearch.sortByPriceDescending();
    }

    if (sortSelect.value === "duration") {
        return flightSearch.orderFlightByTime();
    }

    return flightSearch.sortByPriceAscendant();
}

//aplicar filtros + orden y volver a pintar las tarjetas
function applyFiltersAndSort() {
    //el range está en euros y filterByPrice necesita céntimos
    const maxPrice = Number(priceRange.value) * 100;

    //radio seleccionado (si no hay ninguno, se muestran todos)
    const checkedStops = filtersForm.querySelector('[name="stops"]:checked');
    const stopType = checkedStops ? checkedStops.value : "all";

    const tripsByPrice = flightSearch.filterByPrice(maxPrice, passengers);
    const tripsByStops = flightSearch.filterByStops(stopType);

    //nos quedamos con los viajes ordenados que cumplen los dos filtros
    const trips = getSortedTrips().filter(trip =>
        tripsByPrice.includes(trip) && tripsByStops.includes(trip)
    );

    priceLabels[1].textContent = `${priceRange.value} €`;

    renderResults(trips, passengers);
}

//ajustar el range de precio a los resultados (precio total con pasajeros)
function setupPriceRange() {
    const prices = flightSearch.results.map(trip => trip.getTotalPrice(passengers) / 100);

    const minPrice = Math.floor(Math.min(...prices) / 10) * 10;
    const maxPrice = Math.ceil(Math.max(...prices) / 10) * 10;

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceRange.defaultValue = maxPrice; //para que "Limpiar filtros" vuelva al máximo

    priceLabels[0].textContent = `${minPrice} €`;
    priceLabels[1].textContent = `${maxPrice} €`;
}

//cambios en los filtros (range y radios)
filtersForm.addEventListener("input", applyFiltersAndSort);

//"Limpiar filtros": el reset cambia los valores después del evento,
//así que esperamos a que termine para volver a pintar
filtersForm.addEventListener("reset", () => {
    setTimeout(applyFiltersAndSort);
});

//cambio de orden
sortSelect.addEventListener("change", applyFiltersAndSort);

//abrir/cerrar filtros en móvil
filtersButton.addEventListener("click", () => {
    const isOpen = filtersAside.classList.toggle("filters--open");
    filtersButton.setAttribute("aria-expanded", isOpen);
});

async function initResults() {

    if (searchCriteria === null) {
        console.log("No hay criterios de búsqueda guardados");
        renderResults([], passengers);
        return;
    }

    await flightSearch.loadResults(searchCriteria);

    if (flightSearch.results.length > 0) {
        setupPriceRange();
    }

    applyFiltersAndSort();
}


updateCartBadge();
initResults();
