const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

exports.registerUser = async function (req, res) {
    let user = await User.findOne({ email: req.body.email })
    if (!req.body.email || !req.body.name || !req.body.password)
        return res.status(400).send({ message: "Missing data" })
    if (user)
        return res.status(400).send({ message: "Email already used" })
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: jwt.sign({ password: req.body.password }, process.env.SECRET_TOKEN),
    })
    await user.save()
    user = await User.findOne({ email: req.body.email }) // Change this
    const JwtToken = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)
    return res.status(200).send({ message: "Successfully registered", accessToken: JwtToken })
}

exports.loginUser = async function (req, res) {
    const user = await User.findOne({ email: req.body.email })
    if (!user)
        return res.status(400).send({ message: "Wrong email" })
    if (jwt_decode(user.password).password != req.body.password)
        return res.status(400).send({ message: "Wrong password" })
    const JwtToken = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)
    return res.status(200).send({message: "Successfully logged", accessToken: JwtToken})
}