const User = require('../models/userModel')

// if (!req.body.email || !req.body.name || !req.body.password)
//     return res.status(400).send({ message: "Missing data" }) // find a way to replace this
// verifier is email est correct
// verifier si minimum lettre prénom nom

exports.registerUser = async function (req, res) {
    // req.assert('name', 'Name cannot be blank').notEmpty();
    // req.assert('email', 'Email is not valid').isEmail();
    // req.assert('email', 'Email cannot be blank').notEmpty();
    // req.assert('password', 'Password must be at least 4 characters long').len(4);
    // req.sanitize('email').normalizeEmail({ remove_dots: false });
   
    // // Check for validation errors    
    // var errors = req.validationErrors();
    // if (errors) { return res.status(400).send(errors); }

    // let user = await User.findOne({ email: req.body.email })
    // if (user)
    //     return res.status(400).send({ message: "Email already used" }) -> normally managed bu mongoose with unique
    user = new User({
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    user.Encrypt(req.body.password) // default
    try {
        await user.save()
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" })
    }

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