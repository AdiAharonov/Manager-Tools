
const router  = require("express").Router();
const currUser = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//login page
router.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body;

        // validate

        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered"})
        }

        const user = await currUser.findOne({email: email})

        if (!user) {
            return res.status(400).json({msg: "No account with this email has been registered."})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ masg: "Invalid Credentials"});
        }

        const token = jwt.sign({id: user._id},  process.env.JWT_SERCRET);

        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json({ error: err.msg})
    }
})

//register page
router.post('/register', async (req,res)=>{
    try {

        let {email, password, passwordCheck, displayName} = req.body;
        
        
        // Validate
        
    if (!email || !password || !passwordCheck) {
        return res.status(400).json({msg: "Not all fields have been entered"})
    }
    if (password.length < 5) {
        return res.status(400).json({msg: "Password too short"})
    }
    if (password !== passwordCheck) {
        return res.status(400).json({msg: "Please check again your password"})
    }

    const existingUser = await currUser.findOne({email: email})
    if (existingUser) {
        return res.status(400).json({msg: "An account with this email already exists"});
    }
    if (!displayName) {
        displayName = email;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = new currUser({
        email,
        password: passwordHash,
        displayName
    })

    const savedUser = await newUser.save();
    res.json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})


// Vlidate user && user token

router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.json(false)
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false)
        }

        const user = await currUser.findById(verified.id);
        if (!user) {
            return res.json(false)
        }

        return res.json(true)

    } catch (err) {
        res.status(500).json({ error: err.message})
    }
})

router.get('/', auth, async (req, res) => {
const user = await currUser.findById(req.user);
res.json({
    displayName: user.displayName,
    id: user._id
})
})


module.exports = router; 