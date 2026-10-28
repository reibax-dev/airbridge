//CÍRCULO CON EL NÚMERO DE VIAJES DEL CARRITO

function updateCartBadge() {

    //enlace del carrito en el header
    const cartLink = document.querySelector('.header__net a[href="shoppingCart.html"]');

    if (cartLink === null) {
        return;
    }

    //viajes guardados en el carrito
    const cartTrips = JSON.parse(sessionStorage.getItem("cartTrips")) || [];

    //buscar el círculo y si no existe lo creamos
    let badge = cartLink.querySelector(".header__cart-badge");

    if (badge === null) {
        badge = document.createElement("span");
        badge.classList.add("header__cart-badge");
        cartLink.classList.add("header__cart-link");
        cartLink.append(badge);
    }

    badge.textContent = cartTrips.length;

    //si el carrito está vacío no se muestra el círculo
    badge.hidden = cartTrips.length === 0;
}

export default updateCartBadge;
