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
    //Crear objeto Fight de ida
    const outboundFlight = Flight.fromJson(outbound,outboundRoute);

    //Crear el objeto Fight de vuelta si hay vuelta
    let hasReturnFlight = null;

    if (returnFlight !== null) {
      hasReturnFlight = Flight.fromJson(returnFlight,returnRoute);
    }

    //Convertir totalPrice de euros a céntimos
    const totalPriceCents = parseInt(totalPrice * 100);

    //Crear el viaje completo con todo (crear Trip)
    const trip = new Trip(
      idTrip,
      tripType,
      outboundFlight,
      totalPriceCents,
      hasReturnFlight
    );

    //devolver el objeto creado Trip
    return trip;
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
