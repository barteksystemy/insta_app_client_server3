// załącz controller, utils , tablicę zwierząt
const getRequestData = require("./getRequestData");
const jsonController = require("./jsonController");
const userController = require("./userController");
//

const userRouter = async (req, res) => {

  // rejestracja użytkownika
  if (req.url == "/api/user/register" && req.method == "POST") {
    let data = await getRequestData(req);
    let data2 = await userController.registerNewUser(data);
    console.log(data2);
    res.end(data2);
  } 
  
  else if (req.url.match(/\/api\/user\/([\w.]+)/) && req.method == "GET") {
    let data = await userController.confirmNewUser(req);
    console.log(data);
    res.end(data);
  }

  else if (req.url == "/api/user/login" && req.method == "POST") {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // czytam dane z nagłowka 
        let token = req.headers.authorization.split(" ")[1]
        let data = await userController.loginUserSecondTime(token);
        console.log(data);
        res.end(data);
      } else {
        let data = await getRequestData(req);
        let data2 = await userController.loginUser(data);
        console.log(data2);
        res.end(data2);
      }
  } 
  
};

module.exports = userRouter;
