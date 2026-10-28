//CREAR SECCIÓN DEL VUELO (Flight)
function createFlightSection(flight, leg) {

    //SECCIÓN DEL VUELO
    const flightSection = document.createElement("div");
    flightSection.classList.add("flight-card__details");
    flightSection.dataset.leg = leg;


    //HEADER
    const header = document.createElement("header");
    header.classList.add("flight-card__header");

    //Logo aerolínea
    const imgAirline = document.createElement("img");
    imgAirline.classList.add("flight-card__airline-logo");
    imgAirline.dataset.field = "airlineLogo";

    //seleccionar el logo según la aerolínea
    imgAirline.setAttribute("src", `assets/airlines/${flight.airline}.svg`);
    imgAirline.setAttribute("alt", `Logo de ${flight.airline}`);
    imgAirline.setAttribute("width", "48");
    imgAirline.setAttribute("height", "48");

    //Contenedor aerolínea
    const airlineSection = document.createElement("div");
    airlineSection.classList.add("flight-card__airline");

    //Nombre aerolínea
    const airlineName = document.createElement("h3");
    airlineName.classList.add("flight-card__airline-name");
    airlineName.dataset.field = "airlineName";
    airlineName.textContent = flight.airline;

    //Número de vuelo
    const airlineNumber = document.createElement("p");
    airlineNumber.classList.add("flight-card__flight-number");
    airlineNumber.dataset.field = "flightNumber";
    airlineNumber.textContent = flight.flightNumber;

    //Fecha
    const flightDate = document.createElement("time");
    flightDate.classList.add("flight-card__date");
    flightDate.dataset.field = "flightDate";
    flightDate.setAttribute("datetime", flight.departureDate);

    //Formatear fecha
    const date = new Date(flight.departureDate + "T12:00:00");

    flightDate.textContent = date.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    //Append del header
    airlineSection.append(airlineName, airlineNumber);
    header.append(imgAirline, airlineSection, flightDate);


    //RUTA DEL VUELO
    const routeSection = document.createElement("div");
    routeSection.classList.add("flight-card__route");


    //AEROPUERTO DE ORIGEN
    const originSection = document.createElement("div");
    originSection.classList.add("flight-card__airport");

    //Hora de salida
    const departureTime = document.createElement("time");
    departureTime.classList.add("flight-card__time");
    departureTime.dataset.field = "departureTime";
    departureTime.setAttribute("datetime", flight.departureTime);
    departureTime.textContent = flight.departureTime;

    //Código de origen
    const originCode = document.createElement("p");
    originCode.classList.add("flight-card__code");
    originCode.dataset.field = "originCode";
    originCode.textContent = flight.route.origin.codeAirport;

    //Nombre aeropuerto
    const originAirportName = document.createElement("p");
    originAirportName.classList.add("flight-card__airport-name");
    originAirportName.dataset.field = "originAirportName";
    originAirportName.textContent = flight.route.origin.nameAirport;

    //Origen
    const originLocation = document.createElement("p");
    originLocation.classList.add("flight-card__location");

    //Ciudad origen
    const originCity = document.createElement("span");
    originCity.dataset.field = "originCity";
    originCity.textContent = flight.route.origin.city;

    //PAís origen
    const originCountry = document.createElement("span");
    originCountry.dataset.field = "originCountry";
    originCountry.textContent = flight.route.origin.country;

    //Append del origen
    originLocation.append(originCity, ", ", originCountry);

    originSection.append(
        departureTime,
        originCode,
        originAirportName,
        originLocation
    );


    //LÍNEA CON ICONO DEL AVIÓN
    const flightLine = document.createElement("div");
    flightLine.classList.add("flight-card__line");

    const imgFlight = document.createElement("img");
    imgFlight.setAttribute("src", "assets/icons/avion.png");
    imgFlight.setAttribute("alt", "");
    imgFlight.setAttribute("width", "20");
    imgFlight.setAttribute("height", "20");

    flightLine.append(imgFlight);


    //AEROPUERTO DE DESTINO
    const destinationSection = document.createElement("div");
    destinationSection.classList.add(
        "flight-card__airport",
        "flight-card__airport--destination"
    );

    //Hora llegada
    const arrivalTime = document.createElement("time");
    arrivalTime.classList.add("flight-card__time");
    arrivalTime.dataset.field = "arrivalTime";
    arrivalTime.setAttribute("datetime", flight.arrivalTime);
    arrivalTime.textContent = flight.arrivalTime;

    //Código de vuelta
    const destinationCode = document.createElement("p");
    destinationCode.classList.add("flight-card__code");
    destinationCode.dataset.field = "destinationCode";
    destinationCode.textContent = flight.route.destination.codeAirport;

    //Nombre Aeropuerto destino
    const destinationAirportName = document.createElement("p");
    destinationAirportName.classList.add("flight-card__airport-name");
    destinationAirportName.dataset.field = "destinationAirportName";
    destinationAirportName.textContent = flight.route.destination.nameAirport;

    //Destino
    const destinationLocation = document.createElement("p");
    destinationLocation.classList.add("flight-card__location");

    //Ciudad de destino
    const destinationCity = document.createElement("span");
    destinationCity.dataset.field = "destinationCity";
    destinationCity.textContent = flight.route.destination.city;

    //País de destino
    const destinationCountry = document.createElement("span");
    destinationCountry.dataset.field = "destinationCountry";
    destinationCountry.textContent = flight.route.destination.country;

    //Append del destino
    destinationLocation.append(
        destinationCity,
        ", ",
        destinationCountry
    );

    destinationSection.append(
        arrivalTime,
        destinationCode,
        destinationAirportName,
        destinationLocation
    );

    //Append de la ruta completa
    routeSection.append(
        originSection,
        flightLine,
        destinationSection
    );


    //INFORMACIÓN DEL VUELO
    const cardInfo = document.createElement("ul");
    cardInfo.classList.add("flight-card__info");

    // Duración
    const infoItemDuracion = document.createElement("li");
    infoItemDuracion.classList.add("flight-card__info-item");
    infoItemDuracion.dataset.field = "duration";
    infoItemDuracion.textContent = flight.getFormattedDuration();

    // Escalas
    const infoItemStops = document.createElement("li");
    infoItemStops.classList.add("flight-card__info-item");
    infoItemStops.dataset.field = "stops";

    if (flight.isDirect()) {
        infoItemStops.textContent = "Directo";
    } else {
        infoItemStops.textContent = `${flight.stops} escala(s)`;
    }

    //Info Distancia
    const infoItemDistance = document.createElement("li");
    infoItemDistance.classList.add("flight-card__info-item");

    //Distancia KM
    const distanceKm = document.createElement("span");
    distanceKm.dataset.field = "distanceKm";
    distanceKm.textContent = flight.route.distanceKm ?? "—";

    infoItemDistance.append(distanceKm, " km");

    // Append de info
    cardInfo.append(
        infoItemDuracion,
        infoItemStops,
        infoItemDistance
    );


    //APPEND FINAL DEL VUELO
    flightSection.append(
        header,
        routeSection,
        cardInfo
    );

    return flightSection;
}

