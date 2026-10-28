# AIRBRIDGE 		

##BUSCADOR DE VUELOS

Es un proyecto de buscar vuelos creado con HTML, CSS, y JAVASCRIPT.
Permite la simulación de introducir los datos de un viaje , consultar las opciones , filtrar y ordenar los resultados , seleccionar un viaje y almacenarlo en el carrito.


## FUNCIONALIDADES

Acciones en las tres páginas principales:

- Buscar viajes por origen, destino, fecha de salida, tipo de viaje y número de pasajeros.
- Validar el formulario y mostrar un aviso en consola cuando los datos no sean válidos.
- Consultar las combinaciones de vuelos de ida y, cuando corresponda, de vuelta.
- Ver opciones con horarios, compañía, escalas y precio.
- Filtrar por precio y por vuelos directos o con escalas.
- Ordenar los viajes por precio o duración.
- Añadir una opción completa al carrito, eliminarla y consultar el desglose del coste.
- Simular el pago y mostrar la confirmación correspondiente.

Los viajes de demostración se leen de `data/travel.json`. Los datos de aeropuertos y rutas se pueden consultar mediante AirportMiles, a través de `js/services/AirportMilesService.js`.

##  NAVEGACION

1. **Buscador (`index.html`):** se introducen origen, destino, fechas, pasajeros y tipo de viaje.
2. **Validación:** si faltan datos o son incorrectos, se muestra un aviso para corregir el formulario.
3. **Resultados (`results.html`):** se presentan las opciones encontradas. En ida y vuelta, cada tarjeta agrupa ambos vuelos; en solo ida, incluye el vuelo de salida.
4. **Selección:** se añade al carrito una opción completa.
5. **Carrito (`shoppingCart.html`):** se revisan los vuelos y el total, incluido el gasto de gestión.
6. **Pago simulado:** se confirma la operación de demostración y se vacía el carrito si corresponde.

La navegación compartida enlaza únicamente las páginas implementadas. Los otros enlaces de navegación y del pie de página son visuales o están fuera del alcance funcional de esta versión.

## ESTUCTURA

```text
AirBridge/
├── index.html                    # Buscador
├── results.html                  # Resultados y filtros
├── shoppingCart.html             # Carrito y simulación de pago
├── README.md
├── assets/                       # Logos, iconos, portadas e imágenes de aerolíneas
├── css/
│   ├── normalize.css
│   ├── variables.css             # Variables compartidas de estilo
│   ├── style.css                 # Estilos globales
│   ├── index.css
│   ├── results.css
│   └── shoppingCart.css
├── data/
│   ├── travel.json               # Combinaciones de viaje simuladas
│   └── airportmiles_pruebas.json # Datos locales de prueba
└── js/
    ├── components/
    │   ├── Errors.js             # Errores de la aplicación
    │   └── Notification.js       # Avisos para el usuario
    ├── models/
    │   ├── Airport.js            # Datos de un aeropuerto
    │   ├── Flight.js             # Datos y lógica de un vuelo
    │   ├── FlightRoute.js        # Ruta entre aeropuertos
    │   ├── FlightSearch.js       # Búsqueda, filtros y ordenación
    │   ├── ShoppingCart.js       # Selecciones y cálculo del carrito
    │   └── Trip.js               # Viaje de ida o ida y vuelta
    ├── pages/
    │   ├── index.js              # Lógica del buscador
    │   ├── results.js            # Lógica de resultados
    │   └── shoppingCart.js       # Lógica del carrito
    ├── services/
    │   ├── AirportMilesService.js # Consulta de aeropuertos y rutas
    │   └── StorageService.js      # Persistencia en el navegador
    └── ui/
        └── redender.js            # Renderizado de la interfaz
```

## CLASES

| Clase | Responsabilidad |
| --- | --- |
| `Airport` | Representa un aeropuerto y sus datos principales. |
| `FlightRoute` | Representa una ruta entre dos aeropuertos y su distancia. |
| `Flight` | Representa un vuelo asociado a una ruta. |
| `Trip` | Agrupa el vuelo de ida y, opcionalmente, el de vuelta; calcula el precio para los pasajeros. |
| `FlightSearch` | Carga y gestiona resultados, filtros y ordenación de viajes. |
| `ShoppingCart` | Añade y elimina viajes, evita duplicados y calcula subtotal y total con gastos de gestión. |

## EJECUCIÓN

Como la aplicación carga archivos JSON mediante `fetch`, hay que abrirla desde un servidor local y no directamente como archivo (`file://`). Por ejemplo, puedes usar **Live Server** desde Visual Studio Code:

1. Abre la carpeta `airbridge` en Visual Studio Code.
2. Inicia Live Server desde `index.html`.
3. Prueba el flujo de búsqueda, selección y carrito en el navegador.

## DATOS Y SERVICIOS

- **`data/travel.json`:** contiene viajes de demostración con horarios, compañías, fechas, precios y combinaciones de ida y vuelta.
- **AirportMiles:** proporciona información de aeropuertos y rutas. La integración está encapsulada en `AirportMilesService.js`.
- **`StorageService.js`:** centraliza el guardado y la recuperación de datos en el almacenamiento del navegador.

## FUERA DEL ALCANCE

- Inicio de sesión y creación de cuenta.
- Páginas funcionales de destinos populares y favoritos.
- Historial o página de reservas.
- Pasarela de pago y transacciones reales.



Proyecto grupal del bootcamp Full Stack — Grupo 4.
