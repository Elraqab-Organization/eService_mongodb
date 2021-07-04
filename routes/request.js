var cors = require('cors');
const { request } = require('express');
const express = require('express')
const router = express.Router()
const Request = require("../models/requests");
const User = require("../models/user");
const Order = require('../models/orders');
const Feedback = require('../models/feedback');


// gets all request for customer or service provider
router.get('/', cors(), async (req, res) => {
    try {

        console.log(req.query.type);
        console.log(req.query.id);
        let request;
        req.query.type === "true" ?
            request = await Request.find({ serviceProviderId: req.query.id }) :
            request = await Request.find({ customerId: req.query.id })

        if (request.length != 0) {

            res.json(request)
        }
        else
            res.json("No request was found")

    } catch (err) {
        res.status(500).json("No request was found")
    }
})

// creates new request by passing all required attributes
router.post('/create', async (req, res) => {
    const today = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const request = new Request({
        id: req.body.id,
        customerId: req.body.customerId,
        serviceProviderId: req.body.serviceProviderId,
        description: req.body.description,
        fees: req.body.fees,
        payment: req.body.payment,
        location: req.body.location,
        customer: await User.findById(req.body.customerId, 'firstName lastName imgSrc'),
        serviceProvider: await User.findById(req.body.serviceProviderId, 'firstName lastName imgSrc'),
        provisionDate: today.toLocaleDateString(undefined, options),
        time: Math.round(today.getHours() / 24) + " hrs ago",
    })
    try {
        const newUser = await request.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// send request id and new status
router.patch('/:id', getRequest, async (req, res) => {

    if (req.params.id != null) {
        // accept, reject, pend
        res.request.status = req.body.status
    }
    try {
        const updatedRequest = await res.request.save()

        if (req.body.status === "Accepted") {
            const today = new Date()
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const order = new Order({
                customerId: res.request.customerId,
                serviceProviderId: res.request.serviceProviderId,
                customer: await User.findById(res.request.customerId, 'firstName lastName imgSrc'),
                serviceProvider: await User.findById(res.request.serviceProviderId, 'firstName lastName imgSrc diagnosingFees'),
                status: res.request.status,
                problemDescription: res.request.description,
                paymentMethod: res.request.payment,
                serviceFees: res.request.fees,
                location: res.request.location,
                feedbackId: "none",
                serviceDescription: "none",
                provisionDate: today.toLocaleDateString(undefined, options),
                responseTime: Math.round(today.getHours() / 24) + " hrs ago",
                feedback: new Feedback({})
            })
            try {
                const newUser = await order.save()
                res.status(201).json(newUser)
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        }
        // res.json(updatedRequest)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// finds request by id
async function getRequest(req, res, next) {
    let request
    try {

        request = await Request.findById(req.params.id);

        if (request == null) {
            return res.status(404).json({ message: 'Cannot find request' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.request = request
    next()
}

module.exports = router