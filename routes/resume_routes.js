var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var account_dal = require('../model/account_dal');


// View All schools
router.get('/all', function(req, res) {
    resume_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume_dal.getById(req.query.resume_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('resume/resumeViewById', {'result': result});
           }
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    resume_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeAdd', {'resume': result});
        }
    });
});

// insert a school record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.resume_name == null) {
        res.send('School Name must be provided.');
    }
    else if(req.query.resume_id == null) {
        res.send('An Address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        resume_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resume/all');
            }
        });
    }
});



// Delete a school for the given school_id
router.get('/delete', function(req, res){
    console.log("data: ", req.query);

    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume_dal.delete(req.query.resume_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/resume/all');
            }
        });
    }
});



module.exports = router;