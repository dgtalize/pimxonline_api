const dbconn = require('../../dbconnection');
const config = require('../../config');
const parser = require('./parser');

module.exports = function (app) {
    app.get('/:table/:id', (req, res) => {
        var sqlQuery = "SELECT * FROM " + req.params.table
        sqlQuery += " WHERE id = " + req.params.id

        res.send('Not implemented')
    });

    app.get('/:table', (req, res) => {
        var sqlQuery = "SELECT * FROM " + req.params.table

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

        // execute query
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
};