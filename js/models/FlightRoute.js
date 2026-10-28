
class FlightRoute {
    constructor(origin, destination, distanceKm = null) {
        //origin y destination son de tipo Airport

        this.origin = origin;
        this.destination = destination;
        this.distanceKm = distanceKm;
    }

}


export default FlightRoute;