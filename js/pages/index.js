import { renderForm } from "../ui/redender.js";
import updateCartBadge from "../components/CartBadge.js";

//círculo con el número de viajes del carrito
updateCartBadge();

const response = await fetch("data/travel.json");
const data = await response.json();

//el formulario y su validación están en redender.js
//cuando la búsqueda es válida, renderForm nos devuelve el objeto searchCriteria
renderForm(data.airports, (searchCriteria) => {

    //guardar los criterios para recuperarlos en results.js
    sessionStorage.setItem("searchCriteria", JSON.stringify(searchCriteria));

    //ir a la página de resultados
    window.location.href = "./results.html";
});


document.getElementById("origin").required = true;
document.getElementById("destination").required = true;
document.getElementById("departureDate").required = true;

const params = new URLSearchParams(window.location.search);

//Cuando viene del botón modificar busqueda. PAra enseñar de nuevo la busqueda que había hecho
if (params.get("editar") === "1") {
    const savedSearch = sessionStorage.getItem("searchCriteria");

    if (savedSearch) {
        const criteria = JSON.parse(savedSearch);

        const cityByIata = (iata) => {
    const airport = data.airports.find(airport => airport.iata === iata);

    if (airport) {
        return airport.city;
    } else {
        return "";
    }
};

//recuperar las ciudades
document.getElementById("origin").value = cityByIata(criteria.origin);
document.getElementById("destination").value = cityByIata(criteria.destination);

//recuperar la fecha de ida
if (criteria.departureDate) {
    document.getElementById("departureDate").value = criteria.departureDate;
}

//recuperar el tipo de viaje y la fecha de vuelta
if (criteria.tripType === "oneWay") {
    document.getElementById("one-trip").click();
} else {
    document.getElementById("round-trip").click();

    if (criteria.returnDate) {
        document.getElementById("returnDate").value = criteria.returnDate;
    }
}

//recuperar el número de pasajeros
if (criteria.passengers) {
    document.getElementById("passenger").value = criteria.passengers;
} else {
    document.getElementById("passenger").value = 1;
}

//recuperar la opción de vuelos directos
if (criteria.directOnly === true) {
    document.getElementById("directCheckbox").checked = true;
} else {
    document.getElementById("directCheckbox").checked = false;
}

    }
}




