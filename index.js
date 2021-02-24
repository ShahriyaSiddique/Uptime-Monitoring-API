// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');

// app object - module scaffolding
const app = {};

// configuration
app.config = { port: 3000 };

// crate server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Server is running on ${app.config.port}`);
    });
};
// handle Request Response
app.handleReqRes = handleReqRes;

app.createServer();
