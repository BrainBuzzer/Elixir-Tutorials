const Hapi = require('hapi');
const geoTz = require('geo-tz')

const server = Hapi.server({
    port: 5000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return { msg: 'Hello, world!' };
    }
});

server.route({
    method: 'GET',
    path: '/{lat}/{long}',
    handler: (request, h) => {
        let long = request.params.long;
        let lat = request.params.lat;

        return {
            lat: lat,
            long: long,
            timezone: geoTz(lat, long)
        };
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();