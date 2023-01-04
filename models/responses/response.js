module.exports = function (res, statuscode, status, data, count, message) {

    
    res.status(statuscode).json({
        message: message,
        data: data,
        count: count,
        status: status,
        statuscode : statuscode
    });
}
