const router = require('express').Router()
const { getUsers, createUser, getOneUser, updateUser, deleteUser,
    // addFriend, deleteFriend
} = require('../../controllers/userController')


// GET all users and POST a new user
router.route('/')
    .get(getUsers)
    .post(createUser)

//GET one user, PUT to update a user, and DELETE one user
router.route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)

//POST a new friend to a user and DELETE a friend from a user's friend list
// router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)



module.exports = router