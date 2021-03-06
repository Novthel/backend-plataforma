
const { verify } = require("jsonwebtoken");

function usuarioGuard(req, res, next) {
   
    const authorization = req.headers.authorization;                                 // Captura la cabecera Authorization
    if (!authorization) {
        next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
    }
    // Pregunta si tiene esa cabecera
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.CLAVE_SECRET);
        if (payload.rol !== "admin"){
            next(res.status(403).json({ estado: "error", msg:"NO Autorizado" }));
        }
    } catch (error) {

    }
    next();
}

exports.usuarioGuard = usuarioGuard;