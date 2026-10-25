import { cantGetUrlError } from "../components/Errors.js";



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

    const route=await results.json();

    return route;

    
}




// OBTENER AEROPUERTO


async function getAirport(iata){

    const url=await getUrl("airport");
    const results=await fetch(url.replace("{iata}",iata));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const airport=await results.json();

    const airportJSON={codeAirport:airport.airport.iata,nameAirport:airport.airport.name,city:airport.airport.city,country:airport.airport.country.name};

    return airportJSON;

    
}






export{
    
    getUrl,
    getRouteIATA,
    getRoute,
    getAirport

}
















/* OBTENER CIUDADES


async function getCity(slug){

    const url=await getUrl("city");
    const results=await fetch(url.replace("{slug}",slug));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const cities=await results.json();

    return cities;

    
}
*/



/* OBTENER PAISES


async function getCountry(slug){

    const url=await getUrl("countrie");
    const results=await fetch(url.replace("{slug}",slug));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const countries=await results.json();

    return countries;

    
}
*/