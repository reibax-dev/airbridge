/* TODO: Recoger los datos del formulario de búsqueda.
Crear el objeto searchCriteria con los valores introducidos 
en el formulario por el usuario.

Estructura que debe tener el objeto para que results.js
pueda recuperarlo y pasarlo a FlightSearch.loadResults(searchCriteria):

const searchCriteria = {
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: null,
    tripType: "", // "oneWay" o "roundTrip"
    passengers: 1,
    directOnly: false
};

Si el viaje es solo de ida, returnDate será null.

TODO: Guardar searchCriteria en sessionStorage
y redirigir al usuario a results.html. */