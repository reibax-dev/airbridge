async function getUrl(urlSection){

    const results=await fetch('https://airportmiles.com/api/v1/index.json');
    const index=await results.json();
    const urls=index.files;

    return urls[urlSection];

}

async function getAirports(iata){

    const url=await obtenerUrl("airport");
    const results=await fetch(url.replace("{iata}",iata));
    const airports=await results.json();

    return airports

    
}

async function getRoutes(iata1,iata2){

    const url=await getUrl("route");
    const results=await fetch(url.replace("{iata}-{iata}",iata1+"-"+iata2));
    const routes=await results.json();

    return routes;

    
}

async function getCities(slug){

    const url=await getUrl("city");
    const results=await fetch(url.replace("{slug}",slug));
    const cities=await results.json();

    return cities;

    
}

async function getCountries(slug){

    const url=await getUrl("city");
    const results=await fetch(url.replace("{slug}",slug));
    const countries=await results.json();

    return countries;

    
}
