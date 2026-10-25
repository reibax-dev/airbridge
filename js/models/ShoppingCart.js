class ShoppingCart {
    constructor(itemsTrips = [], passengers = 1, managementFee = 500) { //Gastos de gestión son 5€, ponemos 500 para guardarlos ya en céntimos
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
        return this.itemsTrips.reduce((acuPrice , trip) => trip.getTotalPrice(this.passengers  ) + acuPrice ,0) ;
    }
    

    getTotal(){
        //Suma subtotal+gastos de gestion
        
        if (this.itemsTrips.length === 0) {
            return 0;
        }
        return this.getSubtotal() + this.managementFee ;
    }

    clearCart(){
        //Eliminar/vaciar carrito
         this.itemsTrips.splice(0, this.itemsTrips.length) ;
         return this.itemsTrips.length ;
    }

    checkTrip(idTrip){
        //Comprobar si existe el viaje
        return this.itemsTrips.some(trip => trip.idTrip === idTrip);

    }    
}

export default ShoppingCart;