const mongoose = require('mongoose');

const OfficeHourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     date: {
         type: Date,
         required: true
     }
});

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subscribers: {
        type: Array,
        default: []
    },
    subscriber_count: {
        type: Number,
        default: 0
    },
    office_hour_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

exports.OfficeHour = mongoose.model('OfficeHour', OfficeHourSchema);
exports.Question = mongoose.model('Question', QuestionSchema);

