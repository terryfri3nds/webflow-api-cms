var responseJSON = require('../models/responses/response');
var webflow = require('../bpl/webflows');



//GET api/courses
exports.getAllItems = async function (req, res) {

    try
    {
        const {collectionId, limit, offset } = req.params;
        const {query, sort } = req.body;


        const items = await webflow.getAllItems(collectionId, query, limit, offset, sort);

        console.log("query", query)
        console.log("limit", limit)
        console.log("offset", offset)
        console.log("req.params", req.params)
        console.log("sort", sort)

      

        return responseJSON(res, 200 ,'success', items , items.length, 'Data Found');

    }
    catch(err)
    {
        return responseJSON(res, 400 ,'error', {} , 0, err.message);
    }

}
