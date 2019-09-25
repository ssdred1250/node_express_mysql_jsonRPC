const models = require('../models');
const rpc = require('json-rpc2');
const client = rpc.Client.$create(8888, 'localhost');

exports.registerPRep_get = function (req, res, next) {
    models.Prep.findAll().then(result => {
        res.render('prep', {
            Preps: result
        });
    });
};

exports.registerPRep_post = function (req, res, next) {
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
                "method": "registerPRep",
                "params": {
                    "name": body.name,
                    "email": body.email,
                    "website": body.website,
                    "country": body.country,
                    "city": body.city,
                    "details": body.details,
                    "p2pEndpoint": body.p2pEndpoint
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.redirect("/prep/register");
    });
};

exports.unregisterPRep_delete = function (req, res, next) {
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
                "method": "unregisterPRep",
            }
        }
    };

    client.call('icx_sendTransaction', args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.redirect("/prep/register");
    });
};

exports.setPRep_put = function (req, res, next) {
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
                "method": "setPRep",
                "params": {
                    "name": body.name,
                    "email": body.email,
                    "website": body.website,
                    "country": body.country,
                    "city": body.city,
                    "details": body.details,
                    "p2pEndpoint": body.p2pEndpoint
                }
            }
        }
    };

    client.call('icx_sendTransaction', args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.redirect("/prep/register");
    });
};

exports.getPRep_get = function (req, res, next) {
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
                "method": "getPRep",
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
        res.render('getPRep', {
            Prep: result
        });
    });
};

exports.getPReps_get = function (req, res, next) {
    let args = {
        "jsonrpc": "2.0",
        "method": "icx_call",
        "id": 1234,
        "params": {
            "from": "hxbe258ceb872e08851f1f59694dac2558708ece11",
            "to": "cx0000000000000000000000000000000000000000",
            "dataType": "call",
            "data": {
                "method": "getPReps",
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.render('getPReps', {
            PReps: result
        });
    });
};