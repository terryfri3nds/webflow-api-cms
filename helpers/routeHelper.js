var responseJSON = require('../models/responses/response');

function ensureJson(req, res, next)
{
  var contype = req.headers['content-type'];
 
  if (!contype || contype.indexOf('application/json') !== 0)
    return responseJSON(res, 400 , 'Bad Request', '', 'Invalid Content-Type. API support (application/json)');
    
  next();
}

function ensureMultipart(req, res, next)
{
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('multipart/form-data') !== 0)
    return responseJSON(res, 400 , 'Bad Request', '', 'Invalid Content-Type. API support (multipart/form-data)');
  
  next();
}

module.exports = { ensureMultipart, ensureJson };
