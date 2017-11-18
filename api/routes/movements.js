const dbconn = require('../../dbconnection');
const config = require('../../config');
const parser = require('./parser');

module.exports = function (app) {
    app.get('/movements/:id', (req, res) => {
        var sqlQuery = "SELECT * FROM movimientos"
        sqlQuery += " WHERE mov_id = " + req.params.id

        dbconn.query(sqlQuery, (error, results, fields) => {
            if (error) {
                //If there is error, we send the error in the error section with 500 status
                res.status(500).send({ "status": 500, "error": error, "data": null });
            } else {
                //If there is no error, all is good and response is 200OK.
                if (results.length > 0) {
                    var result = results[0]
                    res.send({ "status": 200, "error": null, "data": result });
                } else {
                    res.status(404).send({ "status": 404, "error": null, "data": null });
                }
            }
        })
    });

    app.get('/movements', (req, res) => {
        var sqlQuery = "SELECT * FROM movimientos"

        // filters
        var sqlWhere = "";
        if (req.query.filter) {
            sqlWhere += " WHERE " + parser.filters(req.query.filter);
        }
        sqlQuery += sqlWhere;

        // record limit
        var limit = config.defaults.maxrecords
        if (req.query.limit) {
            limit = req.query.limit
        }
        sqlQuery += " LIMIT " + limit

        dbconn.query(sqlQuery, (error, results, fields) => {
            if (error) {
                //If there is error, we send the error in the error section with 500 status
                res.status(500).send({ "status": 500, "error": error, "data": null });
            } else {
                //If there is no error, all is good and response is 200OK.
                res.send({ "status": 200, "error": null, "data": results });
            }
        })
    });

    app.post('/movements', (req, res) => {
        console.log(req.body)
        res.send('Not implemented')
    });
};