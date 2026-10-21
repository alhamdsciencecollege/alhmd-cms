const express = require('express');
const router = express.Router();
const deploymentController = require('../controllers/deploymentController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.use(auth, roleCheck('ADMIN'));

router.get('/', deploymentController.listTargets);
router.post('/:target', deploymentController.triggerDeployment);

module.exports = router;
