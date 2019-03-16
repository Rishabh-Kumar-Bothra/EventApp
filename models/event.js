var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
    eventname: {
        type: String,
        default: ''
    },
    eventimage: {
        type: String,
        default: 'http://fis-cal.com/wp-content/uploads/2013/10/EVENTS.png'
    },

    location: {
        type: String,
        default: ''
    },
    details: {
        type: String,
        default: ''
    },
    date: {
        type:Date,
        default: Date()
    },
    organization:{
        type: String,
        default: ''
    },
    contact: {
        type: Number,
        default: ''
    }
});

var Event = module.exports = mongoose.model('Event', EventSchema);