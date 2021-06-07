const userModel = require('../models/user_model')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const result = await userModel.get()
        return res.json(result)
    }
    catch (e) {
        return next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const result = await userModel.getById(req.params.id)
        if (!result) return res.sendStatus(404)
        return res.json(result)
    }
    catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const result = await userModel.create(req.body)
        if (!result) return res.sendStatus(409)
        return res.status(201).json(result)
    }
    catch (e) {
        return next(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await userModel.delete(req.params.id)
        if (!result) return res.sendStatus(404)
        return res.sendStatus(200)
    }
    catch (e) {
        return next(e)
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const doc = await userModel.getById(id)
        if (!doc) return res.sendStatus(404)

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => doc[key] = data[key])

        const updateResult = await userModel.update(id, doc)
        if (!updateResult) return res.sendStatus(404)

        return res.json(doc)
    }
    catch (e) {
        return next(e)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const updateResult = await userModel.update(req.params.id, req.body)
        if (!updateResult) return res.sendStatus(404)

        const result = await userModel.getById(req.params.id)
        return res.json(result)

    }
    catch (e) {
        return next(e)
    }
})

module.exports = router