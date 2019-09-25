const models = require('../models');
const rpc = require('json-rpc2');
const client = rpc.Client.$create(8888, 'localhost');

exports.setDelegation_get = function (req, res, next) {
    models.Delegation.findAll().then(result => {
        res.render('delegation', {
            Delegations: result
        });
    });
};

exports.setDelegation_post = function (req, res, next) {
    let body = req.body;

    let args = {
        "jsonrpc": "2.0",
        "id": 1234,
        "method": "icx_sendTransaction",
        "params": {
            "version": "0x3",
            "from": body.EOA,
            "to": "cx0000000000000000000000000000000000000001",
            "stepLimit": "0x12345",
            "timestamp": "0x563a6cf330136",
            "nid": "0x3",
            "nonce": "0x0",
            "value": "0x0",
            "signature": "VAia7YZ2Ji6igKWzjR2YsGa2m5...",
            "dataType": "call",
            "data": {
                "method": "setDelegation",
                "params": {
                    "address": body.address,
                    "value": body.value
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.redirect("/delegation/set");
    });
};

exports.getDelegation_get = function (req, res, next) {
    let _id = req.params.id;

    let args = {
        "jsonrpc": "2.0",
        "id": 1234,
        "method": "icx_call",
        "params": {
            "version": "0x3",
            "from": "hx8f21e5c54f006b6a5d5fe65486908592151a7c57",
            "to": "cx0000000000000000000000000000000000000001",
            "dataType": "call",
            "data": {
                "method": "getDelegation",
                "params": {
                    "address": _id,
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.render('getDelegation', {
            Delegation: result
        });
    });
};