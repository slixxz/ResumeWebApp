var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM team;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(team_id, callback) {
    var query = 'SELECT * FROM team WHERE team_id = ?';
    var queryData = [team_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO team (team_name, city, country, league, rating) VALUES (?,?,?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.team_name, params.city, params.country, params.league, params.rating];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(team_id, callback) {
    console.log(team_id);

    var query = 'DELETE FROM team WHERE team_id = ?';
    var queryData = [team_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE team SET team_name = ?, city = ?, country = ?, league = ?, rating = ? WHERE team_id = ?';
    var queryData = [params.team_name, params.city, params.country, params.league, params.rating, params.team_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.edit = function(team_id, callback) {
    var query = 'CALL team_getinfo(?)';
    var queryData = [team_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
