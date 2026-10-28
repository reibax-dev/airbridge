# MEMORIA TÉCNICA — AIRBRIDGE

**Buscador y simulador de selección de vuelos**  
**Proyecto grupal del bootcamp Full Stack · Grupo 4**  
**Tecnologías:** HTML5, CSS3, JavaScript (módulos ES), JSON y API AirportMiles.

---

## 1. Descripción del proyecto

AirBridge es una aplicación web de búsqueda de vuelos desarrollada como proyecto grupal. Permite introducir un origen y un destino, elegir fechas, pasajeros y modalidad de viaje, consultar combinaciones de vuelos de demostración, aplicar filtros y ordenaciones, seleccionar viajes completos y revisarlos en un carrito. El último paso es una simulación de compra, sin cobro real.

El proyecto **no comercializa billetes reales**. Su catálogo de itinerarios está definido en `data/travel.json`; la API externa **AirportMiles** se utiliza para enriquecer la información de aeropuertos y distancias, no para buscar inventario comercial ni precios actuales.

### 1.1 Objetivos de aprendizaje

- Construir una aplicación web multipágina con HTML, CSS y JavaScript sin un framework de interfaz.
- Modelar aeropuertos, rutas, vuelos, viajes, búsquedas y carrito mediante clases y métodos.
- Separar la obtención de datos, la lógica del dominio y la construcción dinámica del DOM.
- Usar eventos (`submit`, `click`, `input`, `change`) y validar criterios de búsqueda.
- Consumir JSON local y consultar un servicio externo asíncrono con `fetch` y `async/await`.
- Compartir información entre páginas mediante `sessionStorage`.
- Trabajar en equipo con Git, ramas y Pull Requests.

### 1.2 Alcance

| Dentro del alcance de esta versión | Fuera del alcance |
|---|---|
| Búsqueda de itinerarios simulados por origen, destino y fechas | Reserva real de plazas o emisión de billetes |
| Ida y vuelta y solo ida; pasajeros; opción de vuelos directos | Inventario y tarifas en tiempo real |
| Resultados en tarjetas, filtros por precio y escalas, orden por precio/duración | Filtro por compañía aérea en la interfaz actual |
| Selección, retirada de viajes, desglose y gasto de gestión | Pasarela bancaria y pagos reales |
| Consulta auxiliar de aeropuertos y distancias mediante AirportMiles | Inicio de sesión, sección de destinos, favoritos y reservas funcionales |

---

## 2. Actores

| Actor | Papel |
|---|---|
| **Usuario / viajero** | Introduce criterios, consulta resultados, selecciona o elimina viajes y activa la compra simulada. |
| **Aplicación AirBridge** | Valida, filtra, reconstruye objetos de dominio y gestiona las páginas y el almacenamiento temporal. |
| **Archivo `travel.json`** | Proporciona el conjunto local de aeropuertos y combinaciones de vuelos. |
| **Servicio AirportMiles** | Proporciona, cuando está disponible, nombres, ciudades, países y distancias de rutas. |

---

## 3. Requisitos

### 3.1 Requisitos funcionales

**Estado:** «Implementado» indica que se ha localizado código para esa función. No equivale a una auditoría de ejecución completa.

| ID | Requisito | Estado según código |
|---|---|---|
| RF-01 | Mostrar el formulario de búsqueda con origen, destino, fechas y pasajeros | Implementado (`redender.js`, `index.js`) |
| RF-02 | Seleccionar ida y vuelta o solo ida | Implementado (`redender.js`) |
| RF-03 | Comprobar ciudades válidas, diferentes y fechas coherentes | Implementado (`redender.js`) |
| RF-04 | Convertir el nombre de la ciudad a código IATA | Implementado (`redender.js`) |
| RF-05 | Guardar criterios y navegar a resultados | Implementado (`index.js`) |
| RF-06 | Filtrar viajes locales por criterio de búsqueda y vuelos directos | Implementado (`FlightSearch.js`) |
| RF-07 | Mostrar tarjetas con datos de vuelo, ida y vuelta si corresponde | Implementado (`FlightCard.js`) |
| RF-08 | Filtrar por precio y por escalas, y ordenar por precio/duración | Implementado (`results.js`, `FlightSearch.js`) |
| RF-09 | Seleccionar y deseleccionar viajes del carrito sin añadir duplicados nuevos | Implementado (`results.js`) |
| RF-10 | Representar viajes seleccionados y eliminarlos desde el carrito | Implementado (`shoppingCart.js`) |
| RF-11 | Mostrar subtotal, gastos de gestión y total | Implementado (`CartSummary.js`) |
| RF-12 | Realizar una confirmación de compra simulada y vaciar la selección | Implementado (`shoppingCart.js`) |
| RF-13 | Actualizar indicador numérico del carrito | Implementado (`CartBadge.js`) |
| RF-14 | Filtrar por compañía aérea | No incluido en los controles de resultados revisados |

