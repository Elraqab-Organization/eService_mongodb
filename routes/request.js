var cors = require('cors');
const { request } = require('express');
const express = require('express')
const router = express.Router()
const Request = require("../models/requests");
const User = require("../models/user");

// gets all request for customer or service provider
router.get('/:id', cors(), async (req, res) => {
    try {

        let request;
        req.body.isServiceProvider ?
            request = await Request.find({ serviceProviderId: req.params.id }) :
            request = await Request.find({ customerId: req.params.id })

        if (request.length != 0) {

            res.json(request)
        }
        else
            res.json({ message: "No request was found" })

    } catch (err) {
        res.status(500).json({ message: err.message })
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

        // if (req.body.status === "accepted") {
        //     res.redirect("/orders/create", { type: 'request', data: request })
        // }
        res.json(updatedRequest)
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