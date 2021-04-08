const User = require('../models/user')
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

module.exports = {
    registerUser,
    loginUser
}

async function registerUser(req, res) {
    let user = await User.findOne({ email: req.query.email })
    if (!req.query.email || !req.query.username || !req.query.password)
        return res.status(400).send({ status: 400, message: "Missing data" })
    if (user)
        return res.status(400).send({ status: 400, message: "Email already used" })
    user = new User({
        name: req.query.username,
        email: req.query.email,
        password: jwt.sign({ password: req.query.password }, process.env.SECRET_TOKEN),
    })
    await user.save()
    user = await User.findOne({ email: req.query.email })
    const JwtToken = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)
    return res.status(200).header('auth-token', JwtToken).send({ status: 200, message: "Successfully registered" })
}

async function loginUser(req, res) {
    const user = await User.findOne({ email: req.query.email })
    if (!user)
        return res.status(400).send({ status: 400, message: "Wrong email" })
    if (jwt_decode(user.password).password != req.query.password)
        return res.status(400).send({ status: 400, message: "Wrong password" })
    const JwtToken = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)
    return res.status(200).header('auth-token', JwtToken).send({ status: 200, message: "Successfully loged in" })
}