### 3.2 Requisitos no funcionales

| ID | Criterio | Solución observada |
|---|---|---|
| RNF-01 | JavaScript modular y sin framework de interfaz | Archivos ES con `import`/`export`. |
| RNF-02 | Código separado por responsabilidades | Carpetas `models/`, `pages/`, `components/`, `services/`, `ui/`. |
| RNF-03 | Diseño adaptable | Estilos por página y hojas CSS compartidas; la respuesta visual requiere prueba en dispositivos. |
| RNF-04 | Importes coherentes | Los modelos almacenan precios en céntimos y la presentación muestra euros. |
| RNF-05 | Datos de búsqueda disponibles entre páginas | `sessionStorage` con la clave `searchCriteria`. |
| RNF-06 | Selecciones disponibles entre páginas de la misma sesión | `sessionStorage` con la clave `cartTrips`. |
| RNF-07 | Ejecución local desde un servidor | El uso de `fetch` para JSON requiere servir el proyecto, p. ej. Live Server. |

### 3.3 Historias de usuario

- **HU-01:** Como viajero, quiero buscar un itinerario entre dos ciudades para consultar opciones disponibles en los datos de demostración.
- **HU-02:** Como viajero, quiero elegir solo ida o ida y vuelta para ver tarjetas acordes a mi viaje.
- **HU-03:** Como viajero, quiero limitar el precio y las escalas para reducir los resultados.
- **HU-04:** Como viajero, quiero seleccionar una combinación completa para revisarla después en el carrito.
- **HU-05:** Como viajero, quiero eliminar opciones y conocer el total antes de simular la compra.

---

## 4. Reglas de negocio

| ID | Regla de AirBridge |
|---|---|
| RN-01 | El origen y el destino deben pertenecer a los aeropuertos disponibles y no pueden ser el mismo código IATA. |
| RN-02 | La fecha de ida no puede ser anterior al día actual; la vuelta no puede ser anterior a la ida. |
| RN-03 | En viajes `oneWay`, `returnDate` se guarda como `null`; en `roundTrip` se exige fecha de vuelta. |
| RN-04 | Los pasajeros se eligen mediante un desplegable de 1 a 9 y se convierten a número. |
| RN-05 | Una tarjeta `Trip` contiene siempre vuelo de ida y opcionalmente vuelo de vuelta. |
| RN-06 | La búsqueda de directos comprueba que la ida y, si existe, la vuelta no tengan escalas. |
| RN-07 | La selección del carrito se identifica mediante `idTrip` y no se añade de nuevo mientras ya esté almacenada. |
| RN-08 | Los precios de las clases `Flight` y `Trip` se almacenan en céntimos; se formatean en euros al mostrarlos. |
| RN-09 | La gestión de la compra es simulada: no se introduce información bancaria ni se realiza una transacción. |

---

## 5. Datos, servicio externo y mapeo

### 5.1 Fuente de viajes: `data/travel.json`

El archivo del proyecto contiene **15 aeropuertos y 99 viajes**: **47** de tipo `oneWay` y **52** `roundTrip`. Cada entrada de viaje reúne un identificador (`idTrip`), tipo (`tripType`), vuelo de ida (`outbound`), vuelo de vuelta opcional (`returnFlight`) y precio total (`totalPrice`). Los vuelos tienen códigos IATA, compañía, número de vuelo, fechas, horas, duración, escalas y precio.

