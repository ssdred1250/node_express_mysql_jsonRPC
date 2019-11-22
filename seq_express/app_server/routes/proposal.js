const express = require('express');
const router = express.Router();

const proposal_controller = require('../controllers/proposalController');

router.get('/register', proposal_controller.registerProposal_get);

//registerProposal
router.post('/register', proposal_controller.registerProposal_post);

//voteProposal
router.get('/vote/:id', proposal_controller.voteProposal_get);

router.put('/vote/:id', proposal_controller.voteProposal_put);
//voteProposal

//cancelProposal
router.delete('/cancel/:id', proposal_controller.cancelProposal_delete);

//getProposal
router.get('/getProposal/:id', proposal_controller.getProposal_get);

//getProposals
router.get('/getProposals', proposal_controller.getProposals_get);

module.exports = router;
