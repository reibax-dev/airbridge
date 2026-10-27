
class FlightRoute {
    constructor(origin, destination, distanceKM = null) {
        //origin y destination son de tipo Airport

        this.origin = origin;
        this.destination = destination;
        this.distanceKM = distanceKM;
    }

}


export default FlightRoute;