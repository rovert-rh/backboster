const validarCampos = require("../middlewares/validator");
const validarJWT= require("./validator-jwt");
const esAdminRole = require("../middlewares/validar-roles");
const streamerJWT = require("./validator-st")

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdminRole,
    ...streamerJWT,
}