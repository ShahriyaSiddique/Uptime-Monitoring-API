// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { notFoundHandler } = require('../handler/routeHandler/notFoundHandler');
const routes = require('../route');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handle
    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.path.replace(/^\/|\/$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObj = parsedUrl.query;
    const headersObject = req.headers;

    const reqProperties = {
        parsedUrl,
        trimmedPath,
        method,
        queryStringObj,
        headersObject,
    };

    const choosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        choosenHandler(reqProperties, (statusCode, payload) => {
            const sCode = typeof statusCode === 'number' ? statusCode : 500;
            const pLoad = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(pLoad);
            // send response
            res.writeHead(sCode);
            res.end(payloadString);
        });
    });
};

module.exports = handler;
