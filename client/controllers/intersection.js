import { sendError, sendResponse } from "../utils/responseHandler.js";
import key from "../models/keys.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const urls = require("../server_routes.json");
import { FormData, Blob } from "formdata-node";
import PSI from "@openmined/psi.js/psi_wasm_node.js";

import fetch from "node-fetch";

export async function intersectionCall(req, res) {
  try {
    const psi = await PSI();

    const ranks = req.body.ranks;
    console.log(ranks);
    const PSIKeys = await key.find({});
    //* PSI Logic Implementation
    try {
      const client = psi.client.createWithNewKey(PSIKeys[0].revealIntersection);
      const clientRequest = client.createRequest(ranks);
      const serializedClientRequest = clientRequest.serializeBinary();

      let form = new FormData();
      let buf = Buffer.from(serializedClientRequest);
      let blobData = new Blob([buf]);
      form.append("data", blobData, "the_data");

      fetch(urls.intersection, { method: "POST", body: form })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          const json = data.data;
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

          if (intersection.length > 0) {
            // Display the items in the intersection
            var response = intersection.map((item) => ranks[item]);

            return sendResponse(res, response);
          } else {
            return sendResponse("No intersecting points found.");
          }
        });
      //   console.log(response.data);
    } catch (error) {
      return sendError(res, error);
    }
  } catch (error) {
    return sendError(res, error);
  }
}
