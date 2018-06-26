# Luis.ai batch validator

Este proyecto toma un archivo de texto con un formato especifico y hace llamadas concurrentes a Luis para obtener la intención detectada en cada caso

## Getting Started

Toma en consideración que este proyecto imprime en el standar output, por tal motivo quizas tengas que correr la aplicación de la siguiente forma:

```
node index > out.txt
```

### Prerequisites

Necesitas tener un .env file con las siguientes definiciones:

```
LuisAppId=[YOUR_LUIS_APP_ID]
LuisAPIKey=[YOUR_LUIS_API_KEY]
LuisAPIHostName=eastus2.api.cognitive.microsoft.com

RequestDelay=200
```

### Installing

Nada especial

Instala los paquetes definidos

```
npm install
```

y corre la aplicación

```
node index > out.txt
```


## Built With

* [async](https://www.npmjs.com/package/async) - Para hacer llamadas a Luis en serie.
* [line-by-line](https://www.npmjs.com/package/line-by-line) - Usado para leer el input file.
* [dotenv](https://www.npmjs.com/package/dotenv) - Manejo de variables de entorno.
* [request](https://www.npmjs.com/package/request) - Como cliente HTTP.

## Authors

* **Luis Izaguirre** - *@lsizaguirre* - [GitHub](https://github.com/lsizaguirre)it/)