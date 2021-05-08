const User = require('../models/userModel')
const RRequest = require('../models/resetRequestModel')
const uuid = require('uuid');
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
    if (!user || !user.isPasswordMatching(req.body.password))
        return res.status(400).json({ message: "Email or password not valid" })
    else if (user.active === false)
        return res.status(400).json({ message: "Account not activated" })

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

exports.forgotPasswordUser = async function (req, res) {
    const user = await User.findOne({email: req.params.email});
    if (!user)
        return res.status(400).json({ message: "User not found" })
    var rrquest = new RRequest({
        id: uuid.v4(),
        email: user.email
    })
    try {
        await rrquest.save()
        await user.sendEmailReset(rrquest.id)  
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" }) // Séparer les erreurs
    }
    return res.status(200).json({ message: "Reset email send" })
}

exports.resetPasswordUser = async function (req, res) {
    var rrequest = await RRequest.findOne({id: req.params.id});
    if (!rrequest)
        return res.status(400).json({ message: "Reset Request not found" })
    const user = await User.findOneAndUpdate(
        {email: rrequest.email},
        {$set: {password: Encryption.Encrypt(req.body.password, process.env.KE_PASSWORD)}},
        {new: true})
        rrequest.delete();
    if (!user)
        return res.status(400).json({ message: "User not found" })

    return res.status(200).json({ message: "Password updated" })
}

// miss auto-deletion for register
// password recovery youtube.com/watch?v=lLVmH6SB2Z4