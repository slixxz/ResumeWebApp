var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM player;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(player_id, callback) {
    var query = 'SELECT * FROM player WHERE player_id = ?';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO player (player_id, first_name, last_name, number_goals, age) VALUES (?,?,?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.player_id, params.first_name, params.last_name, params.number_goals, params.age];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(player_id, callback) {
    console.log(player_id);

    var query = 'DELETE FROM player WHERE player_id = ?';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE player SET first_name = ?, last_name = ?, number_goals = ?, age = ? WHERE player_id = ?';
    var queryData = [params.first_name, params.last_name, params.number_goals, params.age, params.player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.edit = function(player_id, callback) {
    var query = 'CALL player_getinfo(?)';
    var queryData = [player_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

