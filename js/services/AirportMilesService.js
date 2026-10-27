import { cantGetUrlError } from "../components/Errors.js";
import Airport from "../models/Airport.js";
import FlightRoute from "../models/FlightRoute.js";



// OBTENER URL API


async function getUrl(urlSection){


    const results=await fetch('https://airportmiles.com/api/v1/index.json');

    if(!results.ok){
        throw new cantGetUrlError;
    }

    const index=await results.json(); // SI el json no es valido, el error original se propaga
    const urls=index.files;

    return urls[urlSection];

}




// OBTENER IATAS DE LA RUTA
// return "iata-iata"


async function getRouteIATA(iata1,iata2){

    const results=await fetch('https://airportmiles.com/api/v1/index.json');

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const index=await results.json();
    const routeIATA=index.routes;

    let iatas;
    for(const element of routeIATA){

        if( element.includes(iata1.toLowerCase()) 
            &&
            element.includes(iata2.toLowerCase())){

            iatas=element;

        }
    }

    return iatas;
}




// OBTENER RUTA

async function getRoute(iatas){

    const url=await getUrl("route");
    const results=await fetch(url.replace("{iata}-{iata}",iatas));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const routeJSON=await results.json();

    const route= new FlightRoute(routeJSON.from.iata,routeJSON.to.iata,routeJSON.distance.km);

    return route;

    
}




// OBTENER AEROPUERTO


async function getAirport(iata){

    const url=await getUrl("airport");
    const results=await fetch(url.replace("{iata}",iata));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const airportJSON=await results.json();

    const airport=new Airport(airportJSON.airport.iata,airportJSON.airport.name,airportJSON.airport.city,airportJSON.airport.country.name);
    

    return airport;

    
}






export{
    
    getUrl,
    getRouteIATA,
    getRoute,
    getAirport

}