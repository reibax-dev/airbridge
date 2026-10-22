class Trip {
    constructor(idViaje, tripType, outbound,totalPrice,returnFlight=null) {
        this.idViaje = idViaje;
        this.tripType = tripType;
        this.outbound = outbound;
        this.returnFlight = returnFlight;
        this.totalPrice = totalPrice;

    }

    isRoundTrip() {
        //Es ida y vuelta? Devolvemos Booleano
    }

    getTotalPrice(passengers) {
        //Precio total * pasajeros  
    }

    hasStops(){
        //Tiene escalas? Devolvemos Booleano
    }


}

export default Trip;