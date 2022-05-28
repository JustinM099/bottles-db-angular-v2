const { Bottle, User } = require('../models')

//------------------USER ROUTES----------------//

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
const getOneUser = async (req, res) => {
    try {
        const oneUser = await User.findOne({ _id: req.params.id })
            .populate('bottles')
            // .populate('friends')
        if (!oneUser) {
            res.status(404).json({ message: 'No Such User, Sorry.' })
        }
        res.json(oneUser)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// POST a new user
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
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
    getUsers, getOneUser, createUser, updateUser, deleteUser,
    // addFriend, deleteFriend
}