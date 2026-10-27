import FlightRoute from "./FlightRoute.js";
import Trip from "./Trip.js";
import {
  getAirport,
  getRouteIATA,
  getRoute,
} from "../services/AirportMilesService.js";
import Airport from "./Airport.js";
class FlightSearch {
  constructor(results = []) {
    this.results = results;
  }

  async loadResults(searchCriteria) {
    //cargar travel.json mediante fetch
    //comprobamos que el servidor local (Live server) haya cargado correctamente nuestro travel.json
    try {
      const response = await fetch("./data/travel.json");

      if (!response.ok) {
        throw new Error("Error al cargar los viajes desde travel.json");
      }

      const data = await response.json();

      console.log(data.trips); // HACK

      //Buscar en data (que están los datos de travel.json) los viajes que coincidan con searchCriteria
      //(searchCriteria es el objeto que tendrá los criterios que ha puesto el usuario en el formulario de la web)
      const foundTrips = data.trips.filter((trip) => {
        const foundOrigin = trip.outbound.origin === searchCriteria.origin;
        const foundDestination =
          trip.outbound.destination === searchCriteria.destination;
        const foundDepartureDate =
          trip.outbound.departureDate === searchCriteria.departureDate;
        const foundTripType = trip.tripType === searchCriteria.tripType;

        //directOnly - Si busca vuelos directos, o no
        let foundDirectOnly = true;
        if (searchCriteria.directOnly) {
          //comprobamos si el vuelo de ida es directo. Si tiene escalas, foundDirectOnly será false.
          foundDirectOnly = trip.outbound.stops === 0;

          if (trip.returnFlight !== null) {
            //para aceptar el viaje (tanto de ida como de vuelta) deben de ser directas. Si una no lo es foundDirectOnly será false
            foundDirectOnly = foundDirectOnly && trip.returnFlight.stops === 0;
          }
        }

        //returnDate - Si busca ida y vuelta
        let foundReturnDate = true; //inicializamos a true porque si el usuario busca solo ida, no hay que comprobar la fecha de vuelta
        if (searchCriteria.returnDate !== null) {
          if (trip.returnFlight !== null) {
            foundReturnDate =
              trip.returnFlight.departureDate === searchCriteria.returnDate;
          } else {
            foundReturnDate = false;
          }
        }

        return (
          foundOrigin &&
          foundDestination &&
          foundDepartureDate &&
          foundTripType &&
          foundDirectOnly &&
          foundReturnDate
        );
      });

      //Si no hay viajes no necesitamos consultar a la API
      if(foundTrips.length === 0){
        this.results = [];
        return this.results;
      }

      console.log("Origen buscado:", searchCriteria.origin); // HACK
      console.log("Destino buscado:", searchCriteria.destination); // HACK
      console.log("Viajes encontrados:", foundTrips); // HACK
      console.log("Cantidad de viajes:", foundTrips.length); // HACK

      //Crear aeropuertos con los códigos de travel.json
      //(esto es por si falla la API tener los datos de travel y poder mostrar sin datos API)
      let originAirport = new Airport(searchCriteria.origin, null, null, null);
      let destinationAirport = new Airport(searchCriteria.destination,null,null,null);

      //crear ruta sin distancia (distancia será null por el constructor)
      const outboundRoute = new FlightRoute(originAirport, destinationAirport);

      ////// info API ///////

      //obtener aeropuerto de origen
      try {
        outboundRoute.origin = await getAirport(searchCriteria.origin);
      } catch (error) {
        console.warn("No se ha podido obtener el aeropuerto de origen:", error);
      }

      //obtener aeropuerto de destino
      try {
        outboundRoute.destination = await getAirport(searchCriteria.destination);
      } catch (error) {
        console.warn("No se ha podido obtener el aeropuerto de destino:", error);
      }

      //obtener distancia
      try {
        const iatas = await getRouteIATA(searchCriteria.origin,searchCriteria.destination);

        if (iatas) {
          const apiRoute = await getRoute(iatas);
          outboundRoute.distanceKm = apiRoute.distanceKm || null;
        }
      } catch (error) {
        console.warn("No se ha podido obtener la distancia:", error);
      }

      console.log("Ruta de ida:", outboundRoute);

      //PENDIENTE: Construir un FlightRoute para cada trayecto.

      //PENDIENTE: Crear los objetos Flight utilizando Flight.fromJson().

      //PENDIENTE: Crear los objetos Trip utilizando Trip.fromJson().

      //PENDIENTE: Guardar los objetos Trip en this.results.
    } catch (error) {
      console.error("Error al obtener los resultados:", error);
      throw error;
    }
  }

  //maxPrice debe recibirse en céntimos.
  //getTotalPrice(passengers) devuelve en céntimos.
  filterByPrice(maxPrice, passengers) {
    return this.results.filter(
      (trip) => trip.getTotalPrice(passengers) <= maxPrice,
    );
  }

  //Filtro: directo o escalas o todo
  filterByStops(stopType) {
    if (stopType === "direct") {
      return this.results.filter((trip) => !trip.hasStops());
    }

    if (stopType === "withStops") {
      return this.results.filter((trip) => trip.hasStops());
    }

    return this.results;
  }

  orderFlightByTime() {
    const totalDuration = (trip) => {
      let outboundTotalTime = trip.outbound.durationMinutes;
      let returnTotalTime = 0;

      if (trip.returnFlight !== null) {
        returnTotalTime = trip.returnFlight.durationMinutes;
      }

      return outboundTotalTime + returnTotalTime;
    };
    return [...this.results].sort(
      (a, b) => totalDuration(a) - totalDuration(b),
    );
  }

  sortByPriceAscendant() {
    //[...this.results] para conservar this.results porque sort mofifica el array original
    return [...this.results].sort((a, b) => a.totalPrice - b.totalPrice);
  }

  sortByPriceDescending() {
    //[...this.results] para conservar this.results porque sort mofifica el array original
    return [...this.results].sort((a, b) => b.totalPrice - a.totalPrice);
  }
}

export default FlightSearch;