//CREAR BUTTON SELECCIONAR O ELIMINAR
function createButton(buttonText,action){
    const button = document.createElement("button");
    button.classList.add("flight-card__button");
    button.dataset.action = action;
    button.setAttribute("type", "button");

    if(action === "remove"){
        button.classList.add("flight-card__button--remove");
        button.textContent = buttonText;
        return button;
    }

    //icono check (solo se ve cuando el vuelo está seleccionado)
    const svgNS = "http://www.w3.org/2000/svg";

    const checkIcon = document.createElementNS(svgNS, "svg");
    checkIcon.classList.add("flight-card__button-check");
    checkIcon.setAttribute("viewBox", "0 0 24 24");
    checkIcon.setAttribute("width", "18");
    checkIcon.setAttribute("height", "18");
    checkIcon.setAttribute("aria-hidden", "true");

    const checkPath = document.createElementNS(svgNS, "path");
    checkPath.setAttribute("d", "M5 12l5 5L20 7");
    checkIcon.append(checkPath);

    //texto del botón
    const buttonLabel = document.createElement("span");
    buttonLabel.classList.add("flight-card__button-text");
    buttonLabel.textContent = buttonText;

    button.setAttribute("aria-pressed", "false");
    button.append(checkIcon, buttonLabel);

    return button;

}

//MARCAR EL BOTÓN COMO SELECCIONADO
function markButtonSelected(button) {
    button.setAttribute("aria-pressed", "true");
    button.querySelector(".flight-card__button-text").textContent = "Seleccionado";
}

//QUITAR LA SELECCIÓN DEL BOTÓN
function markButtonUnselected(button) {
    button.setAttribute("aria-pressed", "false");
    button.querySelector(".flight-card__button-text").textContent = "Seleccionar";
}

//CREAR LA TARJETA COMPLETA DE UN VIAJE (Trip)
function createFlightCard(trip,passengers = 1,action = "select") {

    const card = document.createElement("article");
    card.classList.add("flight-card");
    card.dataset.tripId = trip.idTrip;


    //VUELO DE IDA
    const outboundSection = createFlightSection(
        trip.outbound,
        "outbound"
    );

    //VUELO DE VUELTA
    let returnSection = null;

    if (trip.returnFlight !== null) {
        returnSection = createFlightSection(
            trip.returnFlight,
            "return"
        );
    }


    //PRECIO
    const priceSection = document.createElement("div");
    priceSection.classList.add("flight-card__price");

    const priceLabel = document.createElement("p");
    priceLabel.classList.add("flight-card__price-label");
    priceLabel.textContent = "Precio total";

    const priceAmount = document.createElement("p");
    priceAmount.classList.add("flight-card__price-amount");
    priceAmount.dataset.field = "price";
    priceAmount.textContent = trip.getTotalPriceEuro(passengers);

    //BOTÓN
    let buttonText = "Seleccionar";

    if (action === "remove") {
        buttonText = "Eliminar";
    }
    const button = createButton(buttonText,action);


    priceSection.append(
        priceLabel,
        priceAmount,
        button
    );


    //APPEND FINAL DE LA TARJETA
    card.append(outboundSection);

    if (returnSection !== null) {
        card.append(returnSection);
    }

    card.append(priceSection);

    return card;
}



export default createFlightCard;
export { markButtonSelected, markButtonUnselected };
