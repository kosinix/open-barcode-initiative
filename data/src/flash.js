//// Core modules

//// External modules
let lodash = require('lodash');


let flashSet = (req, id, message) => {
    lodash.set(req, 'session.flash.' + id, message);
}
let flash = {
    set: flashSet,
    get: (req, id) => {
        let r = lodash.get(req, 'session.flash.' + id, '');
        lodash.set(req, 'session.flash.' + id, '');
        return r;
    },
    error: (req, id, message) => {
        flashSet(req, `${id}.error`, message)
    },
    ok: (req, id, message) => {
        flashSet(req, `${id}.ok`, message)
    },
    warning: (req, id, message) => {
        flashSet(req, `${id}.warning`, message)
    },
    info: (req, id, message) => {
        flashSet(req, `${id}.info`, message)
    }
}
// Export
module.exports = flash;
