// module scaffolding
const handler = {};

handler.notFoundHandler = (reqProperties, callback) => {
    console.log(reqProperties);
    callback(404, { msg: '404 Not found' });
};

module.exports = handler;
