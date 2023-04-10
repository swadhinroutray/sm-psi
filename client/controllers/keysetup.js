//! Define setupKeys function and intersection function

import { sendError, sendResponse } from "../utils/responseHandler.js";
import key from "../models/keys.js";
import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const urls = require("../server_routes.json");

//* Function to setup client-server keys
export async function keySetup(req, res) {
  try {
    const fpr = req.body.fpr;
    const numClientElements = req.body.numClientElements;
    const numTotalElements = req.body.numTotalElements;
    const revealIntersection = req.body.revealIntersection;
    const keyObj = new key({
      fpr: fpr,
      numClientElements: numClientElements,
      numTotalElements: numTotalElements,
      revealIntersection: revealIntersection,
    });

    try {
      const response = await axios.post(urls.keysetup, keyObj);
      if (response.data.success == false)
        return sendResponse(
          res,
          "Key already exists, please delete and reinitialize!"
        );
      result = await keyObj.save();
      if (!result) {
        return sendError(res, "Key Setup Failed");
      }
    } catch (error) {
      console.log(error);
    }

    return sendResponse(res, "Client-Server keys Established!");
  } catch (error) {
    return sendError(res, error);
  }
}

export async function getKeys(req, res) {
  try {
    const result = await key.find({});

    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
}

export async function updateKeys(req, res) {
  try {
    const fpr = await Number(req.body.fpr);
    const numClientElements = req.body.numClientElements;
    const numTotalElements = req.body.numTotalElements;
    const revealIntersection = req.body.revealIntersection;
    const keyObj = {
      fpr: fpr,
      numClientElements: numClientElements,
      numTotalElements: numTotalElements,
      revealIntersection: revealIntersection,
    };

    try {
      const response = await axios.post(urls.keyupdate, keyObj);

      if (response.data.success == false)
        return sendResponse(res, "Key update error, please try again later!");

      var result = await key.updateMany({}, keyObj);

      if (!result) {
        return sendError(res, "Key Setup Failed");
      }
      return sendResponse(res, "Keys Updated");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    return sendError(res, error);
  }
}
