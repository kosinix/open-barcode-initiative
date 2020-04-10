//// Core modules

//// External modules
const nunjucks = require('nunjucks');
const lodash = require('lodash');
const moment = require('moment');

//// Modules


let dirView = CONFIG.app.dirs.view; // Path to view directory

//// Setup view
// Setup nunjucks loader. See https://mozilla.github.io/nunjucks/api.html#loader
let loaderFsNunjucks = new nunjucks.FileSystemLoader(dirView, CONFIG.nunjucks.loader);

// Setup nunjucks environment. See https://mozilla.github.io/nunjucks/api.html#environment
let env = new nunjucks.Environment(loaderFsNunjucks, CONFIG.nunjucks.environment);

// Get type
env.addFilter('typeOf', (value) => {
    return typeof value;
});

// From now
env.addFilter('fromNow', (date) => {
    return moment(date).fromNow();
});

env.addFilter('htmlDecode', (value) => {
    return htmlEnDec.decode(value)
});


// Custom filters
// Usage {{ value | currency }}
// Custom sep {{ value | currency(' ') }}
env.addFilter('currency', (value, sep = ',', decPlace = 2) => {
    value = lodash.toNumber(value).toFixed(decPlace);
    let split = lodash.split(value, '.');
    let whole = lodash.toArray(lodash.get(split, '[0]', []));
    let cent = lodash.toString(lodash.get(split, '[1]', ''));

    let out = [];
    let length = whole.length;
    for (c = 0; c < length; c++) {
        let rev = length - c;
        if (rev % 3 === 0) {
            out.push(sep);
            out.push(whole[c]);
        } else {
            out.push(whole[c]);
        }
    }
    let merged = lodash.join(out, ''); // Join arrays
    merged = lodash.trimStart(merged, sep); // Remove left-most sep
    if (cent) { // If there is a cent, append
        merged += '.' + cent;
    }
    return merged;
});
env.addFilter('stringify', function (value) {
    return JSON.stringify(value);
});
env.addFilter('formatDate', function (value, format, timeZone = '+0800') {
    let formatted = moment(value).utcOffset(timeZone).format(format);
    if (formatted === "Invalid date") {
        return null;
    }
    return formatted;
});
env.addFilter('fromNow', function (value) {
    return moment(value).fromNow(true);
})
env.addFilter('age', function (value) {
    return moment().diff(value, 'years')
})


//// Export
module.exports = env;