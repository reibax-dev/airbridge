class Flight {
  constructor(
    idFlight,
    route,
    airline,
    flightNumber,
    departureDate,
    departureTime,
    arrivalTime,
    durationMinutes,
    stops,
    price,
  ) {
    this.idFlight = idFlight;
    this.route = route; //objeto de la clase FlightRoute que contiene la información de origen, destino y distancia
    this.airline = airline;
    this.flightNumber = flightNumber;
    this.departureDate = departureDate;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.durationMinutes = durationMinutes;
    this.stops = stops;
    this.price = price;
  }
  //Crear un objeto Flight con los datos de travel.json
  static fromJson(
    {
      idFlight,
      airline,
      flightNumber,
      departureDate,
      departureTime,
      arrivalTime,
      durationMinutes,
      stops,
      price,
    },
    route,
  ) {
    const flight = new Flight(
      idFlight,
      route,
      airline,
      flightNumber,
      departureDate,
      departureTime,
      arrivalTime,
      durationMinutes,
      stops,
      parseInt(price * 100),
    );

    return flight;
  }

  isDirect() {
    //Sin escala, stops es igual a 0
    return this.stops === 0;
  }

  getFormattedDuration() {
    //Formatear duracion vuelo (viene en minutos)
    const horas = Math.floor(this.durationMinutes/60);
    const minutos = this.durationMinutes % 60;

    if (minutos === 0) {
        return `${horas}h`;
    }

    if (horas === 0) {
        return `${minutos}m`;
    }

    return `${horas}h ${minutos}m`;
  }

  getPriceEuro() {
    
    return (this.price / 100).toFixed(2) + "€";
  }
}


export default Flight;
