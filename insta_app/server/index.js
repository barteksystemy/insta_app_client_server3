const http = require("http");
const imageRouter = require("./app/imageRouter");
const tagsRouter = require("./app/tagsRouter");
const usersRouter = require("./app/userRouter");
const logger = require("tracer").colorConsole();
require('dotenv').config();

http.createServer(async (req, res) => {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Request-Method', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', '*');

if (req.method === 'OPTIONS') {
  res.writeHead(200);
  res.end();
  return;
}

    //images
  
    if (req.url.search("/api/photos") != -1) {
      await imageRouter(req, res)
    }
  
    //tags
  
    else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res)
    }
    
    //users router
    else if (req.url.search("/api/user") != -1) {
      await usersRouter(req, res)
    }

  })
  .listen(process.env.APP_PORT, () => console.log(`listen on ${process.env.APP_PORT}`))
  