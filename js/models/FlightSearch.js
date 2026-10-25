import Trip from "./Trip.js";
class FlightSearch{
    constructor(results=[]){
        this.results = results;
    }

    async loadResults(searchCriteria){
        //cargar travel.json mediante fetch
        //comprobamos que el servidor local (Live server) haya cargado correctamente nuestro travel.json
        try{
            const response = await fetch("./data/travel.json");

            if (!response.ok) {
                throw new Error("Error al cargar los viajes desde travel.json");
                
            }

            const data = await response.json();

            console.log(data.trips); // HACK

            //Buscar en data (que están los datos de travel.json) los viajes que coincidan con searchCriteria 
            //(searchCriteria es el objeto que tendrá los criterios que ha puesto el usuario en el formulario de la web)
            const foundTrips = data.trips.filter(trip =>{
            const foundOrigin = trip.outbound.origin === searchCriteria.origin;
            const foundDestination = trip.outbound.destination === searchCriteria.destination;
            const foundDepartureDate = trip.outbound.departureDate === searchCriteria.departureDate;
            const foundTripType = trip.tripType === searchCriteria.tripType;

            //directOnly - Si busca vuelos directos, o vuelos con o sin escalas
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
            if(searchCriteria.returnDate !== null){
                if(trip.returnFlight !== null){
                    foundReturnDate = trip.returnFlight.departureDate === searchCriteria.returnDate;
                }else{
                    foundReturnDate = false;
                }
            }

            return foundOrigin && 
                    foundDestination &&
                    foundDepartureDate &&
                    foundTripType &&
                    foundDirectOnly &&
                    foundReturnDate;
            });

            console.log(foundTrips); // HACK
            console.log("Origen buscado:", searchCriteria.origin); // HACK
            console.log("Destino buscado:", searchCriteria.destination); // HACK
            console.log("Viajes encontrados:", foundTrips); // HACK
            

            //completar la información del viaje
            //obtener de lo que se ha sacado de la API la info de aeropuerto y rutas


            //crear los objetos FlightRoute, y Trip con los datos combinados

            //guardar los viajes encontrados en this.results
            
        }catch (error){
            console.error("Error al obtener los resultados:",error);
            throw error;
            
        }


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