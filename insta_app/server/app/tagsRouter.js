const getRequestData = require("./getRequestData");
const tagsController = require("./tagsController");
//

const imageRouter = async (req, res) => {

  // pobranie wszystkich tagów
  if (req.url == "/api/tags/raw" && req.method == "GET") {
    let data = await tagsController.getAllTags(req);
    console.log(data);
    // res.end(data);
  } 
  
  else if (req.url == "/api/tags" && req.method == "GET") {
    let data = await tagsController.getAllConvertedTags(req);
    console.log(data);
    // res.end(data);
  }

  else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
    let data = await tagsController.getOneTag(req);
    console.log(data);
    // res.end(data);
  }

  else if (req.url == "/api/tags" && req.method == "POST") {
    let data = await getRequestData(req);
    let data2 = await tagsController.createTag(data);
    console.log(data2);
    // res.end(data2);
  }
  
};

module.exports = imageRouter;
