//! Define setupKeys function and intersection function
const { key } = require("../models/keys");
const { sendError, sendResponse } = require("../utils/responseHandler");
const axios = require("axios");
const urls = require("../server_routes.json");

//* Function to setup client-server keys
async function keySetup(req, res) {
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

async function getKeys(req, res) {
  try {
    const result = await key.find({});
    console.log(result);
    return res.sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
}
module.exports = {
  keySetup,
  getKeys,
};
