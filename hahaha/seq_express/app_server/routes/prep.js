const express = require('express');
const router = express.Router();

const prep_controller = require('../controllers/prepController');

router.get('/register', prep_controller.registerPRep_get);

//registerPRep
router.post('/register', prep_controller.registerPRep_post);

//unregisterPRep
router.delete('/unregister', prep_controller.unregisterPRep_delete);

//setPRep
router.put('/set', prep_controller.setPRep_put);

//getPRep
router.get('/getPRep/:id', prep_controller.getPRep_get);

//getPReps
router.get('/getPReps', prep_controller.getPReps_get);


module.exports = router;
