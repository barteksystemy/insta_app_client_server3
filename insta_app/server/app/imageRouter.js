// załącz controller, utils , tablicę zwierząt
const getRequestData = require("./getRequestData");
const fileController = require("./fileController");
const jsonController = require("./jsonController");
const {verifyToken} = require("./utils");
//

const imageRouter = async (req, res) => {
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    // czytam dane z nagłowka 
    let token = req.headers.authorization.split(" ")[1]
    console.log(token)
    let mail = await verifyToken(token)
    if (mail) {
        // pobranie wszystkich zdjęć
  if (req.url == "/api/photos" && req.method == "GET") {
    let data = await jsonController.getPhotos(req);
    console.log(data);
    res.end(JSON.stringify(data, null, 5));
  }

  // pobranie wszystkich zdjec danego usera
  if (req.url == "/api/photos/user" && req.method == "GET") {
    let data = await jsonController.getPhotosUser(mail);
    console.log(data);
    res.end(JSON.stringify(data, null, 5));
  }

  // // pobranie jednego zdjęcia wg id
  else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
    let data = await jsonController.getOnePhoto(req.url);
    console.log(data);
    // res.end(data)
  }

  // POST - send image
  else if (req.url == "/api/photos" && req.method == "POST") {
    let data = await fileController.postImage(req);
    let data2 = await jsonController.postImagejson(data);
    console.log(data2);
    res.end(JSON.stringify(data2, null, 5));
  }

  // // aktualizacja jednego imagea wg id
  else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "PATCH") {
    let data = await jsonController.patchPhoto(req.url);
    console.log(data);
    // res.end(data)
  }

  // // usunięcie jednego imagea wg id
  else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
    let data = await fileController.deletePhoto(req);
    let data2 = await jsonController.deletePhoto(req);
    console.log(data);
    // res.end(data)
  }

  // dodanie taga do zdjęcia
  else if (req.url == "/api/photos/tags" && req.method == "PATCH") {
    let data = await getRequestData(req);
    let data2 = await fileController.addTagToThePhoto(data);
    console.log(data2);
    // res.end(data2)
  }

  // dodanie taga do zdjęcia
  else if (req.url == "/api/photos/tags/mass" && req.method == "PATCH") {
    let data = await getRequestData(req);
    let data2 = await fileController.addTagsToThePhoto(data);
    console.log(data2);
    // res.end(data2)
  }

  // // pobranie tagów danego zdjęcia
  else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == "GET") {
    let data = await jsonController.getPhotoTag(req.url);
    console.log(data);
    // res.end(data)
  }

  // api photos image
  else if (req.url.match(/\/api\/photos\/image\/([0-9]+)/) && req.method == "GET") {
    let id = req.url.split('/').at(-1);
    let data = await jsonController.getPhotoUrl(id);
    let data2 = await fileController.getPhoto(data);
    // console.log("data2", data2);
    res.writeHead(200, {
      "Content-Type": "image/jpeg"
    })
    res.end(data2)
  }
    } else {
      res.end("Niezweryfikowany token")
    }
  } else {
    res.end("Nie posiadasz tokena")
  }
};

module.exports = imageRouter;
