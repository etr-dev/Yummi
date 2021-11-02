const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.route("/FindUser:email").get((req, res) => {
  const email = req.params.email;
  User.find({ email: email })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.route("/FindUser:email").delete((req, res) => {
  const email = req.params.email;
  User.findOneAndDelete({ email: email })
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.route("/User").post((req, res) => {
  const email = req.body.email;
  const newUser = new User({ email });
  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.route("/file:email").post((req, res) => {
  const email = req.params.email;
  const file = req.body.file; //file trying to upload
  const selectedUser = User.findOne({ email: email }); //get user by email
  let filenameExists = false;
  selectedUser
    .then((user) => {
      fileList = user.files;
      console.log(file);
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].fileInfo.filename == file.fileInfo.filename) {
          filenameExists = true;
        }
      }
      console.log(filenameExists);
      if (!filenameExists) {
        user.files.push(file);
        user
          .save()
          .then(() => res.json("File Added."))
          .catch((err) => res.status(400).json("ERROR: " + err));
      } else {
        throw "Filename already exists";
      }
    })
    .catch((err) => res.status(400).json("ERROR: " + err));
});

router.route("/file:email").delete((req, res) => {
  const email = req.params.email;
  const filename = req.body.filename; //file trying to upload
  const selectedUser = User.findOne({ email: email }); //get user by email
  let fileIndex = -1;
  selectedUser
    .then((user) => {
      fileList = user.files;
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].fileInfo.filename == filename) {
          fileIndex = i;
        }
        }
    if (fileIndex > -1) {
        user.files.splice(fileIndex, 1); //deletes the element at fileIndex
        user
          .save()
          .then(() => res.json("File Deleted."))
          .catch((err) => res.status(400).json("ERROR: " + err));
    } else {
        throw "Filename does not exist";
    }
    })
    .catch((err) => res.status(400).json("ERROR: " + err));
});

module.exports = router;
