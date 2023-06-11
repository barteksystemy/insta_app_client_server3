// załącz controller, utils , tablicę zwierząt
const getRequestData = require("../app/getRequestData");
const array = require("../app/model");
const fileController = require("../app/fileController");
const jsonController = require("../app/jsonController");
//

const router = async (req, res) => {
  // pobranie wszystkich zdjęć
  if (req.url == "/api/photos" && req.method == "GET") {
    let data = await jsonController.getPhotos(req);
    console.log(data);
    // res.end(data);
  }

  // // pobranie jednego zdjęcia wg id
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
    let data = await jsonController.getOnePhoto(req.url);
    console.log(data);
    // res.end(data)
  }

  // POST - send image
  if (req.url == "/api/photos" && req.method == "POST") {
    let data = await fileController.postImage(req);
    let data2 = await jsonController.postImagejson(data);
    console.log(data2);
    // res.end(JSON.stringify(data2, null, 5));
  }

  // // aktualizacja jednego imagea wg id
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "PATCH") {
    let data = await jsonController.patchPhoto(req.url);
    console.log(data);
    // res.end(data)
  }

  // // usunięcie jednego imagea wg id
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
    let data = await fileController.deletePhoto(req);
    let data2 = await jsonController.deletePhoto(req);
    console.log(data);
    // res.end(data)
  }
};

module.exports = router;
