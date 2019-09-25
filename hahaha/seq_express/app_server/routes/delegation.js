const express = require('express');
const router = express.Router();

const delegation_controller = require('../controllers/delegationController');

router.get('/set', delegation_controller.setDelegation_get);

//setDelegation
router.post('/set', delegation_controller.setDelegation_post);

//getDelegation
router.get('/getDelegation/:id', delegation_controller.getDelegation_get);

module.exports = router;
