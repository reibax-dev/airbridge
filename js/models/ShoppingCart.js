import Trip from "./Trip.js";

class ShoppingCart {
    constructor(itemsTrips, passengers, managementFee=5) {
        this.itemsTrips = itemsTrips;
        this.passengers = passengers;
        this.managementFee = managementFee;
    }

    addTrip(trip) {
        //Para agregar viaje
    }

    removeTrip(idTrip) {
        //Para eliminar viaje
    }

    getSubtotal() {
        //Calcular subtotal (sumar todos los viajes)
    }


    getTotal(){
        //Suma subtotal+gastos de gestion
    }

    clearCart(){
        //Eliminar/vaciar carrito
    }

    
}

export default ShoppingCart;