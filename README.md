# Nearby

Backend API for Nearby app's. 

## Development

La api está escita en node.js con sintaxis es2015.

### Databases

Debe crear el archivo index.js dentro de la carpeta config para realizar desarrollo. La estructura es la siguiente.
```sh

  export default {
    "dev": {
      "PORT": 3000,
      "DBHost": "mongodb://localhost/nearby"
    },
    "test": {
      "PORT": 3001,
      "DBHost": "mongodb://localhost/nearby-test"
    },
    "deploy": {
      "PORT": 3000,
      "DBHost": "mongodb://localhost/nearby"
    }
  }

```

## TODO
 - refact: endpoint createOfferForRequest debe aceptar imagenes [Multi-Form]
 - feat: Método de búsqueda de ceracnía en createRequest
 - feat: Método de notifiaciones de request en createRequest
 - feat: agregar user endponit para obtener requests activos
 - feat: agregar user endponit para obtener offers activas
