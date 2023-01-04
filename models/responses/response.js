module.exports = function (res, statuscode, status, data, count, message) {

    console.log(message)
    res.status(statuscode).json({
        data: data,
        count: count,
        status: status,
        statuscode : statuscode
    });
}
