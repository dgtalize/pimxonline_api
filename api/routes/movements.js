var dbconn = require('../../dbconnection');

module.exports = function (app) {
    app.get('/movements/:id', (req, res) => {
        res.send('OK')
    });

    app.get('/movements', (req, res) => {
        dbconn.query("SELECT * FROM movimientos LIMIT 10", (error, results, fields) => {
            if (error) {
                //If there is error, we send the error in the error section with 500 status
                res.send({ "status": 500, "error": error, "data": null });
            } else {
                //If there is no error, all is good and response is 200OK.
                res.send({ "status": 200, "error": null, "data": results });
                //res.send(JSON.stringify({ "status": 200, "error": null, "data": results }));
            }
        })
    });

    app.post('/movements', (req, res) => {
        console.log(req.body)
        res.send('OK')
    });
};