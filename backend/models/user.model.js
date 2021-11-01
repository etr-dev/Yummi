const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
SCHEMA DESIGN EXAMPLE:

user:
    email: 'example@gmail.com'
files: [Object, Object, Object]


getUser('example@gmail.com').files[0] <--- Returns their first uploaded file
getUser('example@gmail.com').files[0].fileInfo.fileName <--- Returns the name of the file
*/

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    files: [
      {
        fileInfo: {
          source: { type: Buffer, required: true }, //file
          filename: { type: String, required: true }, //generatedData.csv
          mimetype: { type: String, required: true }, //text/csv
        },
        parsedData: { type: Object, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
