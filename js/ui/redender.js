
export function renderForm(airports) {
    
const fieldsetForm = document.createElement('fieltset');
fieldsetForm.setAttribute('class', 'fieltset-form');



// !---------BOTONES IDA , IDA Y VUELTA -----------------

const divButtons = document.createElement('div');
divButtons.setAttribute('class', 'form-buttons-trip');

const cityList = document.createElement('datalist');
cityList.id = 'cities';

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
returnDateLabel.textContent = 'Vuelta';
returnDateLabel.setAttribute('for', 'returnDate');

const returnDateInput = document.createElement('input');
returnDateInput.setAttribute('id', 'returnDate');
returnDateInput.setAttribute('type', 'date');

returnDateInput.disabled = false;
returnDateInput.required = true;
//* IDA
    oneTripButton.addEventListener('click', () => { 
        returnDateInput.disabled = true;
        returnDateInput.required = false;
        returnDateInput.value = '';
        returnDateLabel.hidden = true;
    });
//* IDA Y VUELTA
    roundTripButton.addEventListener('click', () => {
        returnDateInput.disabled = false;
        returnDateInput.required = true;
        returnDateLabel.hidden = false;
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

submitButton.addEventListener('click', ()=> {

})


//! -------------PARA EL CITYLIST -------------------------

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
    event.preventDefault(); //! Para que no se recarge la página 
    const searchForm = document.querySelector('#searchForm');
    
    const data = {
        origen:         origenInput.value.trim(),
        destiny:        destinyInput.value.trim(),
        departureDate:  departureInput.value,
        returnDate:     returnDateInput.disabled ? null : returnDateInput.value,
        passengers:     Number(passengerInput.value),
        onlyDirect:     directCheckbox.checked
        
    }
    console.log(data);
});

searchForm.append(fieldsetForm);
}; //* Fin Function
