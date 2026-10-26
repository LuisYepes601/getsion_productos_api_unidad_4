const Marca = require('./marca.model');

const getMarcas = async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.status(200).json(marcas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener marcas', error: error.message });
  }
};

const getMarcaById = async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.id);
    if (!marca) return res.status(404).json({ mensaje: 'Marca no encontrada' });
    res.status(200).json(marca);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar marca', error: error.message });
  }
};

const createMarca = async (req, res) => {
  try {
    const { nombre, paisOrigen } = req.body;
    if (!nombre) return res.status(400).json({ mensaje: 'El nombre de la marca es obligatorio' });

    const nuevaMarca = new Marca({ nombre, paisOrigen });
    const guardada = await nuevaMarca.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear marca', error: error.message });
  }
};

const updateMarca = async (req, res) => {
  try {
    const actualizada = await Marca.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: 'Marca no encontrada' });
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar marca', error: error.message });
  }
};

const deleteMarca = async (req, res) => {
  try {
    const eliminada = await Marca.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: 'Marca no encontrada' });
    res.status(200).json({ mensaje: 'Marca eliminada', marca: eliminada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar marca', error: error.message });
  }
};

module.exports = { getMarcas, getMarcaById, createMarca, updateMarca, deleteMarca };