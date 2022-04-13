const router = require('express').Router();
const controller = require('../controllers/user');

router.post('/create', controller.createControl);
router.post('/delete', controller.deleteControl);

module.exports = router;