const express = require('express');
const router = express.Router();
const Talent = require('../models/talent');
const mongoose = require('mongoose');
const moment = require('moment');
router.get('/', (req,res,next) => {

    Talent.find()
    .select('Name PhoneNumber _id Email Linkedin City State SalaryRequirementPerHour BestTimeToWork WillignessToWork Portfolio RegisterDate')
    .exec()
    .then(docs => {


        const response = {
            count: docs.length,
            talents: req.query.startDate && req.query.endDate ? docs.map(doc => {
                if(new Date(doc._doc.RegisterDate) >= new Date(req.query.startDate) && new Date(doc._doc.RegisterDate) <= new Date(req.query.endDate)){
                    return {...doc._doc, request: { 
                        type: 'GET',
                        url: 'http://localhost:3000/talents/' + doc._id
                    }}
                    }
                    return;
            }) 
            : docs.map(doc => { return {...doc._doc, request: { 
                type: 'GET',
                url: 'http://localhost:3000/talents/' + doc._id
            }}})
        }
            res.status(200).json({
                count: response.count,
                talents: response.talents
            });
    })
    .catch(err => {
        res.json(404).json({
            message: 'No entries found'
        })
    })
    
});



router.post('/',  (req,res,next) => {
    const talent = new Talent({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.Name,
        Email: req.body.Email,
        PhoneNumber: req.body.PhoneNumber,
        Linkedin: req.body.Linkedin,
        State: req.body.State,
        City: req.body.City,
        Portfolio: req.body.Portfolio,
        WillignessToWork: req.body.WillignessToWork,
        BestTimeToWork: req.body.BestTimeToWork,
        SalaryRequirementPerHour: req.body.SalaryRequirementPerHour,
        RegisterDate: moment().format('YYYY-MM-DD[T]HH:mm:ss')
        
    });
    talent.
    save().
    then(result => {
        console.log(res);
        res.status(201).json({
            talent: {
                _id: new mongoose.Types.ObjectId(),
                Name: result.Name,
                Email: result.Email,
                PhoneNumber: result.PhoneNumber,
                Linkedin: result.Linkedin,
                State: result.State,
                City: result.City,
                Portfolio: result.Portfolio,
                WillignessToWork: result.WillignessToWork,
                BestTimeToWork: result.BestTimeToWork,
                SalaryRequirementPerHour: result.SalaryRequirementPerHour,
                RegisterDate: result.RegisterDate,
        request: { 
            type: 'GET',
            url: 'http://localhost:3000/talents/' + result._id
        }
            } 
        })
    }).
    catch(err => { 
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    
});

router.get('/:talentId',(req,res,next) => {
    const talentId = req.params.talentId;
    Talent.findById(talentId)
    .select('Name PhoneNumber _id Email Linkedin City State SalaryRequirementPerHour BestTimeToWork WillignessToWork Portfolio')
    .exec()
    .then(doc => {           
        if(doc) res.status(200).json(doc);
        else res.status(404).json({message: 'Talent not found'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
});

router.patch('/:talentId', (req,res,next) => {
    const id = req.params.talentId;
    const updateOps = {};

    for( const operations of req.body){
        updateOps[operations.propName] = operations.value;
    }
    Talent.updateOne({_id: id}, {$set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Talent updated',
            request: {
                type: 'GET',
                url: 'http:localhost:3000/talents/' + id
            }
        });
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
});
router.delete('/:talentId', (req,res,next) => {
    const id = req.params.talentId
    Talent.remove({_id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Talent deleted"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;
