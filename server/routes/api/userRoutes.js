const router = require('express').Router()
const { getUsers, createUser, getOneUser, updateUser, deleteUser, login
    // addFriend, deleteFriend
} = require('../../controllers/userController')

const { authMiddleware } = require('../../utils/auth');


// GET all users and POST a new user
router.route('/')
    .get(authMiddleware, getUsers)
    .post(createUser)

//LOGIN
router.route('/login').post(login);

//GET one user, PUT to update a user, and DELETE one user
router.route('/:id')
    .get(authMiddleware, getOneUser)
    .put(authMiddleware, updateUser)
    .delete(authMiddleware, deleteUser)

//POST a new friend to a user and DELETE a friend from a user's friend list
// router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)



module.exports = router