function log(req, res, next) {
    console.log('This is middleware');
    next();
}

module.exports = log;