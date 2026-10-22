import FlightRoute from "./FlightRoute.js";

class Flight {
    constructor(idFlight, route, airline, flightNumber, departureDate, departureTime, arrivalTime, durationMinutes, stops, price) {

        this.idFlight = this.idFlight;
        this.route = route;
        this.airline = airline;
        this.flightNumber = flightNumber;
        this.departureDate = departureDate;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.durationMinutes = durationMinutes;
        this.stops = stops;
        this.price = price;

    }

    isDirect(){
    //es directo? Devolvemos booleano
    }

    getFormattedDuration(){
        //Formatear duracion vuelo
    }

    
}

export default Flight;