const { response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

  const [ total, categoria ] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
      .populate('usuario', 'nombre')
          .skip( Number( desde ) )
          .limit(Number( limite ))
  ]);

  res.json({
      total,
      categoria
  });

}
const obtenerCategoria = async (req, res = response) => {
    
   const {id} = req.params;
   const categoria = await Categoria.findById (id).populate('usuario');

   res.json (categoria);

}
const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre;
    const categoriaDB = await Categoria.findOne({ nombre })

    if(categoriaDB) {
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre}, ya existe`
        });
    }
    const data = {
        nombre, 
        usuario: req.usuario._id
    }
    const categoria = new Categoria (data);
    await categoria.save();

    res.status(201).json(categoria);
}
const actualizarCategoria = async (req, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json(categoria)
}
const deleteCategoria = async (req, res = response) => {
    
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false });
    
    res.json (categoria)
  }
module.exports = {
    crearCategoria,
    deleteCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    deleteCategoria
}