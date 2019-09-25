const models = require('../models');
const rpc = require('json-rpc2');
const client = rpc.Client.$create(8888, 'localhost');

exports.setStake_get = function (req, res, next) {
    models.Stake.findAll().then(result => {
        res.render('stake', {
            Stakes: result
        });
    });
};

exports.setStake_post = function (req, res, next) {
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
                "method": "setStake",
                "params": {
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
        res.redirect("/stake/set");
    });
};

exports.getStake_get = function (req, res, next) {
    let _EOA = req.params.id;
    
    let args = {
        "jsonrpc": "2.0",
        "method": "icx_call",
        "id": 1234,
        "params": {
            "from": "hxbe258ceb872e08851f1f59694dac2558708ece11",
            "to": "cx0000000000000000000000000000000000000000",
            "dataType": "call",
            "data": {
                "method": "getStake",
                "params": {
                    "address": _EOA
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.render("getStake", {
            Stake: result
        });
    });
};