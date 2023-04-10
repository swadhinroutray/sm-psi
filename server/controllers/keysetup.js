const { key } = require("../models/keys");
const { sendError, sendResponse } = require("../utils/responseHandler");

async function keySetup(req, res) {
  try {
    const count = await key.count({});
    if (count > 0) {
      return res.sendResponse(res, "Failed");
    } else {
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
      return sendResponse(res, "Server key Established!");
    }
  } catch (error) {
    return sendError(res, error);
  }
}

async function keyUpdate(req, res) {
  try {
    const fpr = Number(req.body.fpr);
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
      result = await key.updateMany({}, keyObj);
      if (!result) {
        return sendError(res, "Key Setup Failed");
      }
      return sendResponse(res, "Updated Keys");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    return sendError(res, error);
  }
}
module.exports = {
  keySetup,
  keyUpdate,
};
