import { cantGetUrlError } from "../components/Errors";



// OBTENER URLs API


async function getUrl(urlSection){


    const results=await fetch('https://airportmiles.com/api/v1/index.json');

    if(!results.ok){
        throw new cantGetUrlError;
    }

    const index=await results.json(); // SI el json no es valido, el error original se propaga
    const urls=index.files;

    return urls[urlSection];

}




// OBTENER IATAS DE LAS RUTAS 
// return "iata-iata"


async function getRouteIATA(iata1,iata2){

    const results=await fetch('https://airportmiles.com/api/v1/index.json');

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const index=await results.json();
    const routesIATA=index.routes;

    let iatas;
    for(const element of routesIATA){

        if( element.includes(iata1.toLowerCase()) 
            &&
            element.includes(iata2.toLowerCase())){

            iatas=element;

        }
    }

    return iatas;
}




// OBTENER RUTAS


async function getRoutes(iatas){

    const url=await getUrl("route");
    const results=await fetch(url.replace("{iata}-{iata}",iatas));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const routes=await results.json();

    return routes;

    
}




// OBTENER AEROPUERTOS


async function getAirports(iata){

    const url=await getUrl("airport");
    const results=await fetch(url.replace("{iata}",iata));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const airports=await results.json();

    return airports

    
}




// OBTENER CIUDADES


async function getCities(slug){

    const url=await getUrl("city");
    const results=await fetch(url.replace("{slug}",slug));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const cities=await results.json();

    return cities;

    
}




// OBTENER PAISES


async function getCountries(slug){

    const url=await getUrl("countrie");
    const results=await fetch(url.replace("{slug}",slug));

     if(!results.ok){
        throw new cantGetUrlError;
    }

    const countries=await results.json();

    return countries;

    
}
