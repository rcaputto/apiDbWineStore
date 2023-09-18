// Esta funcion verifica si el usuario esta logeado en el sitio 
function userLoggedMiddleware(req, res, next) { 
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged
    }

    next();
}

module.exports = userLoggedMiddleware;