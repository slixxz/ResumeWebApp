var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM account;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(account_id, callback) {
    var query = 'SELECT * FROM account WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO account (email, first_name, last_name) VALUES (?, ?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.email, params.first_name, params.last_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(account_id, callback) {
    console.log(account_id);

    var query = 'DELETE FROM account WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};


exports.update = function(params, callback) {
    var query = 'UPDATE account SET email = ?,first_name =?, last_name = ? WHERE account_id = ?';
    var queryData = [params.email, params.last_name, params.account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS school_getinfo;
 DELIMITER //
 CREATE PROCEDURE school_getinfo (school_id int)
 BEGIN
 SELECT * FROM school WHERE school_id = school_id;
 SELECT a.*, school_id FROM address a
 LEFT JOIN school s on s.address_id = a.address_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL school_getinfo (4);
 */

exports.edit = function(account_id, callback) {
    var query = 'CALL account_getinfo(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};