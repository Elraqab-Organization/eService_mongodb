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
router.patch('/add_feedback/:id', getOrder, async (req, res) => {

    if (req.body != null) {
        res.order.feedback = req.body.feedback
        res.order.rate = req.body.rate
        res.order.isFeedbackGiven = true
    }
    try {
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