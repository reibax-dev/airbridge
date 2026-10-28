import createFlightCard from "../components/FlightCard.js";
import createCartSummary from "../components/CartSummary.js";
import Trip from "../models/Trip.js";
import Flight from "../models/Flight.js";
import updateCartBadge from "../components/CartBadge.js";

//contenedores de la página
const cartPage = document.querySelector(".cart-page");
const cartContainer = document.getElementById("cartContainer");
const cartCount = document.getElementById("cartCount");

//recuperar los criterios de busqueda (para saber los pasajeros)
const searchJson = sessionStorage.getItem("searchCriteria");

let searchCriteria = null;

if (searchJson) {
    searchCriteria = JSON.parse(searchJson);
}

let passengers = 1;

if (searchCriteria !== null) {
    passengers = Number(searchCriteria.passengers);
}

//recuperar los viajes del carrito
function getCartTrips() {
    const savedTrips = JSON.parse(sessionStorage.getItem("cartTrips")) || [];

    //Al guardarlos con JSON.stringify se pierden los métodos (isDirect, getTotalPriceEuro...)
    //así que les volvemos a poner su clase
    const trips = savedTrips.map(savedTrip => {
        const trip = Object.assign(Object.create(Trip.prototype), savedTrip);

        trip.outbound = Object.assign(Object.create(Flight.prototype), savedTrip.outbound);

        if (savedTrip.returnFlight !== null) {
            trip.returnFlight = Object.assign(Object.create(Flight.prototype), savedTrip.returnFlight);
        }

        return trip;
    });

    return trips;
}

//mostrar carrito
function renderCart(trips, passengers = 1) {

    //vaciar las tarjetas anteriores
    cartContainer.innerHTML = "";

    //quitar el resumen anterior (si existe)
    const oldSummary = document.getElementById("cartSummary");

    if (oldSummary !== null) {
        oldSummary.remove();
    }

    //Viajes en el carrito
    cartCount.textContent = trips.length;
    updateCartBadge();

    //Carrito vacío
    if (trips.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("cart__empty");
        emptyMessage.textContent = "Tu carrito está vacío";
        cartContainer.append(emptyMessage);
    }

    //recorrer los viajes
    trips.forEach(trip => {

        //crear una tarjeta para este viaje con el botón de eliminar
        const card = createFlightCard(trip, passengers, "remove");

        const removeButton = card.querySelector('[data-action="remove"]');

        removeButton.addEventListener("click", () => {
            const cartTrips = JSON.parse(sessionStorage.getItem("cartTrips")) || [];

            //quedarnos con todos menos el que se elimina
            const newCartTrips = cartTrips.filter(savedTrip => savedTrip.idTrip !== trip.idTrip);

            sessionStorage.setItem("cartTrips", JSON.stringify(newCartTrips));
            console.log("Viaje eliminado del carrito:", trip.idTrip);

            //volver a pintar el carrito
            renderCart(getCartTrips(), passengers);
        });

        //añadirla al contenedor
        cartContainer.append(card);
    });

    //resumen de la compra (va antes del botón de seguir buscando)
    const summary = createCartSummary(trips, passengers);
    cartContainer.after(summary);

    //BOTÓN PAGAR
    const payButton = document.getElementById("payButton");

    //con el carrito vacío no se puede pagar
    if (trips.length === 0) {
        payButton.disabled = true;
    }

    payButton.addEventListener("click", completePurchase);
}

//COMPRA COMPLETADA
function completePurchase() {

    //vaciar el carrito
    sessionStorage.removeItem("cartTrips");
    console.log("Compra completada");

    //volver a pintar el carrito (vacío) y quitar el resumen
    renderCart([], passengers);
    document.getElementById("cartSummary").remove();

    //mensaje de compra completada en lugar de "Tu carrito está vacío"
    cartContainer.innerHTML = "";
    cartPage.classList.add("cart-page--completed"); //para centrar el mensaje

    const successMessage = document.createElement("div");
    successMessage.classList.add("cart__success");
    successMessage.setAttribute("role", "status");

    const successTitle = document.createElement("h2");
    successTitle.classList.add("cart__success-title");
    successTitle.textContent = "¡Compra completada!";

    const successText = document.createElement("p");
    successText.textContent = "Tu pago se ha realizado correctamente. ¡Buen viaje!";

    successMessage.append(successTitle, successText);
    cartContainer.append(successMessage);
}

function initCart() {

    renderCart(getCartTrips(), passengers);

    //BOTÓN SEGUIR BUSCANDO VUELOS (solo se crea una vez)
    const continueLink = document.createElement("a");
    continueLink.classList.add("cart__continue");
    continueLink.setAttribute("href", "results.html");

    //Icono flecha
    const svgNS = "http://www.w3.org/2000/svg";

    const arrowIcon = document.createElementNS(svgNS, "svg");
    arrowIcon.setAttribute("viewBox", "0 0 24 24");
    arrowIcon.setAttribute("width", "18");
    arrowIcon.setAttribute("height", "18");
    arrowIcon.setAttribute("aria-hidden", "true");

    const arrowPath = document.createElementNS(svgNS, "path");
    arrowPath.setAttribute("d", "M19 12H5M11 6l-6 6 6 6");

    arrowIcon.append(arrowPath);
    continueLink.append(arrowIcon, "Seguir buscando vuelos");

    cartPage.append(continueLink);
}


initCart();