const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    headline: {
        type: String,
        // minLength: [4, 'Title should be at least two characters!'],
        required: true,

    },
    location: {
        type: String,
        required: true,
        // minLength: [8, 'Title should be at least two characters!'],

    },
    companyName: {
        type: String,
        // minLength: [3, 'Title should be at least two characters!'],
        required: true,

    },
    description: {
        type: String,
        //minLength: [40, 'Title should be at least two characters!'],
        required: true,

    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    UsersApplied: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    //или
    // buyers: {
    //     type: [mongoose.Types.ObjectId],
    //     default: [],
    //     ref: 'User'
    // },

});


const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;