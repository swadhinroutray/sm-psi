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

module.exports = {
  keySetup,
};
