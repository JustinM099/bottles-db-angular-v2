const { Schema, Types, model } = require('mongoose');
const bcrypt = require('bcrypt');
const bottleSchema = require('./Bottle');

// create user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, "I'd like you to enter a valid email, please."]
        },
        bottles: [{
            type: Schema.Types.ObjectId,
            ref: 'bottle',
        }],
        // friends: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'user'
        // }],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};



const User = model('user', userSchema);

// userSchema.virtual('friendsCount').get(function () {
//     return this.friends.length
// })

module.exports = User;
