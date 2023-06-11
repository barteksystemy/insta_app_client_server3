const {array, tagsArray, convertedTagsArray} = require("./model");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

module.exports = {
  getAllTags: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
          resolve(tagsArray);
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllConvertedTags: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!convertedTagsArray[0]) {
          tagsArray.map(function (elem, i) {
            convertedTagsArray.push(
              {
                id: i,
                name: elem,
                popularity: Math.floor(Math.random() * 1000)
              }
            )
        })
        }
          resolve(convertedTagsArray);
      } catch (error) {
        reject(error);
      }
    });
  },
  getOneTag: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!convertedTagsArray[0]) {
          resolve("Nie ma takiego elementu w tablicy")
        } else {
          if (req.url.slice(10) >= convertedTagsArray.length || req.url.slice(10) < 0) {
            resolve("Nie ma elementu o takim id w tablicy")
          } else {
            resolve(convertedTagsArray[req.url.slice(10)]);
          }
        } 
      } catch (error) {
        reject(error);
      }
    });
  },
  createTag: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data2 = JSON.parse(data)
        let obj;
        let zmienna = 0;
        for (let i = 0; i < tagsArray.length; i++) {
          if (data2.name == tagsArray[i]) {
            zmienna++;
          }
        }
        if (zmienna != 1) {
          tagsArray.push(data2.name)
            obj = {
              id: tagsArray.length,
              name: data2.name,
              popularity: data2.popularity
            }
            convertedTagsArray.push(obj)
            resolve(obj)
        } else if (zmienna == 1) {
          resolve("Taki tag jest już w tablicy!")
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};
