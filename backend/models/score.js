const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    game: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        required: true
    },

    coins: {
        type: Number,
        default: 0
    },

    bonus: {
        type: Number,
        default: 0
    },

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model("Score", scoreSchema);