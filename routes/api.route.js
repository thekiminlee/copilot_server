const express = require('express');
const router = express.Router();

const officeModel = require('../model/officehour.model');

// POST
/*
    input: 
        - office hour {name} (String)
        - office hour {date} (Date)
*/
router.route("/officehour").post(function (req, res) {
    let officeHour = new officeModel.OfficeHour(req.body);
    officeHour.save().then(response => {
        res.status(200).send("Office hour saved.\n" + response)
    }).catch(err => {
        console.log(err);
        res.status(400).send("Failed to save office hour.\n " + err)
    })
})

/*
    inputs:
        - question {question} (String)
        - author {author} (String)
        - email {email} (String)
        - assoicated {office_hour_id} (String)
*/
router.route("/officehour/:id").post(function (req, res) {
    let question = new officeModel.Question(req.body);
    question.save().then(response => {
        res.status(200).send("Question saved.\n" + response)
    }).catch(err => {
        res.status(400).send("Failed to save question.\n " + err)
    })
})


// GET
/*
    Returns a list of all the office hours
*/
router.route("/officehours").get(function (req, res) {
    officeModel.OfficeHour.find().sort('date').exec(function(err, officehours) {
        if (err) {
            res.status(404).send("Office hour cannot be found. \n" + err)
        } else {
            res.status(200).json(officehours)
        }
    })
})

/*
    Returns a specific office hour with :id
*/
router.route("/officehour/:id").get(function (req, res) {
    officeModel.OfficeHour.findById(req.params.id, function(err, officehour) {
        if (err) {
            res.status(404).send("Office hour cannot be found. \n" + err)
        } else {
            res.status(200).json(officehour)
        }
    })
})

/*
    Returns a list of questions associatd with office hour :id
*/
router.route("/officehour/questions/:id").get(function (req, res) {
    officeModel.Question.find({office_hour_id: req.params.id}).sort('-createdAt').exec(function(err, questions) {
        if (err) {
            res.status(404).send("Office hour cannot be found. \n" + err)
        } else {
            res.status(200).json(questions)
        }
    })
})


// PATCH
/*
    Updates {subscribers} array and {subscriber_count} of a question {id}
*/
router.route("/question/:id/:subscriber").patch(function (req, res) {
    officeModel.Question.findByIdAndUpdate(req.params.id, 
        {
            $push: { subscribers: req.params.subscriber},
            $inc: { subscriber_count: 1}
        },
        {
            new: true
        },
        function(err, question) {
            if (err) {
                res.status(404).send("Question cannot be found.\n " + err)
            } else {
                res.status(200).send("Question subscribers updated\n" + question)
            }
    })
})


// DELETE
/* 
    Deletes office hour :id
*/
router.route("/officehour/:id").delete(function (req, res) {
    officeModel.OfficeHour.findByIdAndRemove(req.params.id, function(err, resp) {
        if(err) {
            res.status(404).send("Office hour cannot be found. \n" + err)
        } else {
            res.status(200).send("Office hour deleted.\n" + resp)
        }
    })
})

/* 
    Deletes all the questions associated with office hour :id
*/
router.route("/questions/:office_hour_id").delete(function (req, res) {
    officeModel.Question.deleteMany({ office_hour_id: req.params.office_hour_id }, function(err, resp) {
        if (err) {
            res.status(404).send("Questions cannot be deleted\n" + err)
        } else {
            res.status(200).send("Questions deleted\n")
        }
    } )
})

module.exports = router;