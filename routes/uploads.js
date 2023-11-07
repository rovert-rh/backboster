const { Router } = require(`express`);
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validator");
const { cargarArchivos, updateImg } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { Usuario } = require("../models");


const router = Router();

router.post('/', cargarArchivos);

router.put('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, [Usuario, Streamer ] ) ),
], updateImg);


module.exports = router;