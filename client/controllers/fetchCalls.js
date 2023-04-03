import { sendError, sendResponse } from "../utils/responseHandler.js";
import youtuber from "../models/youtubers.js";

export async function getYoutubers(req, res) {
  try {
    const result = await youtuber.find({});

    return sendResponse(res, result);
  } catch (error) {
    return sendError(res, error);
  }
}