La búsqueda se realiza **sobre este JSON local**. No debe confundirse con una búsqueda en una API de aerolíneas.

### 5.2 Datos complementarios: AirportMiles

`AirportMilesService.js` exporta cuatro funciones: `getUrl`, `getRouteIATA`, `getRoute` y `getAirport`. El servicio consulta un índice remoto y, según la petición, obtiene información de aeropuertos o rutas. `FlightSearch.loadResults()` intenta enriquecer la ruta mediante estas funciones y contempla valores de respaldo (`Airport` con código IATA y distancia desconocida) si las peticiones fallan.

### 5.3 Mapeo JSON → clases

| Origen | Destino del modelo | Transformación |
|---|---|---|
| `trip.idTrip` | `Trip.idTrip` | Se conserva el identificador. |
| `trip.tripType` | `Trip.tripType` | `oneWay` o `roundTrip`. |
| `trip.outbound` | `Trip.outbound` | Se crea un objeto `Flight` con `Flight.fromJson()`. |
| `trip.returnFlight` | `Trip.returnFlight` | Se crea `Flight` si hay vuelta; en caso contrario, `null`. |
| `trip.totalPrice` | `Trip.totalPrice` | Se convierte de euros a céntimos. |
| Datos de ruta y API | `FlightRoute` y `Airport` | Se asocian origen, destino y distancia disponible. |
| Selección de formulario | `searchCriteria` | Se normalizan ciudades, se resuelven IATA y se validan fechas. |

**Observación técnica:** los métodos `Flight.fromJson()` y `Trip.fromJson()` usan `parseInt(precio * 100)`. Para evitar posibles pérdidas de un céntimo por representación decimal, una mejora sería utilizar `Math.round(precio * 100)` y verificar los resultados con pruebas.

---

## 6. Diseño del modelo y de la interfaz

### 6.1 UML de clases

![Diagrama UML de clases de AirBridge](airbridge_memoria_assets/uml_clases.png)

La relación fundamental es `Trip → Flight`: cada viaje necesita un vuelo de ida y puede incorporar uno de vuelta. `Flight` tiene una `FlightRoute`, y cada ruta apunta a un aeropuerto de origen y otro de destino. `FlightSearch` administra resultados y `ShoppingCart` representa la gestión de las selecciones. `AirportMilesService` es un **módulo de funciones**, no una clase.

En el proyecto también se adjunta el diagrama UML editable original en `Doc/AirBridge_UML.md`, cuyo contenido se ha tomado como referencia. La imagen precedente es una representación compacta para facilitar su lectura en el PDF.

### 6.2 Boceto inicial de la interfaz

Las dos hojas **pertenecen al boceto inicial de AirBridge**, elaborado durante la fase de planificación.

<img src="airbridge_memoria_assets/boceto_inicial.jpg" alt="Boceto inicial de AirBridge: buscador, resultados, destinos y carrito" width="650" />

<img src="airbridge_memoria_assets/boceto_login_favoritos.jpg" alt="Boceto inicial de AirBridge: inicio de sesión, registro y favoritos" width="300" />

Ambas hojas recogen las propuestas de **buscador**, **resultados**, **destinos**, **carrito**, **inicio de sesión y creación de cuenta** y **favoritos**. Desde el boceto inicial se contemplaron un encabezado compartido, formularios, tarjetas de vuelos, controles de filtros y un resumen de compra. Finalmente se priorizó el desarrollo del buscador, los resultados y el carrito. Las secciones de **destinos, favoritos e inicio de sesión y registro** quedaron fuera del alcance de esta entrega y se mantienen como **posibles ampliaciones** del proyecto, no como funcionalidades implementadas.

### 6.3 Diagrama de flujo de navegación

![Flujo de navegación de AirBridge](airbridge_memoria_assets/flujo_navegacion.png)

