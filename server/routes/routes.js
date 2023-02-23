const router = require("express").Router();
const controller = require("../controllers/index");

//*Test Route
router.get("/hello", controller.hello);

module.exports = router;
