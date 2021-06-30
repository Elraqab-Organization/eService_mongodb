const express = require('express')
const router = express.Router()
const User = require('../models/user')
const ServiceProvider = require('../models/service_provider')
var cors = require('cors')

router.get('/', cors(), async (req, res) => {

    try {
        let user;
        user = await User.find();
        res.status(201).json(user);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})
router.get('/categories', cors(), async (req, res) => {

    try {
        let user;
        user = await User.find({ isServiceProvider: true });
        res.status(201).json(user);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }

})
router.post('/login/auth', cors(), async (req, res) => {

    try {
        let user;
        if (Object.keys(req.body).length == 0) {

            res.status(500).json({ message: "lost of required data" });

        } else {
            user = await User.find({
                email: req.body.email,
                password: req.body.password
            });
            if (Object.keys(user).length == 0) {

                res.status(500).json({ message: "invalid email or password" });
            } else {
                res.status(200).json(user);
            }
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/signup/auth', cors(), async (req, res) => {

    try {

        if (Object.keys(req.body).length == 0) {
            res.status(500).json({ message: "lost of required data" });
        } else {
            user = await User.find({
                email: req.body.email,
            });
        }
        if (Object.keys(user).length == 0) {
            user = new User({
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                imgSrc: req.body.imgSrc,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                city: req.body.city,
                country: req.body.country,
                phoneNumber: req.body.phoneNumber,
                postalCode: req.body.postalCode,
                long: req.body.long,
                lat: req.body.lat,
                displayLanguage: req.body.displayLanguage,
                token: req.body.token,
                isServiceProvider: req.body.isServiceProvider,
                isCashPaymentActive: req.body.isCashPaymentActive,
                jobName: req.body.jobName,
                jobDescription: req.body.jobDescription,
                rate: req.body.rate,
                diagnosingFees: req.body.diagnosingFees,
                notification: {
                    showNotificatoin: req.body.showNotificatoin,
                    allowNotificationDot: req.body.allowNotificationDot,
                    excutivePrograms: req.body.excutivePrograms,
                    discountsDeals: req.body.discountsDeals
                },
            })
            user.save();
            res.status(200).json(user);
        } else {

            res.status(500).json({ message: "email already exist" });
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
router.post('/', async (req, res) => {
    user = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imgSrc: req.body.imgSrc,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        city: req.body.city,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        postalCode: req.body.postalCode,
        long: req.body.long,
        lat: req.body.lat,
        displayLanguage: req.body.displayLanguage,
        token: req.body.token,
        isServiceProvider: req.body.isServiceProvider,
        isCashPaymentActive: req.body.isCashPaymentActive,
        notification: {
            showNotificatoin: req.body.showNotificatoin,
            allowNotificationDot: req.body.allowNotificationDot,
            excutivePrograms: req.body.excutivePrograms,
            discountsDeals: req.body.discountsDeals
        },
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.post('/service-provider/create', async (req, res) => {
    const user = new ServiceProvider({
        // add attributes
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.id != null) {
        res.user.id = req.body.id
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.find({
            "_id": req.params.id
        }, function (err, data) {
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