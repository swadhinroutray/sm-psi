// const router = require("express").Router();
// const controller = require("../controllers/index");

"use strict";
import express from "express";
import { Hello } from "../controllers/hello.js";
var router = express.Router();
// const router = Router.Router();
import { intersectionCall } from "../controllers/intersection.js";
import { keySetup, getKeys, updateKeys } from "../controllers/keysetup.js";
import { getYoutubers } from "../controllers/fetchCalls.js";
//*Test Route
router.get("/hello", Hello);

//* Intersection Logic
router.post("/keysetup", keySetup);
router.get("/getkeys", getKeys);

router.post("/intersection", intersectionCall);
router.get("/getyoutubers", getYoutubers);
router.post("/updatekeys", updateKeys);
export default router;