El diagrama se incluye a partir de `Doc/Flujo de navegación de Airbridge.png`, presente en el proyecto. Representa la búsqueda, la validación, los resultados, la selección y el carrito. Los nombres reales de las páginas implementadas son **`index.html`**, **`results.html`** y **`shoppingCart.html`**. La memoria se refiere únicamente a filtros de precio y escalas y a ordenación por precio/duración; no se describe un filtro por aerolínea.

### 6.4 Organización de responsabilidades

| Capa | Archivos representativos | Responsabilidad |
|---|---|---|
| Modelo | `Airport.js`, `FlightRoute.js`, `Flight.js`, `Trip.js`, `FlightSearch.js`, `ShoppingCart.js` | Entidades, reglas, filtros y cálculos. |
| Datos y servicio | `travel.json`, `AirportMilesService.js` | Catálogo simulado e información complementaria externa. |
| Interfaz reutilizable | `FlightCard.js`, `CartSummary.js`, `CartBadge.js`, `redender.js` | Construcción de componentes y formulario. |
| Coordinación por página | `index.js`, `results.js`, `shoppingCart.js` | Inicio, renderizado, navegación y eventos. |
| Presentación | HTML, CSS, `assets/` | Estructura, aspecto visual e iconos. |

**Particularidad de la versión entregada:** `redender.js` no solo crea el formulario, sino que incluye su validación y prepara `searchCriteria`. `index.js` pasa una función de retorno (*callback*) que lo guarda y redirige al usuario a resultados.

---

## 7. Estructura y recorrido de la aplicación

### 7.1 Archivos principales

```text
airbridge/
├── index.html                 # formulario inicial
├── results.html               # resultados y filtros
├── shoppingCart.html          # carrito y pago simulado
├── data/travel.json           # viajes y aeropuertos ficticios
├── css/                       # estilos comunes y por página
├── assets/                    # imágenes, iconos y logotipos
├── Doc/                       # documentación y diagramas
└── js/
    ├── models/                # seis clases de dominio
    ├── components/            # tarjetas, resumen e indicador
    ├── services/              # AirportMilesService y archivo reservado
    ├── ui/redender.js         # creación y validación del buscador
    └── pages/                 # index.js, results.js, shoppingCart.js
```

### 7.2 `index.html`: buscador

`index.js` carga el catálogo de aeropuertos desde `travel.json`, invoca `renderForm(data.airports, onSearch)` y marca como obligatorios origen, destino y fecha de ida. En `redender.js` se normalizan los nombres de ciudades (`trim`, minúsculas y eliminación de tildes), se traducen a IATA y se aplican las comprobaciones de fechas y ciudades. Si la información es válida, el formulario entrega un objeto con exactamente siete campos.

```js
const searchCriteria = {
  origin: "BIO",
  destination: "VLC",
  departureDate: "2026-11-20",
  returnDate: "2026-11-27",
  tripType: "roundTrip",
  passengers: 1,
  directOnly: false
};
```

Los criterios se serializan con `JSON.stringify` bajo la clave `searchCriteria` en `sessionStorage`; a continuación se navega a `results.html`.

### 7.3 `results.html`: resultados, filtros y selección

`results.js` recupera `searchCriteria` y llama a `FlightSearch.loadResults()`. La clase filtra el catálogo local por origen, destino, fecha, modalidad, directos y fecha de vuelta. Las coincidencias se convierten a objetos `Trip` que alimentan `createFlightCard()`.

La página incluye un contador de resultados, ordenación por precio ascendente o descendente y por duración total, además de filtros por límite máximo de precio y por vuelos directos o con escalas. Al seleccionar una tarjeta, se añade o retira su `Trip` del almacenamiento `cartTrips`, comprobando `idTrip` para no agregarlo repetido. El botón cambia de aspecto y `CartBadge` actualiza el indicador.

### 7.4 `shoppingCart.html`: revisión y compra simulada

`shoppingCart.js` recupera `cartTrips` y reconstruye los prototipos de `Trip` y `Flight`, pues `JSON.stringify()` conserva datos pero no métodos de las clases. Para el listado reutiliza `createFlightCard(trip, passengers, "remove")`. El resumen lo genera `CartSummary.js`, separando los importes de ida y vuelta, subtotal, **5 € de gestión** (si hay selección) y total.

