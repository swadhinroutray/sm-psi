//! Define setupKeys function and intersection function
const { key } = require("../models/keys");
const { sendError, sendResponse } = require("../utils/responseHandler");

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
    result = await keyObj.save();
    if (!result) {
      return response.sendError(res, "Key Setup Failed");
    }
    return sendResponse(res, "Client-Server keys Established!");
  } catch (error) {
    return sendError(res, error);
  }
}

module.exports = {
  keySetup,
};
