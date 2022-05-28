const { Schema, Types, model } = require('mongoose')

var BottleSchema = new Schema({
    producer: {
        type: String,
        required: true
    },
    wineName: {
        type: String
    },
    vintage: {
        type: Number
    },
    wineType: {
        type: String
    },
    region: {
        type: String
    },
    variety: {
        type: String
    },
    notes: {
        type: String
    },
    storageLocation: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    // user: {
    //     type: String,
    //     required: true,
    //     ref: 'user'
    // }
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
}
)

const Bottle = model('bottle', BottleSchema)

module.exports = Bottle;

