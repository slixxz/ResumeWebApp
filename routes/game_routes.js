var express = require('express');
var router = express.Router();
var game_dal = require('../model/game_dal');


// View All acounts
router.get('/all', function(req, res) {
    game_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('game/gameViewAll', { 'result':result });
        }
    });

});

// View the game for the given id
router.get('/', function(req, res){
    if(req.query.game_id == null) {
        res.send('game_id is null');
    }
    else {
        game_dal.getById(req.query.game_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('game/gameViewById', {'result': result});
            }
        });
    }
});

// Return the add a new stadium form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    game_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('game/gameAdd', {'game': result});
        }
    });
});

// insert a game record
router.get('/insert', function(req, res){
    // simple validation
     if(req.query.play_date == null) {
        res.send('An play date must be selected');
    }
    else if(req.query.game_time == null) {
        res.send('An game time must be selected');
    }
    else if(req.query.final_score == null) {
        res.send('A final score must be selected');
    }
    else if(req.query.location == null) {
        res.send('A location must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        game_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/game/all');
            }
        });
    }
});



router.get('/edit2', function(req, res){
    if(req.query.game_id == null) {
        res.send('A game id is required');
    }
    else {
        game_dal.getById(req.query.game_id, function(err, game){

            res.render('game/gameUpdate', {game: game[0]});
        });
    }

});

router.get('/update', function(req, res) {
    game_dal.update(req.query, function(err, result){
        res.redirect(302, '/game/all');
    });
});











// Delete a stadium for the given school_id
router.get('/delete', function(req, res){
    if(req.query.game_id == null) {
        res.send('game_id is null');
    }
    else {
        game_dal.delete(req.query.game_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/game/all');
            }
        });
    }
});


module.exports = router;