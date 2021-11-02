import axios from "axios";
import { parseFile } from "../data/parse";

export function initializeUser(email) {
  axios(findUser(email))
    .then((response) => {
      if (response.data.length == 0) {
        //if account does not exist
        console.log("creating account");
        axios(createUser(email));
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

export function findActiveFile(user) {
  for (let i = 0; i < user.files.length; i++) {
    if (user.files[i].fileInfo.filename == user.activeFile) {
      return i;
    }
  }
}

//API FUNCTIONS FOR DATABASE
export function getAllUsers() {
  return {
    method: "get",
    url: "http://localhost:5000/users/",
    headers: { secret: "i<3Yummi" },
  };
}

export function createUser(email) {
  return {
    method: "post",
    url: process.env.REACT_APP_API_URL + "/users/User/",
    headers: { secret: "i<3Yummi" },
    data: { email: email },
  };
}

export function deleteUser(email) {
  return {
    method: "delete",
    url: process.env.REACT_APP_API_URL + "/users/FindUser/",
    headers: { secret: "i<3Yummi", email: email },
  };
}

export function findUser(email) {
  return {
    method: "get",
    url: process.env.REACT_APP_API_URL + "/users/FindUser/",
    headers: { secret: "i<3Yummi", email: email },
  };
}

export function uploadFile(email, file, parsed) {
  return {
    method: "post",
    url: process.env.REACT_APP_API_URL + "/users/file/",
    headers: { secret: "i<3Yummi", email: email },
    data: {
      file: {
        fileInfo: {
          source: file,
          filename: file.name,
          mimetype: file.type,
        },
        parsedData: parsed,
      },
    },
  };
}

export function deleteFile(email, filename) {
  return {
    method: "delete",
    url: process.env.REACT_APP_API_URL + "/users/file/",
    headers: { secret: "i<3Yummi", email: email },
    data: {
      filename: filename,
    },
  };
}

export function setActive(email, filename) {
  console.log("uploading file...");
  return {
    method: "post",
    url: process.env.REACT_APP_API_URL + "/users/ActiveFile/",
    headers: { secret: "i<3Yummi", email: email },
    data: {
      filename: filename,
    },
  };
}

export function deleteActive(email, filename) {
  return {
    method: "delete",
    url: process.env.REACT_APP_API_URL + "/users/ActiveFile/",
    headers: { secret: "i<3Yummi", email: email },
    data: {
      filename: filename,
    },
  };
}
