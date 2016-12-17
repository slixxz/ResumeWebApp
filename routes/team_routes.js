var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');


// View All acounts
router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('team/teamViewAll', { 'result':result });
        }
    });

});

// View the team for the given id
router.get('/', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.getById(req.query.team_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('team/teamViewById', {'result': result});
            }
        });
    }
});

// Return the add a new stadium form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    team_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('team/teamAdd', {'team': result});
        }
    });
});

// insert a team record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team_name == null) {
        res.send('An teamID must be selected');
    }
    else if(req.query.city == null) {
        res.send('An first name must be selected');
    }
    else if(req.query.country == null) {
        res.send('An Country must be selected');
    }
    else if(req.query.league == null) {
        res.send('A # of goals must be selected');
    }
    else if(req.query.rating == null) {
        res.send('A age must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        team_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});



router.get('/edit2', function(req, res){
    if(req.query.team_id == null) {
        res.send('A team id is required');
    }
    else {
        team_dal.getById(req.query.team_id, function(err, team){

            res.render('team/teamUpdate', {team: team[0]});
        });
    }

});

router.get('/update', function(req, res) {
    team_dal.update(req.query, function(err, result){
        res.redirect(302, '/team/all');
    });
});











// Delete a stadium for the given school_id
router.get('/delete', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.delete(req.query.team_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/team/all');
            }
        });
    }
});


module.exports = router;