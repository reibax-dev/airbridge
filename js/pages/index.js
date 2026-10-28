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