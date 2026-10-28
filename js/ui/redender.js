
export function renderForm(airports, onSearch) {
const searchForm = document.querySelector('#searchForm');
    
const fieldsetForm = document.createElement('fieldset');
fieldsetForm.setAttribute('class', 'fieldset-form');


// !---------BOTONES IDA , IDA Y VUELTA -----------------

const divButtons = document.createElement('div');
divButtons.setAttribute('class', 'form-buttons-trip');

const roundTripButton = document.createElement('button');
roundTripButton.setAttribute('type','button');
roundTripButton.setAttribute('id','round-trip');
roundTripButton.textContent = 'Ida y vuelta';


const oneTripButton = document.createElement('button');
oneTripButton.setAttribute('type','button');
oneTripButton.setAttribute('id','one-trip');
oneTripButton.textContent = 'Solo ida';

//!------------- BUSCADOR DE DESTINOS -------------------

const origenLabel = document.createElement('label');
origenLabel.textContent = 'Origen';
origenLabel.setAttribute('for', 'origin');

const origenInput = document.createElement('input');
origenInput.setAttribute('id', 'origin');
origenInput.setAttribute('list', 'cities');
origenInput.setAttribute('name', 'Origen');

const swapButton = document.createElement('button');
swapButton.setAttribute('type','button');
swapButton.setAttribute('id','swap');
swapButton.textContent = '⇄';

const destinyLabel = document.createElement('label');
destinyLabel.textContent = 'Destino';
destinyLabel.setAttribute('for', 'destination');

const destinyInput = document.createElement('input');
destinyInput.setAttribute('id', 'destination');
destinyInput.setAttribute('list', 'cities');
destinyInput.setAttribute('name', 'Destino');

//!----------------- FECHAS -----------------------------

const departureLabel = document.createElement('label');
departureLabel.textContent = 'Fecha de ida';
departureLabel.setAttribute('for', 'departureDate');

const departureInput = document.createElement('input');
departureInput.setAttribute('id', 'departureDate');
departureInput.setAttribute('type', 'date');

const returnDateLabel = document.createElement('label');
returnDateLabel.textContent = 'Fecha de vuelta';
returnDateLabel.setAttribute('for', 'returnDate');

const returnDateInput = document.createElement('input');
returnDateInput.setAttribute('id', 'returnDate');
returnDateInput.setAttribute('type', 'date');

returnDateInput.disabled = false;
returnDateInput.required = true;

let tripType = 'roundTrip';

//* IDA
    oneTripButton.addEventListener('click', () => { 
        tripType = 'oneWay';
        returnDateInput.disabled = true;
        returnDateInput.required = false;
        returnDateInput.value    = '';
        returnDateLabel.hidden   = true;
    });
//* IDA Y VUELTA
    roundTripButton.addEventListener('click', () => {
        tripType = 'roundTrip';
        returnDateInput.disabled = false;
        returnDateInput.required = true;
        returnDateLabel.hidden   = false;
    });

//!------------------ PASAJEROS --------------------------

const passengerLabel = document.createElement('label');
passengerLabel.textContent = 'Pasajeros';
passengerLabel.setAttribute('for', 'passenger');

const passengerInput = document.createElement('select');
passengerInput.setAttribute('id', 'passenger');
passengerInput.setAttribute('name', 'passenger');
for ( let i = 1; i <=9 ; i++) {
    const option = document.createElement('option');
    option.value = i ;
    option.textContent = `${i} ${i === 1 ? 'Pasajero' : 'Pasajeros'}`;
    passengerInput.append(option);
}
passengerLabel.append(passengerInput);

//!--------------- DIV para separar --------------------

const divButtonSubmit = document.createElement('div');
divButtonSubmit.setAttribute('class', 'formSubmit');


//!------------------- CHECKBOX -------------------------

const directLabel = document.createElement('label');

const directCheckbox = document.createElement('input');
directCheckbox.setAttribute('id','directCheckbox');
directCheckbox.setAttribute('type','checkbox');

directLabel.append(directCheckbox, ' Solo vuelos directos');

//!-------------------- ENVIAR --------------------------

const submitButton = document.createElement('button');
submitButton.setAttribute('type','submit');
submitButton.setAttribute('id','submit-form');
submitButton.textContent = 'Buscar Vuelos';

// submitButton.addEventListener('click', ()=> {

// })

//! -------------PARA EL CITYLIST -------------------------

const cityList = document.createElement('datalist');
cityList.id = 'cities';

airports.forEach(airport => {
    const option = document.createElement('option');
    option.value = airport.city;
    option.label = airport.iata;
    cityList.append(option);
});


//! -------------SEARCHFORM -------------------------------

divButtons.append(roundTripButton, oneTripButton);
divButtonSubmit.append(directLabel, submitButton);

//! -----------LABEL CONECT INPUT ------------------------

origenLabel.append(origenInput);
destinyLabel.append(destinyInput);
departureLabel.append(departureInput);
returnDateLabel.append(returnDateInput);

fieldsetForm.append (
    divButtons,
    cityList,
    origenLabel,
    swapButton,
    destinyLabel,
    departureLabel,
    returnDateLabel,
    passengerLabel,
    divButtonSubmit
)

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();                       //! Para que no se recarge la página     
     
//!--------- OBTENER CODIGO IATA LIMPIO  -------------

    function normalizeCity(city) {
        return city
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g,'')
    }
    const originName        = normalizeCity(origenInput.value);
    const destinationName   = normalizeCity(destinyInput.value);
    
    //! CIUDADES SELECCIONADAS

    if(!origenInput.value.trim() || !destinyInput.value.trim()) {
        alert('Selecciona una Ciudad');
        console.error('Selecciona una Ciudad');
        return
    };

    //! CODIGOS IATA

    const originAirport     = airports.find(
        (airport) => normalizeCity(airport.city) === originName
    );
    const destinationAirport = airports.find(
        (airport) => normalizeCity(airport.city) === destinationName
    );

    //! COMPROBACION DE CIUDADES

    if(!originAirport || !destinationAirport) {
        alert('Ciudad no disponible todavía');
        console.error('Ciudad no disponible todavía');
        return
    };

    //!CODIGOS IATA DIFERENTES

    const originIata        = originAirport.iata;
    const destinationIata   = destinationAirport.iata;

    if ( originIata === destinationIata) {
        alert('Codigos deben de ser diferentes');
        console.error('Codigos deben de ser diferentes');
        return
    };

    //! CIUDADES DIFERENTES

    // if(originName === destinationName) {
    //     console.error('Ciudades deben de ser diferentes')
    //     return
    // };

    //!  FECHA DE IDA SELECCIONADA

    const departureDate = departureInput.value;

    if(!departureDate) {
        alert('Selecciona fecha de ida');
        console.error('Selecciona fecha de ida');
        return
    }

    //! FECHA SELECCIONADA NO PASADA

    const now   = new Date();
    const today = [ 
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2,'0'),
        String(now.getDate()).padStart(2,'0')
    ].join('-');

    if(departureDate < today ) {
        alert('Fecha de ida no puede ser anterior a la de hoy');
        console.error('Fecha de ida no puede ser anterior a la de hoy');
        return
    }

    //! FECHA IDA > VUELTA

    if (!returnDateInput.disabled && returnDateInput.value < departureDate) {
        alert('Fecha de vuelta anterior a fecha de ida');
        console.error('Fecha de vuelta anterior a fecha de ida');
        return
    }


//! --------DATOS FORMULARIO ---------------------

    const searchCriteria = {
        origin:         originAirport.iata,
        destination:    destinationAirport.iata,
        departureDate:  departureInput.value,
        returnDate:     returnDateInput.disabled ? null : returnDateInput.value,
        tripType:       tripType,
        passengers:     Number(passengerInput.value),
        directOnly:     directCheckbox.checked
        
    }
    //console.log( searchCriteria );
    
    if (onSearch) {
        onSearch(searchCriteria);
    }
});

searchForm.append(fieldsetForm);
}; //* Fin Function


// console.log(typeof searchCriteria.departureDate);