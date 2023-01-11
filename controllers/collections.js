var responseJSON = require('../models/responses/response');
var webflow = require('../bpl/webflows');
const myCache = require( "../models/cache" );



//GET api/courses
exports.getAllItems = async function (req, res) {

    try
    {
        const {collectionId, limit, offset } = req.params;
        const {query, sort } = req.body;
        const collection  = req.baseUrl.split("/")[2];
        console.log("req.params2", collection)
        const items = await webflow.getAllItems(collectionId, query, limit, offset, sort);

        console.log("query", query)
        console.log("limit", limit)
        console.log("offset", offset)
        console.log("req.params", req.params)
        console.log("sort", sort)

        if (items.length > 0)
        {
            const success = myCache.set(collection, items);
            console.log("success",  success)
        }
        return responseJSON(res, 200 ,'success', items , items.length, 'Data Found');

    }
    catch(err)
    {
        console.log(err)
        return responseJSON(res, err.response.status ,'error', err.response.data , 0, err.message);
    }

}
