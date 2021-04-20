const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

// if (!req.body.email || !req.body.name || !req.body.password)
//     return res.status(400).send({ message: "Missing data" }) // find a way to replace this
// verifier is email est correct
// verifier si minimum lettre prénom nom
exports.registerUser = async function (req, res) {
    let user = await User.findOne({ email: req.body.email })
    if (user)
        return res.status(400).send({ message: "Email already used" })
    user = new User({
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: jwt.sign({ password: req.body.password }, process.env.SECRET_TOKEN), // gestion d"'erreur env
    })
    try {
        await user.save()
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal Server Error" })
    }
    const JwtToken = jwt.sign({ _id: user.email }, process.env.SECRET_TOKEN)
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