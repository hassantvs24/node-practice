const config = require('config');

module.exports = function (){

    if(!config.get('jwtPrivateKey')){//JWT Exception check
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}