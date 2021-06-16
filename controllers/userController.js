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
        return res.status(500).json({ message: "Email already used" })
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

exports.getInformationsUser = async function (req, res) {
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).json({ message: "User not found" })
    user.password = "hidden"
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

exports.changePasswordUser = async function (req, res) {
    if (!req.body.password || !req.body.newpassword || !req.params.id)
        return res.status(400).json({ status: 400, message: "Missing data" })
    let user = await User.findById(req.params.id)
    if (!user || !user.isPasswordMatching(req.body.password))
        return res.status(400).json({ status: 400, message: "Id or password not valid" })
    user.password = Encryption.Encrypt(req.body.newpassword, process.env.KE_PASSWORD)
    await user.save()
    return res.status(200).json({ message: "Password changed" })
}

exports.changeProfilePicUser = async function (req, res) {
    if (!req.params.id)
        return res.status(400).json({ message: "Missing data" })
    if (!req.file)
        return res.status(400).json({ message: "Wrong file type" })
    let user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).json({ message: "Email not valid" })
    if (user.profilepic != "uploads\\baseprofilepic.png") {
        //supprimer photo
    }
    user.profilepic = req.file.path
    await user.save()
    return res.status(200).json({ message: "The user's profile pic has been changed" })
}

exports.deleteAccountUser = async function (req, res) {
    if (!req.body.password || !req.params.id)
        return res.status(400).json({ message: "Missing data" })
    let user = await User.findById(req.params.id)
    if (!user || !user.isPasswordMatching(req.body.password))
        return res.status(400).json({ message: "Id or password not valid" })
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: "Account deleted" })
}

exports.changeInformationsUser = async function (req, res) {
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).json({ message: "User not found" })
    if (!req.body.name && !req.body.last_name && !req.body.phone && !req.body.address && !req.body.city && !req.body.zip)
        return res.status(400).json({ message: "No data received" })
    if (req.body.name)
        user.name = req.body.name
    if (req.body.last_name)
        user.last_name = req.body.last_name
    if (req.body.phone)
        user.phone = req.body.phone
    if (req.body.address)
        user.address = req.body.address
    if (req.body.city)
        user.city = req.body.city
    if (req.body.zip)
        user.zip = req.body.zip
    await user.save()
    return res.status(200).json({ message: "Everything went fine" })
}

// miss auto-deletion for register
// password recovery youtube.com/watch?v=lLVmH6SB2Z4