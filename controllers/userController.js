const User = require('../models/userModel')
const email = require('../utils/email')

// clean et redemarrer la DB pour voir si unique fonctionne
// verifier si minimum lettre prénom nom

exports.registerUser = async function (req, res) {
    user = new User({
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    user.Encrypt(req.body.password)
    try {
        await user.save()
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" })
    }
    // email.sendConfirmation("arnaud.roncaripro@gmail.com", "wow")
    return res.status(200).send({ 
        message: "Successfully registered", 
        accessToken: user.generateAccessToken() 
    })
}

exports.loginUser = async function (req, res) {
    const user = await User.findOne({ email: req.body.email })
    if (!user)
        return res.status(400).send({ message: "Wrong email" })
    if (!user.isPasswordMatching(req.body.password))
        return res.status(400).send({ message: "Wrong password" })

    return res.status(200).send({ 
        message: "Successfully logged",
        id: user._id,
        accessToken: user.generateAccessToken() 
    })
}

exports.informationUser = async function (req, res) {
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).send({ message: "User not found" })
    return res.status(200).send( user );
}

// email confirmation https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
// password recovery