var express = require('express');
var router = express.Router();
var player_dal = require('../model/player_dal');


// View All acounts
router.get('/all', function(req, res) {
    player_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('player/playerViewAll', { 'result':result });
        }
    });

});

// View the player for the given id
router.get('/', function(req, res){
    if(req.query.player_id == null) {
        res.send('player_id is null');
    }
    else {
        player_dal.getById(req.query.player_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('player/playerViewById', {'result': result});
            }
        });
    }
});

// Return the add a new stadium form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    player_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('player/playerAdd', {'player': result});
        }
    });
});

// insert a player record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.player_id == null) {
        res.send('An playerID must be selected');
    }
     else if(req.query.first_name == null) {
        res.send('An first name must be selected');
    }
    else if(req.query.last_name == null) {
        res.send('An last name must be selected');
    }
     else if(req.query.number_goals == null) {
         res.send('A # of goals must be selected');
     }
     else if(req.query.age == null) {
         res.send('A age must be selected');
     }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        player_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/player/all');
            }
        });
    }
});



router.get('/edit2', function(req, res){
    if(req.query.player_id == null) {
        res.send('A player id is required');
    }
    else {
        player_dal.getById(req.query.player_id, function(err, player){

                res.render('player/playerUpdate', {player: player[0]});
        });
    }

});

router.get('/update', function(req, res) {
    player_dal.update(req.query, function(err, result){
        res.redirect(302, '/player/all');
    });
});











// Delete a stadium for the given school_id
router.get('/delete', function(req, res){
    if(req.query.player_id == null) {
        res.send('player_id is null');
    }
    else {
        player_dal.delete(req.query.player_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/player/all');
            }
        });
    }
});


module.exports = router;
