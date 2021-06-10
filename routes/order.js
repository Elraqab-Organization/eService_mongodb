const express = require('express')
const router = express.Router()
const Order = require('../models/orders');
var cors = require('cors')

// Getting all
router.get('/', cors(),async(req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order)
})

// Creating one
router.post('/', async(req, res) => {
    const order = new Order({
        customerId: req.body.customerId,
        serviceProviderId: req.body.serviceProviderId,
        postId: req.body.postId,
        status: req.body.status,
        problemDiscription: req.body.problemDiscription,
        serviceDescription: req.body.serviceDescription,
        diagnosingFees: req.body.diagnosingFees,
        serviceFees: req.body.serviceFees,
        provisionDate: req.body.provisionDate,
        timestamp: req.body.timestamp,
        paymentMethod: req.body.paymentMethod,
        responseTime: req.body.responseTime,
        steps: req.body.responseTime
    })
    try {
        const newUser = await order.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getOrder, async(req, res) => {
    if (req.body.name != null) {
        res.order.name = req.body.name
    }

    try {
        const updatedOrder = await res.order.save()
        res.json(updatedOrder)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getOrder, async(req, res) => {
    try {
        await res.order.remove()
        res.json({ message: 'Deleted order' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getOrder(req, res, next) {
    let order
    try {
        order = await Order.findById(req.params.id)
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