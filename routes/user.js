const express = require('express')
const router = express.Router()
const User = require('../models/user')
var cors = require('cors')


// cors settings

// Getting all
router.get('/', cors(), async(req, res) => {

    try {
        let user;
        user = await User.find();
        res.status(201).json(user);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})
router.get('/auth', cors(), async(req, res) => {

    try {
        let user;
        console.log(req.query.length)
        if (Object.keys(req.query).length == 0) {
            console.log("hello")
            res.redirect('/users')

        } else {
            console.log("insides")
            let email = req.query.email;
            let password = req.query.password;
            user = await User.find({
                email: email,
                password: password
            });
            res.status(200).json(user);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Getting One
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// Creating one
router.post('/', async(req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        city: req.body.city,
        lag: req.body.lag,
        lat: req.body.lat,
        postalCode: req.body.postalCode,
        token: req.body.token,
        profileImgSrc: req.body.profileImgSrc,
        displayLanguage: req.body.displayLanguage,
        address: req.body.address,
        //to be moved to its own api
        notificationSettings: req.body.notificationSettings,
        notificationList: req.body.notificationList,
        //to be moved to its own api
        favouriteServiceProviders: req.body.favouriteServiceProviders,
        favouriteCategories: req.body.favouriteCategories,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getUser, async(req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getUser, async(req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    console.log("getting users")
    console.log(req.params)
    let user
    try {
        user = await User.find({
            "_id": req.params.id
        }, function(err, data) {
            if (err) {
                err.status = 406;
                return next(err)
            }
            return res.status(201).json({
                message: "sucess",
                data: data
            })
        })
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router