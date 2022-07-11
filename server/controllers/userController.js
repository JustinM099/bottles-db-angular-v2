const { Bottle, User } = require('../models')
const { signToken } = require('../utils/auth');

//------------------USER ROUTES----------------//

//LOGIN
const login = async ({ body }, res) => {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
}

// GET all users
const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
            .populate('bottles')
        // .populate('friends')
        res.json(allUsers)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// GET a single user by its _id and populated bottle and friend data
const getOneUser = async ({ user = null, params }, res) => {
    try {
        const oneUser = await User.findOne({ $or: [{ _id: user ? user._id : params.id }, { username: params.username }] })
            .populate('bottles')
        // .populate('friends')
        if (!oneUser) {
            res.status(404).json({ message: 'No Such User, Sorry.' })
        }
        res.json(oneUser)
    } catch (err) {
        console.log('ERR: ', err)
        res.status(500).json(err)
    }
}

// POST a new user
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = signToken(user);
        res.json({ token, user })
    } catch (err) {
        res.status(500).json(err)
    }
}

// PUT to update a user by its _id

const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id },
            req.body)
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// DELETE to remove user by its _id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


// //---------------------FRIEND ROUTES---------------//

// // POST to add a new friend to a user's friend list
// const addFriend = async (req, res) => {
//     try {
//         const friend = await User.findOneAndUpdate({ _id: req.params.id }, { $push: { friends: req.params.friendId } })
//         res.json(friend)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err)
//     }
// }

// // DELETE to remove a friend from a user's friend list

// const deleteFriend = async (req, res) => {
//     try {
//         const friend = await User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.params.friendId } })
//         res.json(friend)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err)
//     }
// }

module.exports = {
    getUsers, getOneUser, createUser, updateUser, deleteUser, login
    // addFriend, deleteFriend
}