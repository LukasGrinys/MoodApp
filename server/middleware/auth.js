const { findUserByToken } = require('../util/helpers');

let auth = async (req, res, next) => {
    let token = req.cookies.auth;
    const {data, error} = await findUserByToken(token);

    if (error || !data) {
        return res.send({
            error: 'Authentication error'
        })
    };

    req.token = token;
    req.user = data;
    next();
}

module.exports = { auth };