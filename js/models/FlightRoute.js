import { getRouteIATA, getRoutes } from "../services/AirportMilesService.js";
class FlightRoute {
    constructor(origin, destination, distanceKm = null) {
        //origin y destination son de tipo Airport

        this.origin = origin;
        this.destination = destination;
        this.distanceKm = distanceKm;
    }





    // Creacion de objeto FlightRote con la distancia calculada    

    static async createFlightRoute(origin,destination){

        const flight=new FlightRoute (origin,destination);
        flight.distanceKm=await flight.getDistanceKM();

        return flight;

    }



    //Obtner distancia entre origen y destino

    async getDistanceKM(){

        const iatas=await getRouteIATA(this.origin,this.destination);
        const route=await getRoutes(iatas);

        return route.distance.km ;

    }




}


export default FlightRoute;