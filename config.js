'use strict';
// load in the 'nconf' npm package
const nconf = require('nconf');
// define env variables that nconf will care to understand
nconf.env([
    'HOST',
    'ENVIRONMENT'
]);
// if these below variables aren't defined at run time via node; we'll not be able to start our program
if (!nconf.get('ENVIRONMENT') || !nconf.get('HOST')) {
    console.log('You have to at least specify the above items...');
    process.exit(1);
}
// set the env config objects up
const config = {
    default: {
        // environment: nconf.get('ENVIRONMENT'),
        host: nconf.get('HOST')
    },
    prod: {
        // environment: nconf.get('ENVIRONMENT'),
        host: nconf.get('HOST')
    }
};
// based on the env, we'll know which setting to load into nconf
switch (nconf.get('ENVIRONMENT').toLowerCase()) {
    case 'prod':
        nconf.defaults(config.prod);
        break;
    default:
        nconf.defaults(config.default);
}
// for things in the default config that don't override the prod config; use add them like they were in the prod config
nconf.overrides(config.default);
// export so we can use this in another file
module.exports = nconf;
