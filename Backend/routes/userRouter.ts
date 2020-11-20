
const router  = require("express").Router();
const currUser = require("../models/userModel");
const bcrypt = require("bcrypt");

//login page
router.get('/', (req,res)=>{
    res.send('welcome');
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
        return res.ststus(400).json({masg: "An account with this email already exists"});
    }
    if (!displayName) {
        displayName = email;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt)
    console.log(passwordHash)
    } catch (err) {
        res.status(500).json(err);
    }  
})

module.exports = router; 