const db = require('../database/models');
// Esta cookie nos permite recordar recordar a los usuarios que ya estan registrados dentro del sitio
async function remindMeMiddleware(req, res, next) {

    if (req.cookies.remindMe != undefined && res.locals.isLogged != true) {
        req.session.userLogged = await db.User.findByPk(req.cookies.remindMe)
    }

    next();
}

module.exports = remindMeMiddleware;