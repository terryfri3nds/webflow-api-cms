const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 0, checkperiod: 1200 } );


module.exports =  myCache ;