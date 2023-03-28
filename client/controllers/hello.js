import { sendError, sendResponse } from "../utils/responseHandler.js";

export async function Hello(req, res) {
  try {
    return sendResponse(res, "Well Hello");
  } catch (error) {
    return sendError(res, error);
  }
}
