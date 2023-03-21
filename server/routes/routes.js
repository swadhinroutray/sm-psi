const router = require("express").Router();
const controller = require("../controllers/index");

//*Test Route
router.get("/hello", controller.hello);

//* Key setup
router.post("/keysetup", controller.keySetup);
module.exports = router;
