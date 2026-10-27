 import { renderForm } from "../ui/redender.js";
 import FlightSearch from "../models/FlightSearch.js";

 const response = await fetch('data/travel.json');
 const data     = await response.json();

 renderForm(data.airports);

