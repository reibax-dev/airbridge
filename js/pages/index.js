 import { renderForm } from "../ui/redender.js";
 import FlightSearch from "../models/FlightSearch.js";

const response = await fetch("data/travel.json");
const data = await response.json();

renderForm(data.airports);
document.getElementById("origin").required = true;
document.getElementById("destination").required = true;
document.getElementById("departureDate").required = true;

//conectar el formulario con JS
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;
  
//obtener las ciudades introducidas
const originCity = document.getElementById("origin").value;
const destinationCity = document.getElementById("destination").value;

//buscar su IATA en travel.json
const originAirport = data.airports.find(airport => airport.city.toLowerCase() === originCity.trim().toLowerCase());

const destinationAirport = data.airports.find(airport => airport.city.toLowerCase() === destinationCity.trim().toLowerCase());

//comprobar que las ciudades existen
if (!originAirport || !destinationAirport) {
    console.error("El origen o destino no está disponible");
    isValid = false;
} else {
    if (originAirport.iata === destinationAirport.iata) {
        console.error("El origen y el destino no pueden ser iguales");
        isValid = false;
    } else {
        console.log("Origen y destino son diferentes");
    }
}

//Validar fechas
const departureDate = document.getElementById("departureDate").value;

const today = new Date();
const todayLocal = 
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");

if (departureDate < todayLocal) {
    console.error("La fecha de ida no puede ser anterior a hoy");
    isValid = false;
} else {
    console.log("Fecha de ida válida");
}


const returnDate = document.getElementById("returnDate").value;
const tripType = document.getElementById("returnDate").disabled
    ? "oneWay"
    : "roundTrip";

if (tripType === "roundTrip") {
    if (returnDate < departureDate) {
        console.error("La fecha de vuelta no puede ser anterior a la de ida");
        isValid = false;
    } else {
        console.log("Fecha de vuelta válida");
    }
}

//Validar pasajeros
const passengers = Number(document.getElementById("passenger").value);

if (!Number.isInteger(passengers) || passengers < 1) {
    console.error("El número de pasajeros no es válido");
    isValid = false;
} else {
    console.log("Número de pasajeros válido:", passengers);
}

if (isValid) {
    const searchCriteria = {
        origin: originAirport.iata,
        destination: destinationAirport.iata,
        departureDate: departureDate,
        returnDate: tripType === "oneWay" ? null : returnDate,
        tripType: tripType,
        passengers: passengers,
        directOnly: document.getElementById("directCheckbox").checked
    };

    console.log("Objeto searchCriteria:", searchCriteria);

    sessionStorage.setItem("searchCriteria",JSON.stringify(searchCriteria));
    window.location.href = "./results.html";

} else {
    console.error("Formulario inválido. No podemos continuar");
}

  // Comprobar los valores introducidos
  console.log("Origen:", document.getElementById("origin").value);
  console.log("Destino:", document.getElementById("destination").value);
  console.log("Fecha de ida:", document.getElementById("departureDate").value);
  console.log("Fecha de vuelta:", document.getElementById("returnDate").value);
  console.log("Pasajeros:", document.getElementById("passenger").value);
  console.log(
    "Solo directos:",
    document.getElementById("directCheckbox").checked,
  );
});
