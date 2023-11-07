const { response } = require("express");
const { uploadFiles } = require("../helpers");



const cargarArchivos = async (req, res= response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json('No hay archivos en la peticion.');
    return;
  }

  const Nombre = await uploadFiles (req.files);

  res.json({Nombre})

 
}

const updateImg = async(req, res = response) => {

  const { id, coleccion } = req.params; 

  res.json({ id, coleccion})
}


module.exports = {
    cargarArchivos,
    updateImg
}