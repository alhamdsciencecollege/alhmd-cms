const express = require('express');
const router = express.Router();
const honourRollController = require('../controllers/honourRollController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.use(auth, roleCheck('ADMIN'));

router.get('/', honourRollController.listHonourRoll);
router.post('/', honourRollController.createHonourRoll);
router.put('/:id', honourRollController.updateHonourRoll);
router.delete('/:id', honourRollController.deleteHonourRoll);

module.exports = router;
