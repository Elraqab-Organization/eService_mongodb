const express = require('express')
const router = express.Router()
const Order = require('../models/orders');
var cors = require('cors')
const userSchema = require("../models/user");

// gets all orders for customer or service provider
router.get('/', cors(), async (req, res) => {
    try {
        let orders;
        req.query.type === "true" ?
            orders = await Order.find({ serviceProviderId: req.query.id }) :
            orders = await Order.find({ customerId: req.query.id })

        if (orders.length != 0) {
            console.log(orders);
            res.json(orders)
        }
        else
            res.json("No orders was found")

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// creates new order by passing all required attributes
router.post('/create', cors(), async (req, res) => {
    console.log("GG");
    // const today = new Date()
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // const order = new Order({
    //     id: req.body.id,
    //     customerId: req.body.customerId,
    //     serviceProviderId: req.body.serviceProviderId,
    //     customer: await userSchema.findById(req.body.customerId, 'name profileImgSrc'),
    //     serviceProvider: await userSchema.findById(req.body.serviceProviderId, 'name profileImgSrc'),
    //     postId: req.body.id,
    //     feedbackId: req.body.id,
    //     status: req.body.status,
    //     problemDescription: req.body.problemDescription,
    //     paymentMethod: req.body.paymentMethod,
    //     serviceFees: req.body.serviceFees,
    //     steps: req.body.steps,
    //     serviceDescription: req.body.serviceDescription,
    //     diagnosingFees: req.body.diagnosingFees,
    //     provisionDate: today.toLocaleDateString(undefined, options),
    //     responseTime: Math.round(today.getHours() / 24) + " hrs ago",
    // })
    // try {
    //     const newUser = await order.save()
    //     res.status(201).json(newUser)
    // } catch (err) {
    //     res.status(400).json({ message: err.message })
    // }

    console.log(req.query.type);
    console.log(req.query.request);
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