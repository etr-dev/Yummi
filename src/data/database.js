import axios from "axios";
import { parseFile } from "../data/parse";

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
    url: "http://localhost:5000/users/User",
    headers: { secret: "i<3Yummi" },
    data: { email: email },
  };
}

export function deleteUser(email) {
  return {
    method: "delete",
    url: process.env.REACT_APP_API_URL + "/users/FindUser" + email,
    headers: { secret: "i<3Yummi" },
  };
}

export function findUser(email) {
  return {
    method: "post",
    url: process.env.REACT_APP_API_URL + "/users/FindUser" + email,
    headers: { secret: "i<3Yummi" },
  };
}

export function uploadFile(email, file, parsed) {
console.log('uploading file...')
  return {
    method: "post",
    url: process.env.REACT_APP_API_URL + "/users/file" + email,
    headers: { secret: "i<3Yummi" },
    data: {
      file: {
        fileInfo: {
          source: file,
          filename: file.name,
          mimetype: file.type,
        },
        parsedDate: parsed,
      },
    },
  };
}

export function deleteFile(email, filename) {
  return {
    method: "delete",
    url: process.env.REACT_APP_API_URL + "/users/file" + email,
    headers: { secret: "i<3Yummi" },
    data: {
      filename: filename,
    },
  };
}
