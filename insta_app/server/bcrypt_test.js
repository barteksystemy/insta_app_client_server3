const bcrypt = require('bcryptjs');

const pass = "moje tajne hasło"

// const encryptPass = async (password) => {

//     let encryptedPassword = await bcrypt.hash(password, 10);
//     console.log({ encryptedPassword: encryptedPassword });
// }

// encryptPass(pass)

const decryptPass = async (userpass, encrypted) => {

    let decrypted = await bcrypt.compare(userpass, encrypted)
    console.log(decrypted);

}

decryptPass(pass, "$2a$10$SvW.k0MCD1fvXb221/b0n.PcbS2CSTJinEpQUsO.3.Il8d2S7DVmS")