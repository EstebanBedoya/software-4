var jwt = require('jsonwebtoken');
var sercret = require('../config/config');
exports.VerificarToken = function(req, res, next) {
    //dominio.com/usuario/?token=jhjkfdasu234234hakjdajkdh
    let token = req.query.token;
    jwt.verify(token, sercret.PALABRASECRETA,
        (err, decode) => {
            if (err) {
                return res.status(401).json({
                    estado: 'fail',
                    error: err,
                    msg: 'Acceso privado'
                });
            }
            req.usuario = decode.usuario;

            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            next();
        });

}