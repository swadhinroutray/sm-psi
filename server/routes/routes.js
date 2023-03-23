const router = require("express").Router();
const controller = require("../controllers/index");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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

module.exports = router;
