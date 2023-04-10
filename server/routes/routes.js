const router = require("express").Router();
const controller = require("../controllers/index");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer(storage);

//*Test Route
router.get("/hello", controller.hello);

//* Key setup
router.post("/keysetup", controller.keySetup);
router.post(
  "/intersection",
  upload.single("data"),
  controller.intersectionCall
);
// router.post("/intersection", controller.intersectionCall);

router.post("/keyupdate", controller.keyUpdate);
module.exports = router;
