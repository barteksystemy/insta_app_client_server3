const {array} = require("./model");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  postImage: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let form = formidable({});
        form.uploadDir = __dirname + "/upload/"; // folder do zapisu zdjęcia
        form.keepExtensions = true
        form.parse(req, function (err, fields, files) {
          if (files.file == undefined) {
            resolve({
            album: "brak pliku",
            originalName: "brak pliku",
            path: "brak pliku",
            timestap: "brak pliku",
          });
          } else {
          const verifyToken = async (token) => {

              try {
                let decoded = await jwt.verify(token, process.env.SECRET_KEY)
                let folderPath = files.file.path.split("\\");
          let urlPath =
            "app/upload/"+ decoded.email + "\\" + folderPath[8];
            console.log(folderPath);
          
          if (!fs.existsSync("./app/upload/" + decoded.email)) {
            fs.mkdir("./app/upload/" + decoded.email, (err) => {
              if (err) throw err;
              fs.rename(
                "./app/upload/" + folderPath[8],
                "./app/upload/" + decoded.email + "/" + folderPath[8],
                function (err) {
                  if (err) throw err;
                }
              );
            });
          } else {
            fs.rename(
              "./app/upload/" + folderPath[8],
              "./app/upload/" + decoded.email + "/" + folderPath[8],
              function (err) {
                if (err) throw err;
              }
            );
          }
          resolve({
            album: decoded.email,
            originalName: files.file.name,
            path: urlPath,
            timestap: files.file.lastModifiedDate,
            usersEmail: decoded.email,
            usersName: decoded.name
          });
              }
              catch (ex) {
                resolve(ex.message)
              }
          }
          
          const processToken = async () => {
              await verifyToken(req.headers.authorization.split(" ")[1])
          }
          processToken(req.headers.authorization.split(" ")[1])
        }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deletePhoto: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let photoId = req.url.split("/")[3]
        
        if (!array[0]) {
          resolve("Nie ma żadnego zdjęcia w tablicy!");
        } else {
        
        array.forEach(element => {
          if (photoId == element.id) {
            const filepath = path.join(__dirname, element.url)
            if (fs.existsSync(filepath)) {
              fs.unlink(filepath, (err) => {
                if (err) throw err;
                resolve("Zdjęcie usunięte!");
              });
            } else {
              resolve("Zdjęcie nie istnieje!");
            }
          } else {
            resolve("Zdjęcia nie ma w tablicy!")
          }
        });
      }
      } catch (error) {
        reject(error);
      }
    });
  },
  addTagToThePhoto: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data2 = JSON.parse(data)
        // console.log("data2:", data2);
        if (array.length == 0) {
          resolve("Nie można dodać taga zdjęciu, które nie istnieje!");
        } else {
          let element = array.find(x=>x.id==data2.id)
          if (element) {
            element.tags = [
              {
                name: data2.name,
                popularity: data2.popularity
              }
            ]
            resolve(element)
          } else {
            resolve("Nie można znaleźć zdjęcia o takim id!")
          }
        }
      
      } catch (error) {
        reject(error);
      }
    });
  },
  addTagsToThePhoto: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data2 = JSON.parse(data)
        if (array.length == 0) {
          resolve("Nie można dodać tagów zdjęciu, które nie istnieje!");
        } else {
          let element = array.find(x=>x.id==data2.id)
          if (element) {
            element.tags = data2.tab
            resolve(element)
          } else {
            resolve("Nie można znaleźć zdjęcia o takim id!")
          }
        }
      
      } catch (error) {
        reject(error);
      }
    });
  },
  getPhoto: (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        fs.readFile(url, (err, data) => {
          if (err) {
            resolve(err)
          } else {
            resolve(data)
          }
        })
      } catch (error) {
        reject(error);
      }
    });
  },
};