Al pulsar **Pagar**, el código vacía `cartTrips` y presenta un mensaje de compra completada. Es una **simulación local**: no existe pasarela, cargo bancario ni registro persistente de reservas.

---

## 8. Acceso a datos, estado y limitaciones

### 8.1 Persistencia temporal

La aplicación utiliza `sessionStorage`, no una base de datos. Destacan dos claves:

| Clave | Contenido | Páginas que la usan |
|---|---|---|
| `searchCriteria` | Criterios de búsqueda serializados | Buscador, resultados y carrito para pasajeros |
| `cartTrips` | Array de viajes seleccionados como JSON | Resultados, carrito e indicador |

Los datos están asociados a la sesión de la pestaña. La aplicación no gestiona cuentas ni sincroniza carritos entre dispositivos.

### 8.2 Gestión de fallos del servicio externo

`FlightSearch` intenta consultar los datos remotos mediante bloques `try/catch` separados. Si el servicio no devuelve los datos de origen, destino o distancia, mantiene los códigos IATA disponibles del catálogo local. Esta estrategia evita que la visualización de resultados dependa por completo de la API complementaria.

### 8.3 Restricciones observadas

- `Notification.js` y `StorageService.js` figuran en la estructura pero están vacíos en el proyecto; la aplicación utiliza `alert`, `console.error` y llamadas directas a `sessionStorage`.
- La clase `ShoppingCart` implementa operaciones y cálculo de total, pero la página del carrito opera principalmente con arrays serializados y `CartSummary.js`; **no se aprecia una instancia de `ShoppingCart` utilizada desde la interfaz actual**.
- El carrito utiliza el número de pasajeros del último `searchCriteria` guardado; seleccionar viajes en búsquedas diferentes con cantidades de pasajeros distintas puede requerir un modelo por selección.
- En `shoppingCart.js`, el listener de **Pagar** se registra en `renderCart()`, que se vuelve a ejecutar tras eliminar tarjetas. Conviene registrarlo una sola vez para evitar ejecuciones repetidas.
- Los filtros visibles se limitan a precio y escalas; la ordenación permite precio y duración. No se ha encontrado filtro por compañía.

---

## 9. Pruebas y comprobaciones

Se han revisado de manera estática las estructuras y condiciones del ZIP. La tabla siguiente propone un conjunto mínimo de pruebas de aceptación para la entrega; **no se marcan como superadas sin ejecutarlas en el navegador**.

| Nº | Acción de prueba | Resultado esperado | Evidencia en código |
|---|---|---|---|
| P-01 | Buscar Bilbao → Valencia, 20/11/2026–27/11/2026, ida y vuelta | Tarjetas correspondientes a la búsqueda local | `redender.js`, `FlightSearch.js` |
| P-02 | Introducir una ciudad inexistente | Aviso y cancelación de búsqueda | `redender.js` |
| P-03 | Usar origen y destino iguales | Aviso y cancelación | `redender.js` |
| P-04 | Introducir ida anterior a hoy o vuelta anterior a ida | No avanzar a resultados | `redender.js` |
| P-05 | Elegir solo ida | Se deshabilita la vuelta y se guarda `returnDate: null` | `redender.js` |
| P-06 | Marcar solo vuelos directos | Excluir viajes con escalas según criterio | `FlightSearch.js` |
| P-07 | Filtrar por precio y ordenar por duración | Actualizar tarjetas y contador | `results.js` |
| P-08 | Seleccionar dos veces la misma tarjeta | Seleccionar y después deseleccionar la opción | `results.js` |
| P-09 | Entrar en carrito y eliminar un viaje | Quitar tarjeta y recalcular resumen | `shoppingCart.js` |
| P-10 | Pulsar Pagar | Mensaje de confirmación y carrito vacío | `shoppingCart.js` |
| P-11 | Simular fallo de AirportMiles con viajes locales disponibles | Mostrar resultados con datos de respaldo cuando proceda | `FlightSearch.js` |
| P-12 | Abrir en móvil y escritorio | Comprobar lectura, navegación y controles | CSS y HTML del proyecto |

