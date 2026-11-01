const express = require('express');
const router = express.Router();
const landingConfigController = require('../controllers/landingConfigController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Landing page settings are an admin-only Configurations tab.
router.use(auth, roleCheck('ADMIN'));

router.get('/', landingConfigController.getLandingConfig);
router.put('/', landingConfigController.updateLandingConfig);

module.exports = router;
