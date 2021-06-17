const User = require('../models/userModel')
const Fridge = require('../models/fridgeModel')

exports.createFridge = async function (req, res) {
    if (!req.params.id || !req.body.name)
        return res.status(400).json({ message: "Missing data" })
    let user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).json({ message: "Id not valid" })
    let fridge = await Fridge.findOne({ name: req.body.name })
    if (fridge)
        return res.status(400).json({ message: "Fridge name already taken" })
    fridge = new Fridge({
        name: req.body.name,
        owner: user._id,
    })
    await fridge.save()
    fridge = await Fridge.findOne({ name: req.body.name })
    return res.status(200).json({ message: "Fridge created", id: fridge._id })
}

exports.getAllFridges = async function (req, res) {
    let fridges = await Fridge.find({})
    if (!fridges)
        return res.status(400).json({ message: "There are no fridges yet" })
    return res.status(200).json( fridges )
}

exports.getFridge = async function (req, res) {
    if (!req.params.id)
        return res.status(400).json({ message: "Missing data" })
    let fridge = await Fridge.findById(req.params.id)
    if (!fridge)
        return res.status(400).json({ message: "No fridge found with this id" })
    return res.status(200).json(fridge)
}

exports.deleteFridge = async function (req, res) {
    if (!req.params.id)
        return res.status(400).json({ message: "Missing data" })
    await Fridge.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: "Fridge deleted" })
}

exports.changeInformationsFridge = async function (req, res) {
    if (!req.params.id)
        return res.status(400).json({ message: "Missing data" })
    let fridge = await Fridge.findById(req.params.id)
    if (!fridge)
        return res.status(400).json({ message: "No fridge found with this id" })
    if (!req.body.name && !req.body.address && !req.body.city && !req.body.zip && !req.body.active)
        return res.status(400).json({ message: "No data received" })
    if (req.body.name)
        fridge.name = req.body.name
    if (req.body.address)
        fridge.address = req.body.address
    if (req.body.city)
        fridge.city = req.body.city
    if (req.body.zip)
        fridge.zip = req.body.zip
    if (req.body.active)
        fridge.active = req.body.active
    await fridge.save()
    return res.status(200).json({ message: "Everything went fine" })
}