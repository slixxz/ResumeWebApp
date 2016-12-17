var express = require('express');
var router = express.Router();
var stadium_dal = require('../model/stadium_dal');
var address_dal = require('../model/team_dal');


// View All schools
router.get('/all', function(req, res) {
    stadium_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('stadium/stadiumViewAll', { 'result':result });
        }
    });

});

// View the stadium for the given id
router.get('/', function(req, res){
    if(req.query.stadium_id == null) {
        res.send('stadium_id is null');
    }
    else {
        stadium_dal.getById(req.query.stadium_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('stadium/stadiumViewById', {'result': result});
            }
        });
    }
});

// Return the add a new stadium form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('stadium/stadiumAdd', {'address': result});
        }
    });
});

// insert a stadium record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.stadium_name == null) {
        res.send('Stadium Name must be provided.');
    }


    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        stadium_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/stadium/all');
            }
        });
    }
});

// Delete a stadium for the given school_id
router.get('/delete', function(req, res){
    if(req.query.stadium_id == null) {
        res.send('stadium_id is null');
    }
    else {
        stadium_dal.delete(req.query.stadium_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/stadium/all');
            }
        });
    }
});

module.exports = router;