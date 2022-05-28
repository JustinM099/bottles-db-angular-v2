const { Bottle, User } = require('../models');

//get all bottles
const getBottles = async (req, res) => {
    try {
        const allBottles = await Bottle.find();
        res.json(allBottles);
    } catch (err) {
        console.log('ERR: ', err);
        res.status(500).json(err);
    };
};

//get one bottle
const getOneBottle = async (req, res) => {
    try {
        const oneBottle = await Bottle.findOne({ _id: req.params.id });
        res.json(oneBottle)
    } catch (err) {
        console.log('ERR: ', err)
        res.status(500).json(err)
    }
}

//POST new bottle
const newBottle = async (req, res) => {
    try {
        const bottle = await Bottle.create(req.body)
        // const user = await User.findOneAndUpdate(
        //     { username: req.body.username },
        //     { $push: { thoughts: thought._id } }
        // )
        res.json({
            bottle,
            // user
        })
    } catch (err) {
        console.log('ERR: ', err)
        res.status(500).json(err)
    }
}

//PUT to update bottle by id
const updateBottle = async (req, res) => {
    try {
        const updatedBottle = await Bottle.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        )
        res.json(updatedBottle)
    } catch (err) {
        console.log('ERR: ', err)
        res.status(500).json(err)
    }
}

//DELETE to delete bottle by id
const deleteBottle = async (req, res) => {
    try{
        const bottle = await Bottle.findOneAndDelete(
            { _id: req.params.id })
        res.json(bottle)
    }catch(err){
        console.log('ERR: ', err)
        res.status(500).json(err)
    }
}

module.exports = {
    getBottles,
    getOneBottle,
    newBottle,
    updateBottle,
    deleteBottle
}