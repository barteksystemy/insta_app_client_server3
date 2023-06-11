const jwt = require('jsonwebtoken');

const createToken = async () => {

    let token = await jwt.sign(
        {
            email: "aaa@test.com",
            anyData: "123"
        },
        "verysecretkey", // powinno być w .env
        {
            expiresIn: "30s" // "1m", "1d", "24h"
        }
    );
    console.log({ token: token });
}
