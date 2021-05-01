const User = require('../models/userModel')
const Encryption = require('../utils/encryption')

exports.registerUser = async function (req, res) {
    var user = new User({
        name: req.body.name,
        last_name: req.body.last_name,
        password: Encryption.Encrypt(req.body.password, process.env.KE_PASSWORD),
        email: req.body.email
    })
    try {
        await user.save()
        await user.sendEmailConfirmation()  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
    return res.status(200).json({ 
        message: "Confirmation email send"
    })
}

exports.loginUser = async function (req, res) {
    const user = await User.findOne({ email: req.body.email })
    if (!user)
        return res.status(400).json({ message: "Wrong email" })
    if (user.active === false)
        return res.status(400).json({ message: "Account not activated" })
    if (!user.isPasswordMatching(req.body.password))
        return res.status(400).json({ message: "Wrong password" })
    return res.status(200).json({ 
        message: "Successfully logged",
        id: user._id,
        accessToken: user.generateAccessToken() 
    })
}

exports.confirmationUser = async function (req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, {$set: {active: true}}, {new: true});
    if (!user)
        return res.status(400).json({ message: "Account not found" })
    return res.status(200).json({ message: "Account activated" });
}

exports.informationUser = async function (req, res) {
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).json({ message: "User not found" })
    return res.status(200).json( user );
}

// auto deletion account if not activated
// ask confirmation again
// password recovery