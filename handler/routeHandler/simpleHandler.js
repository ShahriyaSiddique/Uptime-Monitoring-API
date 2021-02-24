// module scaffolding
const handler = {};

handler.simpleHandler = (reqProperties, callback) => {
    console.log('🚀 ~ file: simpleHandler.js ~ line 5 ~ reqProperties', reqProperties);

    callback(200, { msg: 'this is a sample route' });
};

module.exports = handler;
