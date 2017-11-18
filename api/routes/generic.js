var dbconn = require('../../dbconnection');

module.exports = function (app) {
    app.get('/:table/:id', (req, res) => {
        res.send('OK')
    });

    app.get('/:table', (req, res) => {
        var sqlQuery = "SELECT * FROM " + req.params.table

        // filters
        var sqlWhere = " WHERE 1=1";
        if (req.query.filter) {
            var fields = Object.keys(req.query.filter);
            // iterate fields
            fields.forEach(function (field) {
                var operators = Object.keys(req.query.filter[field]);
                // iterate operators
                operators.forEach(function (operator) {
                    var value = req.query.filter[field][operator];
                    // add condition to query
                    sqlWhere += " AND " + field + " " + operator + " ";
                    if (typeof value == "number") {
                        sqlWhere += value;
                    } else {
                        sqlWhere += "'" + value + "'";
                    }
                    sqlWhere += "\n";
                }, this);
            }, this);
        }
        sqlQuery += sqlWhere;

        // record limit
        var limit = 10
        if (req.query.limit) {
            limit = req.query.limit
        }
        sqlQuery += " LIMIT " + limit

        // execute query
        dbconn.query(sqlQuery, (error, results, fields) => {
            if (error) {
                //If there is error, we send the error in the error section with 500 status
                res.send({ "status": 500, "error": error, "data": null });
            } else {
                //If there is no error, all is good and response is 200OK.
                res.send({ "status": 200, "error": null, "data": results });
            }
        })
    });
};