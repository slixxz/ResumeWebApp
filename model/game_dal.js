var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM game;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(game_id, callback) {
    var query = 'SELECT * FROM game WHERE game_id = ?';
    var queryData = [game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO game (game_id, play_date, game_time, final_score, location) VALUES (?,?,?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.game_id, params.play_date, params.game_time, params.final_score, params.location];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(game_id, callback) {
    console.log(game_id);

    var query = 'DELETE FROM game WHERE game_id = ?';
    var queryData = [game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE game SET play_date = ?, game_time = ?, final_score = ?, location = ? WHERE game_id = ?';
    var queryData = [params.play_date, params.game_time, params.final_score, params.location, params.game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.edit = function(game_id, callback) {
    var query = 'CALL game_getinfo(?)';
    var queryData = [game_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
