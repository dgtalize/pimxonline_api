var self = module.exports = {
    filters: function (queryFilters) {
        var conditions = [];

        var fields = Object.keys(queryFilters);
        // iterate fields
        fields.forEach(function (field) {
            var operators = Object.keys(queryFilters[field]);
            // iterate operators
            operators.forEach(function (operator) {
                var value = queryFilters[field][operator];
                var operator = self.getSQLOperator(operator);
                // prepare condition
                var condition = field + " " + operator + " ";
                if (operator == "like") {
                    //if its a LIKE add the wildcards
                    condition += "'%" + value + "%'";
                } else {
                    if (typeof value == "number") {
                        condition += value;
                    } else {
                        condition += "'" + value + "'";
                    }
                }
                condition += "\n";
                // add condition to list
                conditions.push(condition);
            }, this);
        }, this);

        var sqlWhere = conditions.join(" AND ");
        return sqlWhere;
    },

    getSQLOperator: function (operator) {
        switch (operator) {
            case "eq":
                operator = "="
                break;
            case "lt":
                operator = "<"
                break;
            case "lte":
                operator = "<="
                break;
            case "gt":
                operator = ">"
                break;
            case "gte":
                operator = ">="
                break;
        }
        return operator.toLowerCase();
    }
}