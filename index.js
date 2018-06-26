let LineByLineReader = require('line-by-line');
let async = require('async');
let request = require('request');

require('dotenv').config();

let luisAppId = process.env.LuisAppId;
let luisAPIKey = process.env.LuisAPIKey;
let luisAPIHostName = process.env.LuisAPIHostName;
let requestDelay = process.env.RequestDelay;

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;

let buffer = [];
let lr = new LineByLineReader('usersays.txt');

// Para cada linea almacena en la variable buffer el objeto a procesar
lr.on('line', function (line) {
    let id = line.split("|")[0];
    let query = line.split("|")[1];
    query=sanitizeLuis(query);

    buffer.push(
        {
            id: id,
            query: query,
            url: `${LuisModelUrl}&q=${query}`
        }
    );
});

// Cuando termina del leer todo el archivo empieza a procesar cada uno de los request almacenados en buffer
lr.on('end', function () {
    async.eachSeries(buffer, function (item, next) { 
        setTimeout(function() {
            request.get({url: item.url}, function (e, r, data) {
                if(r.statusCode == 200) {
                    objData = JSON.parse(data);
                    if(typeof(objData.topScoringIntent) !== 'undefined')
                        console.log(`${item.id}|${objData.query}|${objData.topScoringIntent.intent}|${objData.topScoringIntent.score}\r\n`); 
                    else
                        console.log(`${item.id}|${objData.query}||\r\n`); 
                }
                else
                    console.log(`${item.id}|${objData.query}||\r\n`); 
            });
            next(); // Se ejecuta el callback!
        }, requestDelay);
    });
});

// Solo para la limpieza del input del usuario
let sanitizeLuis = (str) => {
    // Se reemplazan las tildes
    str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[ÈÉÊË]/g,"E");
    str = str.replace(/[èéêë]/g,"e");
    str = str.replace(/[ÌÍÎÏ]/g,"I");
    str = str.replace(/[ìíîï]/g,"i");
    str = str.replace(/[ÒÓÔÕÖ]/g,"O");
    str = str.replace(/[òóôõö]/g,"o");
    str = str.replace(/[ÙÚÛÜ]/g,"U");
    str = str.replace(/[ùúûü]/g,"u");
    str = str.replace(/[Çç]/g,"c");

    // Se reemplazan los signos de puntuación.
    str = str.replace(/[¿?¡!,]/g,' ');

    return str;
}