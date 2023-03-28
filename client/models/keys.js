import * as mongoose from "mongoose";

const keySchema = new mongoose.Schema({
  fpr: {
    //? False Positive Rate
    type: String,
    required: true,
  },
  numClientElements: {
    //? Maximum number of client to check in query
    type: Number,
    required: true,
  },
  numTotalElements: {
    //? Maximum size of the server set
    type: Number,
    required: true,
  },
  revealIntersection: {
    //? Do we want to see the intersection points?
    type: Boolean,
    required: true,
  },
});

const key = mongoose.model("keys", keySchema);
export default key;
