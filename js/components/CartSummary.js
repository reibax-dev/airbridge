//CREAR EL RESUMEN DE LA COMPRA
function createCartSummary(trips, passengers = 1) {

    //CALCULAR PRECIOS (todo en céntimos, como flight.price)
    let outboundTotal = 0;
    let returnTotal = 0;

    trips.forEach(trip => {
        outboundTotal += trip.outbound.price * passengers;

        if (trip.returnFlight !== null) {
            returnTotal += trip.returnFlight.price * passengers;
        }
    });

    //Si el carrito está vacío no se cobran gastos
    let managementFee = 0;

    if (trips.length > 0) {
        managementFee = 500; //5,00€
    }

    const subtotal = outboundTotal + returnTotal;
    const total = subtotal + managementFee;


    //RESUMEN DE LA COMPRA
    const summary = document.createElement("aside");
    summary.classList.add("summary");
    summary.id = "cartSummary";

    //Título
    const summaryTitle = document.createElement("h2");
    summaryTitle.classList.add("summary__title");
    summaryTitle.textContent = "Resumen de la compra";


    //LISTA DE VUELOS
    const flightsList = document.createElement("ul");
    flightsList.classList.add("summary__list");

    //Fila vuelo de ida
    const outboundRow = document.createElement("li");
    outboundRow.classList.add("summary__row");

    const outboundLabel = document.createElement("span");
    outboundLabel.textContent = "Vuelo de ida";

    const outboundPrice = document.createElement("span");
    outboundPrice.id = "summaryOutboundPrice";
    outboundPrice.textContent = (outboundTotal / 100).toFixed(2) + "€";

    outboundRow.append(outboundLabel, outboundPrice);
    flightsList.append(outboundRow);

    //Fila vuelo de vuelta (solo si hay vuelta)
    if (returnTotal > 0) {
        const returnRow = document.createElement("li");
        returnRow.classList.add("summary__row");

        const returnLabel = document.createElement("span");
        returnLabel.textContent = "Vuelo de vuelta";

        const returnPrice = document.createElement("span");
        returnPrice.id = "summaryReturnPrice";
        returnPrice.textContent = (returnTotal / 100).toFixed(2) + "€";

        returnRow.append(returnLabel, returnPrice);
        flightsList.append(returnRow);
    }


    //LISTA DE SUBTOTAL Y GASTOS
    const costsList = document.createElement("ul");
    costsList.classList.add("summary__list");

    //Fila subtotal
    const subtotalRow = document.createElement("li");
    subtotalRow.classList.add("summary__row");

    const subtotalLabel = document.createElement("span");
    subtotalLabel.textContent = "Subtotal";

    const subtotalPrice = document.createElement("span");
    subtotalPrice.id = "summarySubtotal";
    subtotalPrice.textContent = (subtotal / 100).toFixed(2) + "€";

    subtotalRow.append(subtotalLabel, subtotalPrice);

    //Fila gastos de gestión
    const feesRow = document.createElement("li");
    feesRow.classList.add("summary__row");

    const feesLabel = document.createElement("span");
    feesLabel.textContent = "Gastos de gestión";

    const feesPrice = document.createElement("span");
    feesPrice.id = "summaryFees";
    feesPrice.textContent = (managementFee / 100).toFixed(2) + "€";

    feesRow.append(feesLabel, feesPrice);

    costsList.append(subtotalRow, feesRow);


    //TOTAL
    const totalSection = document.createElement("p");
    totalSection.classList.add("summary__total");

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total";

    const totalAmount = document.createElement("strong");
    totalAmount.id = "summaryTotal";
    totalAmount.textContent = (total / 100).toFixed(2) + "€";

    totalSection.append(totalLabel, totalAmount);


    //BOTÓN PAGAR
    const payButton = document.createElement("button");
    payButton.classList.add("summary__pay");
    payButton.id = "payButton";
    payButton.setAttribute("type", "button");

    //Icono tarjeta (los SVG necesitan createElementNS)
    const svgNS = "http://www.w3.org/2000/svg";

    const cardIcon = document.createElementNS(svgNS, "svg");
    cardIcon.setAttribute("viewBox", "0 0 24 24");
    cardIcon.setAttribute("width", "20");
    cardIcon.setAttribute("height", "20");
    cardIcon.setAttribute("aria-hidden", "true");

    const cardRect = document.createElementNS(svgNS, "rect");
    cardRect.setAttribute("x", "3");
    cardRect.setAttribute("y", "5");
    cardRect.setAttribute("width", "18");
    cardRect.setAttribute("height", "14");
    cardRect.setAttribute("rx", "2");

    const cardPath = document.createElementNS(svgNS, "path");
    cardPath.setAttribute("d", "M3 10h18M7 15h4");

    cardIcon.append(cardRect, cardPath);
    payButton.append(cardIcon, "Pagar");


    //APPEND FINAL DEL RESUMEN
    summary.append(
        summaryTitle,
        flightsList,
        costsList,
        totalSection,
        payButton
    );

    return summary;
}


export default createCartSummary;