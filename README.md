# Nearby

Backend API for Nearby app's. 

## Development

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
