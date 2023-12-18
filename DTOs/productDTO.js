class ProductoDTO {
    constructor({ nombre, precio, foto, id, descripcion, codigo, categoria }) {
        this.id = id
        this.timestamp = Date.now()
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.codigo = codigo
        this.foto = foto
        this.categoria = categoria
    }
}

export function productoDTO(producto) {
    if (Array.isArray(producto)) {
        return producto.map((p) => new ProductoDTO(p))
    }
    return new ProductoDTO(producto)

}