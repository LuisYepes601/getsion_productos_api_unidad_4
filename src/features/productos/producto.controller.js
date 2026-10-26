const Producto = require('./producto.model');

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find()
      .populate('categoria', 'nombre descripcion')
      .populate('marca', 'nombre paisOrigen');
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
      .populate('categoria', 'nombre')
      .populate('marca', 'nombre');
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el producto', error: error.message });
  }
};

const createProducto = async (req, res) => {
  try {
    const { nombre, sku, precio, stock, descripcion, imagenUrl, categoria, marca } = req.body;

    if (!nombre || !sku || precio === undefined || !categoria || !marca) {
      return res.status(400).json({ mensaje: 'Nombre, SKU, precio, categoría y marca son requeridos' });
    }

    const nuevoProducto = new Producto({
      nombre,
      sku,
      precio: Number(precio),
      stock: stock ? Number(stock) : 0,
      descripcion: descripcion || '',
      imagenUrl: imagenUrl || '',
      categoria,
      marca
    });

    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar el producto', error: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('categoria marca');

    if (!productoActualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(200).json({ mensaje: 'Producto eliminado correctamente', producto: productoEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
  }
};

module.exports = { getProductos, getProductoById, createProducto, updateProducto, deleteProducto };