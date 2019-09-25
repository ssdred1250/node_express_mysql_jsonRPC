const express = require('express');
const router = express.Router();

const stake_controller = require('../controllers/stakeController');

router.get('/set', stake_controller.setStake_get);

//setStake
router.post('/set', stake_controller.setStake_post);

//getStake
router.get('/getStake/:id', stake_controller.getStake_get);

module.exports = router;
