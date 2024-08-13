const db = require('../config/db');

const Product = {};

Product.create = (product, result) => {
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, product, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...product });
    });
};

Product.findAll = result => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Product.findById = (id, result) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found' }, null);
    });
};

Product.updateById = (id, product, result) => {
    const sql = 'UPDATE products SET ? WHERE id = ?';
    db.query(sql, [product, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, { id: id, ...product });
    });
};

Product.remove = (id, result) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Product;
