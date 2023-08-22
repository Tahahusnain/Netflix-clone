import { Schema, model } from "mongoose";

const resetTokenShema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const ResetToken = model("ResetToken", resetTokenShema);

export default ResetToken;
