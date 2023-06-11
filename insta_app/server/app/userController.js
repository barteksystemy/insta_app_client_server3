const {usersArray} = require("./model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  registerNewUser: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data2 = JSON.parse(data)
        if (Object.keys(data2).length == 4) {
          const encryptPass = async (password) => {
            let encryptedPassword = await bcrypt.hash(password, 10);
            let obj = {
              id: Date.now(),
              name: data2.name,
              lastName: data2.lastName,
              email: data2.email,
              confirmed: false,
              password: encryptedPassword
            }
            usersArray.push(obj)

        // tworzenie tokena

        const createToken = async () => {

          let token = await jwt.sign(
            {
              email: data2.email,
              password: encryptedPassword
            },
              process.env.SECRET_KEY, // powinno być w .env
              {
                expiresIn: "1d" // "1m", "1d", "24h"
              }
          );
          resolve(`
            skopiuj poniższy link do przeglądarki
            http://localhost:4000/api/user/confirm/${token}
            w celu potwierdzenia konta
            Uwaga: link jest ważny przez godzinę
            `)
        }
        await createToken()
          }
          encryptPass(data2.password)
        } else { 
          resolve("Brak danych!")
        }
      
      } catch (error) {
        reject(error);
      }
    });
  },
  confirmNewUser: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        const verifyToken = async (token) => {
          try {
            let decoded = await jwt.verify(token, process.env.SECRET_KEY)
            console.log({ decoded: decoded });
            let element = usersArray.find(x=>x.email==decoded.email)
            element.confirmed = true
            resolve("Potwierdzone konto!")
          }
          catch (ex) {
            resolve({message: ex.message})
          }
        }

      const processToken = async () => {
        await verifyToken(req.url.split("/")[4])
      }
      processToken()

      } catch (error) {
        reject(error);
      }
    });
  },
  loginUser: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data2 = JSON.parse(data)
        let element = usersArray.find(x=>x.email==data2.email)
        if (element) {
          if (element.confirmed == false) {
            resolve("Nie potwierdzone konto!")
          } else {
            const decryptPass = async (userpass, encrypted) => {
            let decrypted = await bcrypt.compare(userpass, encrypted)
            if (decrypted == true) {
        
              const jwt = require('jsonwebtoken');
              const createToken = async () => {
              let token = await jwt.sign(
              {
                email: element.email,
                password: element.password,
                name: element.name,
                lastName: element.lastName
              },
              process.env.SECRET_KEY, // powinno być w .env
              {
              expiresIn: "2h" // "1m", "1d", "24h"
              }
              );
              resolve(token)
              }
  
              const processToken = async () => {
                await createToken()
            }
            processToken()
            } else {
              resolve("Złe hasło!")
            }
          }
          decryptPass(data2.password, element.password)
          }
      } else {
        resolve("Zły email!")
      }
      } catch (error) {
        reject(error);
      }
    });
  },
  loginUserSecondTime: (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const verifyToken = async (token) => {

              try {
                let decoded = await jwt.verify(token, process.env.SECRET_KEY)
                // console.log({ decoded: decoded });
                let element = usersArray.find(x=>x.email==decoded.email) 
                if (element) {
                  resolve(token)
                } else {
                  resolve("Nie znaleziono konta!")
                }
              }
              catch (ex) {
                resolve(ex.message)
              }
          }
          
          const processToken = async () => {
              await verifyToken(token)
          }
          
          processToken()
          
      } catch (error) {
        reject(error);
      }
    });
  },
};
