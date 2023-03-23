const { key } = require("../models/keys");
const { youtuber } = require("../models/youtubers");
const { sendError, sendResponse } = require("../utils/responseHandler");
const axios = require("axios");
const urls = require("../server_routes.json");
const FormData = require("form-data");
const { Blob } = require("buffer");
const PSI = require("@openmined/psi.js");
const fse = require("fs-extra");
async function intersectionCall(req, res) {
  try {
    const psi = await PSI();

    const ranks = req.body.ranks;
    const PSIKeys = await key.find({});
    //* PSI Logic Implementation

    try {
      const client = psi.client.createWithNewKey(PSIKeys[0].revealIntersection);
      const clientRequest = client.createRequest(ranks);
      const serializedClientRequest = clientRequest.serializeBinary();
      console.log(serializedClientRequest);
      let buf = Buffer.from(serializedClientRequest);
      console.log(buf);
      const form = new FormData();
      form.append("data", new Blob([buf]), "the_data");
      console.log(1);
      fetch(urls.intersection, { method: "POST", body: form })
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          let setupBuffer = Buffer.from(json.setup, "base64");
          let serializedServerSetup = setupBuffer.buffer.slice(
            setupBuffer.byteOffset,
            setupBuffer.byteOffset + setupBuffer.byteLength
          );

          let responseBuffer = Buffer.from(json.response, "base64");
          let serializedServerResponse = responseBuffer.buffer.slice(
            responseBuffer.byteOffset,
            responseBuffer.byteOffset + responseBuffer.byteLength
          );

          const deserializedServerResponse = psi.response.deserializeBinary(
            serializedServerResponse
          );

          const deserializedServerSetup = psi.serverSetup.deserializeBinary(
            serializedServerSetup
          );

          // Reveal the intersection (only if `revealIntersection` was set to true)
          const intersection = client.getIntersection(
            deserializedServerSetup,
            deserializedServerResponse
          );

          // intersection contains the index of the items in the
          // client_data.known_points array. It isn't very useful on its own
          // console.log('intersection', intersection)

          console.log("\n\nDisplaying intersecting points:\n");
          if (intersection.length > 0) {
            // Display the items in the intersection
            console.log(
              intersection.map((item) => client_data.known_points[item])
            );
          } else {
            console.log("No intersecting points found.");
          }
        });
      //   console.log(response.data);
      return sendResponse(res, response);
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
