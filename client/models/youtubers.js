import * as mongoose from "mongoose";

const youtuberSchema = new mongoose.Schema({
  Rank: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  youtubeURL: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
  },
  Category: {
    type: String,
  },
  Subscribers: {
    type: String,
  },
  audienceCountry: {
    type: String,
  },
});

const youtuber = mongoose.model("youtubers", youtuberSchema);
export default youtuber;
