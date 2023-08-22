import { Schema, model } from "mongoose";

const userSchema = new Schema({
  // firstName: {
  //     type: String,
  //     required: true,        // Field must be provided
  //     maxlength: 50,         // Maximum length allowed for the first name
  //     trim: true             // Remove leading and trailing spaces
  //   },
  //   lastName: {
  //     type: String,
  //     required: true,        // Field must be provided
  //     maxlength: 50,         // Maximum length allowed for the last name
  //     trim: true             // Remove leading and trailing spaces
  //   },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    trim: true, // Remove leading and trailing spaces
  },

  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
