const express = require("express")
const inventoryRouter = express.Router()
const Inventory = require("../models/inventory")


inventoryRouter.route("/")
.get((req, res, next)=>{
    Inventory.find()
        .then(response => res.status(200).send(response))
        .catch(error => next(error))
})
.post((req, res, next) => {
    const newItem = new Inventory(req.body)
    newItem.save()
        .then(response => res.status(201).send(response))
        .catch(error => next(error))
})

inventoryRouter.route("/:itemId")
.get((req, res, next) => {// get one item
    const itemId = req.params.itemId
    Inventory.findById(itemId)
        .then(response => res.status(200).send(response))
        .catch(err => next(err))
})
.delete((req, res, next) => {
    const itemId = req.params.itemId
    Inventory.findByIdAndDelete(itemId)
        .then(response => res.status(200).send(response))
        .catch(err => next(err))
})
.put((req, res, next) => {
    const itemId = req.params.itemId
    Inventory.findByIdAndUpdate(itemId, req.body)
        .then(response => res.status(201).send(req.body))
        .catch(err => next(err))
})








module.exports = inventoryRouter