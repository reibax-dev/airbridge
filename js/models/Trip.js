import Flight from "./Flight.js";

class Trip {
  constructor(idTrip, tripType, outbound, totalPrice, returnFlight = null) {
    this.idTrip = idTrip;
    this.tripType = tripType;
    this.outbound = outbound; //objeto Flight de ida
    this.returnFlight = returnFlight; //objeto Flight de vuelta o null si no hay vuelta
    this.totalPrice = totalPrice; //precio del viaje por pasajero (en céntimos)
  }

  //Trip.fromJson organiza la creción del viaje completo (Trip)
  static fromJson(
    { idTrip, tripType, outbound, returnFlight, totalPrice },
    outboundRoute,
    returnRoute = null,
  ) {
    //Crear el objeto Fight de ida

    //Crear el objeto Fight de vuelta si hay vuelta

    //Crear el viaje completo con todo

    //devolver el objeto creado Trip
  }

  isRoundTrip() {
    //Vuelo de ida y vuelta: roundTrip. Vuelo de solo ida: oneWay
    return this.tripType === "roundTrip";
  }

  getTotalPrice(passengers) {
    return this.totalPrice * passengers;
  }

  hasStops() {
    //Comprobar si tiene escalas el vuelo
    if (!this.outbound.isDirect()) {
      //Tiene escalas, la ida no es directa
      return true;
    }

    if (this.returnFlight !== null && !this.returnFlight.isDirect()) {
      //Tiene escalas, la vuelta no es directa
      return true;
    }

    return false;
  }

  getTotalPriceEuro(passengers) {
    //Convertir el precio de céntimos a euros SOLO para mostrarlo.
    return (this.getTotalPrice(passengers) / 100).toFixed(2) + "€";
  }
}

export default Trip;