**Caso reproducible sobre el catálogo adjunto:** el conjunto local permite comprobar búsquedas por combinaciones de fechas y trayectos; los valores concretos de salida dependen del filtro aplicado. Conviene añadir a la entrega capturas de navegador de las pruebas ejecutadas por el equipo.

---

## 10. Decisiones técnicas y desarrollo en equipo

| Decisión | Justificación |
|---|---|
| Mantener `travel.json` como catálogo de pruebas | Permite un comportamiento reproducible, sin depender de datos comerciales cambiantes. |
| Utilizar AirportMiles solo para aeropuertos y distancias | Separa el inventario simulado de los datos geográficos complementarios. |
| Modelar una tarjeta por `Trip` | Mantiene unidos los vuelos de ida y vuelta de una misma selección. |
| Crear `FlightCard` reutilizable | Cambia el botón entre «Seleccionar» y «Eliminar» sin duplicar el componente. |
| Usar precios en céntimos | Facilita operaciones de suma y multiplicación antes del formato final. |
| Comunicar páginas con `sessionStorage` | Solución sencilla para un prototipo sin backend. |
| Separar archivos por página y por responsabilidad | Facilita repartir tareas y localizar código. |

El repositorio se trabajó de manera colaborativa con Git y Pull Requests. Como evidencia de proceso, la memoria incorpora el boceto inicial y los diagramas facilitados en `Doc/`. Para describir aportaciones individuales o planificación exacta por fechas sería necesario disponer de un registro validado del equipo; la memoria evita atribuciones personales no comprobadas.

---

## 11. Posibles ampliaciones y conclusiones

### 11.1 Mejoras priorizadas

1. **Registrar el evento Pagar una sola vez** y revisar el estado del botón tras cambios en el carrito.
2. **Unificar el cálculo monetario** entre el precio de `Trip`, los precios de sus vuelos y el resumen, con pruebas de céntimos y redondeo.
3. **Guardar pasajeros por selección** si el carrito admitirá viajes añadidos desde búsquedas diferentes.
4. **Centralizar el almacenamiento** en `StorageService.js` y sustituir las alertas por notificaciones accesibles.
5. **Completar pruebas automatizadas** de clases, filtros, validaciones y navegación.
6. **Incorporar el inicio de sesión y el registro de usuarios**, retomando el boceto inicial de correo electrónico, contraseña y creación de cuenta.
7. **Desarrollar la sección de destinos**, con fichas de destinos y navegación desde las propuestas visuales iniciales.
8. **Implementar favoritos**, permitiendo guardar y consultar viajes o destinos de interés, según el diseño preliminar.
9. **Ampliar la gestión de reservas** con historial de operaciones, si se incorporan cuentas y almacenamiento persistente.

### 11.2 Conclusión

AirBridge aplica de forma práctica la programación orientada a objetos, el manejo del DOM, el consumo de datos JSON y los flujos de navegación multipágina. La separación entre `Trip`, `Flight`, `FlightSearch` y los componentes de interfaz permite reutilizar la presentación de las selecciones en los resultados y el carrito. El uso de un catálogo local aporta reproducibilidad, mientras que AirportMiles complementa los datos sin convertirse en la fuente de precios.

La versión analizada demuestra una estructura de aplicación completa para una **simulación académica de búsqueda y selección de vuelos**, con áreas de mejora identificadas y documentadas. La memoria diferencia deliberadamente las funcionalidades presentes en el código de las pruebas de navegador que corresponden al equipo antes de la entrega.

---

### Fuentes de elaboración

- Código fuente, `README.md`, `data/travel.json` y carpeta `Doc/` de `airbridge`.
- Boceto inicial de AirBridge, fotografiado en dos hojas: buscador, resultados, destinos, carrito, inicio de sesión y favoritos.
- `memoria-tecnica_ejemplo.md`, utilizada exclusivamente como guía de organización y nivel técnico; sus funcionalidades de tienda no se han trasladado a AirBridge.
