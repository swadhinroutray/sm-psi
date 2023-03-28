const { key } = require("../models/keys");
const { youtuber } = require("../models/youtubers");
const { sendError, sendResponse } = require("../utils/responseHandler");
const PSI = require("@openmined/psi.js");

async function intersectionCall(req, res) {
  try {
    // console.log(req.body, req.file);
    let rankBuffer = req.file?.buffer;

    const PSIKeys = await key.find({});
    const psi = await PSI();

    const serverRanks = await youtuber.distinct("Rank");
    try {
      const server = psi.server.createWithNewKey(PSIKeys[0].revealIntersection);
      const serverSetup = server.createSetupMessage(
        PSIKeys[0].fpr,
        PSIKeys[0].numClientElements,
        serverRanks
      );
      //* UInt8Array - Gets array from rankBuffer
      let UInt8Array = rankBuffer.buffer.slice(
        rankBuffer.byteOffset,
        rankBuffer.byteOffset + rankBuffer.byteLength
      );

      const deserializedClientRequest =
        psi.request.deserializeBinary(UInt8Array);

      const serverResponse = server.processRequest(deserializedClientRequest);
      const serializedServerResponse = serverResponse.serializeBinary();
      const serializedServerSetup = serverSetup.serializeBinary();

      const responseData = {
        setup: Buffer.from(serializedServerSetup).toString("base64"),
        response: Buffer.from(serializedServerResponse).toString("base64"),
      };
      // console.log(responseData);
      return sendResponse(res, responseData);
    } catch (error) {
      return sendError(res, error);
    }
  } catch (error) {
    return sendError(res, error);
  }
}

module.exports = {
  intersectionCall,
};
