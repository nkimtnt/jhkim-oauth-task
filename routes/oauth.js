const router = require("express").Router();
const controller = require("../controllers/oauth");

router.get("/token", controller.tokenControl);
router.get("/validate", controller.validateControl);
router.get("/revoke", controller.revokeControl);

module.exports = router;