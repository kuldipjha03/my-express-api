const Product = require('../models/productModel');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    const product = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };

    Product.create(product, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || 'Some error occurred while creating the product.'
            });
        }
        res.send(data);
    });
};

exports.findAll = (req, res) => {
    Product.findAll((err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || 'Some error occurred while retrieving products.'
            });
        }
        res.send(data);
    });
};

exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                return res.status(404).send({
                    message: `Not found Product with id ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: 'Error retrieving Product with id ' + req.params.id
            });
        }
        res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Product.updateById(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                return res.status(404).send({
                    message: `Not found Product with id ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: 'Error updating Product with id ' + req.params.id
            });
        }
        res.send(data);
    });
};

exports.delete = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                return res.status(404).send({
                    message: `Not found Product with id ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: 'Could not delete Product with id ' + req.params.id
            });
        }
        res.send({ message: `Product was deleted successfully!` });
    });
};
