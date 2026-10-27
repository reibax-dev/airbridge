/* 
<section class="results" id="resultsContainer">
    <!-- Tarjeta con los datos de ida y/o vuelta -->
</section>
*/

//CREAR SECCIÓN DEL VUELO (Flight)
function createFlightCard(flight,leg) {

    const card = document.createElement("article");
    card.classList.add("flight-card");

    //CREAR la sección del vuelo de ida
    const outboundSection = document.createElement("div");
    outboundSection.classList.add("flight-card__details");
    outboundSection.dataset.leg = "outbound";

    //HEADER
    const header = document.createElement("header");
    header.classList.add("flight-card__header");

    //Logo Aerolinia
    const imgAirline = document.createElement("img");
    imgAirline.classList.add("flight-card__airline-logo");
    imgAirline.dataset.field = "airlineLogo";
    imgAirline.setAttribute('src','assets/airlines/Logo_Vueling.svg.webp');
    imgAirline.setAttribute('alt',`Logo de ${trip.outbound.airline}`);
    imgAirline.setAttribute('width','48');
    imgAirline.setAttribute('height','48'); 

    //contenedor aerolínea
    const airlineSection = document.createElement("div");
    airlineSection.classList.add("flight-card__airline");

    //Nombre aerolínea
    const airlineName = document.createElement("h3");
    airlineName.classList.add("flight-card__airline-name");
    airlineName.dataset.field="airlineName";
    airlineName.textContent = trip.outbound.airline;

    //Número de vuelo
    const airlineNumber = document.createElement("p");
    airlineNumber.classList.add("flight-card__flight-number");
    airlineNumber.dataset.field="flightNumber";
    airlineNumber.textContent = trip.outbound.flightNumber;

    //Fecha vuelo
    const flightDate = document.createElement("time");
    flightDate.classList.add("flight-card__date");
    flightDate.dataset.field = "flightDate";
    flightDate.setAttribute("datetime", flight.departureDate);
   
    //formatear fecha??

    //APPEND HEADER (de dentro hacia fuera)
    airlineSection.append(airlineName,airlineNumber)




    return card;
}

//CREAR LA TARJETA COMPLETA DE UN VIAJE (Trip)

export default createFlightCard;