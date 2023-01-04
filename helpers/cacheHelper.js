var responseJSON = require('../models/responses/response');
const myCache = require( "../models/cache" );


function checkCache(req, res, next)
{
  const collection  = req.baseUrl.split("/")[2];
  console.log("req.params", collection)
  console.log("checkCache.collection",  collection)
  value = myCache.get( collection );
  
  if ( value != undefined ){
  
    return responseJSON(res, 200 ,'success', {"key": "fede"} , value.length, 'Data Found (Cached)');
  }
  
  next();
}


module.exports = { checkCache };
