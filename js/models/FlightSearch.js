class FlightSearch{
    constructor(results=[]){
        this.results = results;
    }

    async loadResults(){
        //obtener los viajes disponibles de travel.json mediante fetch

        //seleccionar los que coincidan con lo que el usuario ha puesto/elegido

        //obtener de lo que se ha sacado de la API la info de aeropuerto y rutas

        //crear los objetos FlightRoute, Flight y Trip con los datos combinados

        //guardar los viajes encontrados en this.results
    }

    filterByPrice(maxPrice, passengers){
        return this.results.filter(trip => trip.getTotalPrice(passengers) <= maxPrice);
    }

    //Filtro: directo o escalas o todo
    filterByStops(stopType){
        if(stopType === "direct"){
            return this.results.filter(trip => !trip.hasStop());
        }

        if (stopType === "withStops") {
            return this.results.filter(trip => trip.hasStop());
        }

        return this.results;
    }

    //Quitar comparar por aerolinea
    filterByAirline(airline){
        return this.results.filter(trip => 
            trip.outbound.airline === airline ||
            (trip.returnFlight !== null && trip.returnFlight.airline === airline));

    }

    //Crear método por tiempo

    sortByPriceAscendant(){
        //[...this.results] para conservar this.results porque sort mofifica el array original
        return [...this.results].sort((a,b) => a.totalPrice - b.totalPrice);
    }

    sortByPriceDescending(){
        //[...this.results] para conservar this.results porque sort mofifica el array original
        return [...this.results].sort((a,b) => b.totalPrice - a.totalPrice);
    }



}

export default FlightSearch;