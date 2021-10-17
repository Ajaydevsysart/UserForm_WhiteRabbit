const express = require('express')
const router = express.Router()
const User = require('../model/user')

//base route for user registration
router.get('/',(req,res)=>{
    res.render('form/form',{errMessage: req.flash('err_msg'), succMessage: req.flash('succ_msg')})
})

//submiting user detail to db
router.post('/user', async(req, res) => {
    console.log(req.body)
    const emailExist =await User.findOne({email:req.body.email})
    console.log(emailExist)
    if(emailExist){
        req.flash('err_msg', 'User already exist..!!'); 
        return res.redirect('/');
    }
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        introduction: req.body.introduction,
        email: req.body.email,
        experience: req.body.experience,
        achievements: req.body.achievements,
    });
    try {
        const savedUser = await user.save();
        req.flash('succ_msg', 'User Registered successfully..!!');
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
})


//list all users
router.get('/users',async(req,res)=>{
    users = await User.find({})
    res.render('userlist/userlist',{users,errMessage: req.flash('err_msg'), succMessage: req.flash('succ_msg')})
})

//user detail page
router.get('/userdetail/:id',async(req,res)=>{
    try{
        users = await User.findOne({_id:req.params.id})
        console.log(users)
        res.render('userlist/userdetail',{users})
    } catch (err) {
        console.log(err);
    }
  
})

//delete a user

router.get('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                req.flash('succ_msg', 'User Deleted successfully..!!');
                res.redirect('/users')
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
})




module.exports = router