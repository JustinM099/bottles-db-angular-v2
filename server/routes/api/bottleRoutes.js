const router = require('express').Router()
const { getBottles, getOneBottle, newBottle, updateBottle, deleteBottle } = require('../../controllers/bottleController.js')


// GET to get all thoughts, POST to post a new thought
router.route('/')
    .get(getBottles)
    .post(newBottle)
// GET to get a single thought by its _id & PUT to update a thought & DELETE to delete a thought
router.route('/:id')
    .get(getOneBottle)
    .put(updateBottle)
    .delete(deleteBottle)

module.exports = router
