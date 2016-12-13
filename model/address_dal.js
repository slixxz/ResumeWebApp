var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM address;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(stadium_id, callback) {
    var query = 'SELECT * FROM stadium WHERE stadium_id = ?';
    var queryData = [stadium_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO stadium (stadium_name, size, commodities, attendence) VALUES (?, ?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.stadium_name, params.size, params.commodities, params.attendence];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(stadium_id, callback) {
    console.log(stadium_id);

    var query = 'DELETE FROM stadium WHERE stadium_id = ?';
    var queryData = [stadium_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};