let Talent = require('../../models/talent');
let mongoose = require("mongoose");



module.exports.talentMock = new Talent ({
    "_id": new mongoose.Types.ObjectId(),
    "Name": "daniel",
    "Email": "daniel@email.com",
    "PhoneNumber": "97972451239",
    "Linkedin": "linkedin.com/teste",
    "State": "RJ",
    "City": "RJ",
    "Portfolio": "github.com/teste",
    "WillignessToWork": "40",
    "BestTimeToWork": "daytime",
    "SalaryRequirementPerHour": 50
});

module.exports.incompletetalentMock = new Talent ({
    "_id": new mongoose.Types.ObjectId(),
    "Name": "daniel",
    "PhoneNumber": "97972451239",
    "Linkedin": "linkedin.com/teste",
    "State": "RJ",
    "City": "RJ",
    "Portfolio": "github.com/teste",
    "WillignessToWork": "40",
    "BestTimeToWork": "daytime",
    "SalaryRequirementPerHour": 50
});