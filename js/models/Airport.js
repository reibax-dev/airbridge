
class Airport {
    constructor(codeAirport,nameAirport,city,country) {
        this.codeAirport = codeAirport;
        this.nameAirport = nameAirport;
        this.city = city;
        this.country = country;
    }



    static fromJson(json){
        const airport = new Airport(codeAirport,nameAirport,city,country);
        return airport;
    }

}

export default Airport;