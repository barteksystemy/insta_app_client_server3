const {array} = require("./model");
module.exports = {
  postImagejson: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.album == "brak pliku" && data.originalName == "brak pliku" && data.path == "brak pliku" && data.timestap == "brak pliku") {
          resolve("Nie wybrano pliku!")
        } else {
          let obj = {
          id: Date.now(),
          album: data.album,
          originalName: data.originalName,
          url: data.path,
          lastChange: "original",
          usersEmail: data.usersEmail,
          usersName: data.usersName,
          history: [
            {
              status: "original",
              timestap: Date.now(),
            },
          ]
        };
        resolve(obj);
        array.push(obj);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getPhotos: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (array[0] == undefined) {
          resolve("Nie ma żadnego zdjęcia w bazie danych!");
        } else {
          resolve(array);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getOnePhoto: (link) => {
    let link2 = link.slice(12);
    return new Promise(async (resolve, reject) => {
      try {
        array.forEach((element) => {
          if (element.id == link2) {
            resolve(element);
          }
        });

        if (array[0] == undefined) {
          resolve("Nie ma zdjęcia o takim id!");
        }
        array.forEach((element) => {
          if (element.id != link2) {
            resolve("Nie ma zdjęcia o takim id!");
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  patchPhoto: (link) => {
    let n = -1;
    let link2 = link.slice(12);
    array.forEach((element) => {
      if (link2 == element.id) {
        element.history.forEach((element2) => {
          n++;
        });
      }
    });
    return new Promise(async (resolve, reject) => {
      try {
        n++;
        array.forEach((element) => {
          if (element.id == link2) {
            element.lastChange = "zmienione" + n;
            element.history.push({
              status: "zmienione" + n,
              timestap: Date.now(),
            });
            resolve(element);
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

        array.forEach(element => {
          if (photoId == element.id) {
            const index = array.indexOf(element)
            array.splice(index, 1);
          }
        });
        resolve("ok")
      } catch (error) {
        reject(error);
      }
    });
  },
  getPhotoTag: (link) => {
    let link2 = link.slice(17);
    let obj;
    return new Promise(async (resolve, reject) => {
      try {
        if (array.length == 0) {
          resolve("Nie można znaleźć tagów zdjęcia, które nie istnieje!");
        } else {
          let element = array.find(x=>x.id==link2)
          if (element) {
            if (element.tags) {
              obj = {
                id: element.id,
                tags: element.tags
              }
            } else {
              obj = {
                id: element.id,
              }
            }
            resolve(obj)
          } else {
            resolve("Nie można znaleźć zdjęcia!")
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getPhotoUrl: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let element = array.find(x=>x.id==id)
        resolve(element.url)
      } catch (error) {
        reject(error);
      }
    });
  },
  getPhotosUser: (mail) => {
    return new Promise(async (resolve, reject) => {
      try {
        let element = array.filter(x=>x.usersEmail==mail)
        resolve(element)
      } catch (error) {
        reject(error);
      }
    });
  },
};
