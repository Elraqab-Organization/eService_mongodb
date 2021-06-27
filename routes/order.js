const express = require('express')
const router = express.Router()
const Order = require('../models/orders');
var cors = require('cors')
const userSchema = require("../models/user");

// gets all orders for customer or service provider
router.get('/:id', cors(), async (req, res) => {
    try {
        let orders;
        req.body.isServiceProvider ?
            orders = await Order.find({ serviceProviderId: req.params.id }) :
            orders = await Order.find({ customerId: req.params.id })

        if (orders.length != 0) {

            res.json(orders)
        }
        else
            res.json({ message: "No orders was found" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// creates new order by passing all required attributes
router.post('/create', async (req, res) => {
    const today = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const order = new Order({
        id: req.body.id,
        customerId: req.body.customerId,
        serviceProviderId: req.body.serviceProviderId,
        customer: await userSchema.findById(req.body.customerId, 'name profileImgSrc'),
        serviceProvider: await userSchema.findById(req.body.serviceProviderId, 'name profileImgSrc'),
        postId: req.body.id,
        feedbackId: req.body.id,
        status: req.body.status,
        problemDescription: req.body.problemDescription,
        paymentMethod: req.body.paymentMethod,
        diagnosingFees: req.body.diagnosingFees,
        serviceDescription: req.body.serviceDescription,
        steps: req.body.steps,
        serviceFees: req.body.serviceFees,
        provisionDate: today.toLocaleDateString(undefined, options),
        responseTime: Math.round(today.getHours() / 24) + " hrs ago",
    })
    try {
        const newUser = await order.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// send order id and new status
router.patch('/:id', getOrder, async (req, res) => {

    if (req.body.status != null) {
        res.order.status = req.body.status
    }
    try {
        console.log(res.order)
        const updatedOrder = await res.order.save()
        res.json(updatedOrder)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// finds order by id
async function getOrder(req, res, next) {
    let order
    try {
        order = await Order.findById(req.params.id);

        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.order = order
    next()
}

module.exports = router