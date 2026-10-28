# AirBridge — Diagrama UML de clases (versión final)

Basado en los archivos `Airport.js`, `FlightRoute.js`, `Flight.js`, `Trip.js`, `FlightSearch.js`, `ShoppingCart.js` y `AirportMilesService.js` facilitados para el proyecto.

```mermaid
classDiagram
    direction LR
    class Airport {
        +codeAirport
        +nameAirport
        +city
        +country
        +constructor(codeAirport, nameAirport, city, country)
    }

    class FlightRoute {
        +origin
        +destination
        +distanceKm
        +constructor(origin, destination, distanceKm = null)
    }

    class Flight {
        +idFlight
        +route
        +airline
        +flightNumber
        +departureDate
        +departureTime
        +arrivalTime
        +durationMinutes
        +stops
        +price
        +constructor(...)
        +fromJson(data, route)$
        +isDirect()
        +getFormattedDuration()
        +getPriceEuro()
    }

    class Trip {
        +idTrip
        +tripType
        +outbound
        +returnFlight
        +totalPrice
        +constructor(...)
        +fromJson(data, outboundRoute, returnRoute)$
        +isRoundTrip()
        +getTotalPrice(passengers)
        +hasStops()
        +getTotalPriceEuro(passengers)
    }

    class FlightSearch {
        +results
        +constructor(results = [])
        +loadResults(searchCriteria)
        +filterByPrice(maxPrice, passengers)
        +filterByStops(stopType)
        +orderFlightByTime()
        +sortByPriceAscendant()
        +sortByPriceDescending()
    }

    class ShoppingCart {
        +itemsTrips
        +passengers
        +managementFee
        +constructor(itemsTrips = [], passengers = 1, managementFee = 500)
        +addTrip(trip)
        +removeTrip(idTrip)
        +getSubtotal()
        +getTotal()
        +clearCart()
        +checkTrip(idTrip)
    }

    class AirportMilesService {
        <<module>>
        +getUrl(urlSection)
        +getRouteIATA(iata1, iata2)
        +getRoute(iatas)
        +getAirport(iata)
    }

    FlightRoute "1" --> "1" Airport : origin
    FlightRoute "1" --> "1" Airport : destination
    Flight "1" --> "1" FlightRoute : route
    Trip "1" --> "1" Flight : outbound
    Trip "1" --> "0..1" Flight : returnFlight
    FlightSearch "1" --> "0..*" Trip : results
    ShoppingCart "1" --> "0..*" Trip : itemsTrips
    FlightSearch ..> AirportMilesService : usa funciones
    AirportMilesService ..> Airport : construye
    AirportMilesService ..> FlightRoute : construye
```

## Cómo interpretar el diagrama

- `+` representa un miembro público. Los métodos `fromJson()` de `Flight` y `Trip` son estáticos (`$` en Mermaid).
- `Trip` tiene **un vuelo de ida obligatorio** y **un vuelo de vuelta opcional**.
- `FlightRoute` referencia **dos aeropuertos**, cada uno con un papel propio: `origin` y `destination`.
- `FlightSearch` mantiene una colección de viajes (`results`), y `ShoppingCart` otra (`itemsTrips`).
- `AirportMilesService` es un **módulo de funciones asíncronas**, no una clase. Se representa como `<<module>>` para documentar sus dependencias.
- Las flechas representan referencias y usos del código; no indican herencia. Los atributos no llevan tipos estáticos porque el código JavaScript no los declara.
- `travel.json` se usa como fuente de datos, pero no se incluye como clase UML.

### Nota de alcance

Este es un **diagrama de clases y dependencias del modelo**, no un diagrama de navegación de páginas ni un diagrama de base de datos.
