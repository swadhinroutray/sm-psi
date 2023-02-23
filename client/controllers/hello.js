const { sendError, sendResponse } = require("../utils/responseHandler");

async function hello(req, res) {
  try {
    return sendResponse(res, "Well Hello");
  } catch (error) {
    return sendError(res, error);
  }
}

module.exports = {
  hello,
};
