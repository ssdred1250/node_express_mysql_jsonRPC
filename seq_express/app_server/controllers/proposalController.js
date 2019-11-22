const models = require('../models');
const rpc = require('json-rpc2');
const client = rpc.Client.$create(8888, 'localhost');

exports.registerProposal_get = function (req, res, next) {
    models.Proposal.findAll().then(result => {
        console.log(result);
        res.render('proposal', {
            Proposals: result
        });
    });
};

exports.registerProposal_post = function (req, res, next) {
    let body = req.body;

    let args = {
        "jsonrpc": "2.0",
        "id": 1234,
        "method": "icx_sendTransaction",
        "params": {
            "version": "0x3",
            "from": "hx8f21e5c54f006b6a5d5fe65486908592151a7c57",
            "to": "cx0000000000000000000000000000000000000001",
            "stepLimit": "0x12345",
            "timestamp": "0x563a6cf330136",
            "nid": "0x3",
            "nonce": "0x0",
            "value": "0x0",
            "signature": "VAia7YZ2Ji6igKWzjR2YsGa2m5...",
            "dataType": "call",
            "data": {
                "method": "registerProposal",
                "params": {
                    "title": body.title,
                    "description": body.description,
                    "type": body.type,
                    "value": body.value,
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.redirect("/proposal/register");
    });
};

exports.voteProposal_get = function (req, res, next) {
    let _id = req.params.id;

    res.render("voteProposal", {
        id: _id
    });
};

exports.voteProposal_put = function (req, res, next) {
    let _id = req.params.id;
    let body = req.body;
    console.log("REQUEST");
    console.log(req);
    console.log(req.body);
    let args = {
        "jsonrpc": "2.0",
        "id": 1234,
        "method": "icx_sendTransaction",
        "params": {
            "version": "0x3",
            "from": "hx8f21e5c54f006b6a5d5fe65486908592151a7c57",
            "to": "cx0000000000000000000000000000000000000001",
            "stepLimit": "0x12345",
            "timestamp": "0x563a6cf330136",
            "nid": "0x3",
            "nonce": "0x0",
            "value": "0x0",
            "signature": "VAia7YZ2Ji6igKWzjR2YsGa2m5...",
            "dataType": "call",
            "data": {
                "method": "voteProposal",
                "params": {
                    "id": _id,
                    "vote": body.vote,
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.redirect('../register/');
    });
};

exports.cancelProposal_delete = function (req, res, next) {
    let _id = req.params.id;

    let args = {
        "jsonrpc": "2.0",
        "id": 1234,
        "method": "icx_sendTransaction",
        "params": {
            "version": "0x3",
            "from": "hx8f21e5c54f006b6a5d5fe65486908592151a7c57",
            "to": "cx0000000000000000000000000000000000000001",
            "stepLimit": "0x12345",
            "timestamp": "0x563a6cf330136",
            "nid": "0x3",
            "nonce": "0x0",
            "value": "0x0",
            "signature": "VAia7YZ2Ji6igKWzjR2YsGa2m5...",
            "dataType": "call",
            "data": {
                "method": "cancelProposal",
                "params": {
                    "id": _id
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.redirect("/proposal/register");
    });
};

exports.getProposal_get = function (req, res, next) {
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
                "method": "getProposal",
                "params": {
                    "id": _id
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.render('getProposal', {
            Proposal: result
        });
    });
};

exports.getProposals_get = function (req, res, next) {
    let body = req.body;

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
                "method": "getProposals",
                "params": {
                    "type": body.tyoe,
                    "status": body.status
                }
            }
        }
    };

    client.call(args.method, args, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.render('getProposals', {
            Proposals: result.proposals
        });
    });
};