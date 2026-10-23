

// OBTENER URLs API


async function getUrl(urlSection){

    const results=await fetch('https://airportmiles.com/api/v1/index.json');
    const index=await results.json();
    const urls=index.files;

    return urls[urlSection];

}




// OBTENER IATAS DE LAS RUTAS 
// return "iata-iata"


async function getRouteIATA(iata1,iata2){

    const results=await fetch('https://airportmiles.com/api/v1/index.json');
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
    const routes=await results.json();

    return routes;

    
}




async function getDistance(routes){

    return routes.distance.km;


}













// OBTENER AEROPUERTOS


async function getAirports(iata){

    const url=await getUrl("airport");
    const results=await fetch(url.replace("{iata}",iata));
    const airports=await results.json();

    return airports

    
}




// OBTENER CIUDADES


async function getCities(slug){

    const url=await getUrl("city");
    const results=await fetch(url.replace("{slug}",slug));
    const cities=await results.json();

    return cities;

    
}




// OBTENER PAISES


async function getCountries(slug){

    const url=await getUrl("countrie");
    const results=await fetch(url.replace("{slug}",slug));
    const countries=await results.json();

    return countries;

    
}
