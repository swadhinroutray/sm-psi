const router = require("express").Router();
const controller = require("../controllers/index");

//*Test Route
router.get("/hello", controller.hello);

//* Intersection Logic
router.post("/setupkeys", controller.keySetup);

module.exports = router;
