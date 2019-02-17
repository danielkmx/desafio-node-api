const mongoose = require('mongoose');

const talentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: { type: String , required: true},
    Name: { type: String , required: true},
    PhoneNumber: { type: String , required: true},
    Linkedin: { type: String , required: true},
    State: { type: String , required: true},
    City: { type: String , required: true},
    Portfolio: { type: String , required: true},
    WillignessToWork: { type: String , required: true},
    BestTimeToWork: { type: String , required: true},
    SalaryRequirementPerHour: { type: Number , required: true},
    RegisterDate: { type: String}
});


module.exports = mongoose.model('Talent', talentSchema);