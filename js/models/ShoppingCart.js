import Trip from "./Trip.js";

class ShoppingCart {
    constructor(itemsTrips = [], passengers = 1, managementFee = 5) {
        this.itemsTrips = itemsTrips; // Array con los viajes que tiene el carrito
        this.passengers = passengers;
        this.managementFee = managementFee;
    }

    addTrip(trip) {
        //Para agregar viaje al carrito

        if(this.checkTrip(trip.idTrip)){
            //Ya existe el viaje en el carrito
            return false;
        }

        this.itemsTrips.push(trip);
        return true;
    }

    removeTrip(idTrip) {
        //Para eliminar viaje
        this.itemsTrips = this.itemsTrips.filter(
            trip => trip.idTrip !== idTrip
        );
    }

    getSubtotal() {
        //Calcular subtotal (sumar todos los viajes) y multiplicar por los pasajeros
        
    }


    getTotal(){
        //Suma subtotal+gastos de gestion
    }

    clearCart(){
        //Eliminar/vaciar carrito
    }

    checkTrip(idTrip){
        //Comprobar si existe el viaje
        return this.itemsTrips.some(trip => trip.idTrip === idTrip);


    }

    
}

export default ShoppingCart;