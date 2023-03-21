const router = require("express").Router();
const controller = require("../controllers/index");

//*Test Route
router.get("/hello", controller.hello);

//* Intersection Logic
router.post("/keysetup", controller.keySetup);
router.get("/getkeys", controller.getKeys);
module.exports = router;
