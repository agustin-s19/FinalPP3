const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/me", async (req, res) => {
    try{
        const accessToken = req.body.token

        const data = jwt.decode(accessToken, process.env.JWT_SEC);

        const user = await User.findById(data.id);

        res.status(200).json(user);
    }catch(err){
        res.status(500).json({});
    }
});

//REGISTER
router.post("/register", async (req,res)=>{
    const newUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        dni: req.body.dni,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        username: req.body.email
    });

    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN USER

router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email, isAdmin: false });
        !user && res.status(401).json("Los datos ingresados son incorrectos");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword != req.body.password && 
            res.status(401).json("Los datos ingresados son incorrectos");
        
        const accessToken = jwt.sign({
            id: user._id, isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
            {expiresIn:"2d"} 
        );

        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
        
    }catch(err) {
        res.status(500).json(err);
    }
});

//LOGIN ADMIN

router.post("/admin/login", async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email ,isAdmin: true });
        !user && res.status(401).json("Los datos ingresados son incorrectos");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword != req.body.password && 
            res.status(401).json("Los datos ingresados son incorrectos");
        
        const accessToken = jwt.sign({
            id: user._id, isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
            {expiresIn:"2d"} 
        );

        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
        
    }catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;