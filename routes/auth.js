const router = require("express").Router();
const User = require("../models/User");


//REGISTER
router.post("/register",  async (req, res) => {
    const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,

    });

    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
        // console.log(err);
    }
});


// router.get("/register",  async (req, res) => {
//     const user =  await new User({
//         username: "John",
//         email: "john@gmail.com",
//         password: "123456"
//     })

//     await user.save();
//     res.send("ok")
// });

//LOGIN
router.post("/login", async (req,res)=>{

    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("user not found")

        const validPassword = await User.findOne({password:req.body.password});
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
        // console.log(err);
    }
})

module.exports = router;

