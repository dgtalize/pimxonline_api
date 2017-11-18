const movRoutes = require('./movements');
const genericRoutes = require('./generic');

module.exports = function (app, db) {
    movRoutes(app, db)

    // Generic route
    genericRoutes(app, db)
};