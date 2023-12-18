export default class ProductModel {
    #nombre
    #precio
    #foto
    #timestamp
    #codigo
    #descripcion
    #categoria

    constructor ({ nombre, precio, foto, codigo, descripcion, categoria }) {
        this.nombre = nombre
        this.precio = precio
        this.foto = foto
        this.codigo = codigo
        this.descripcion = descripcion
        this.categoria = categoria
    }

    get nombre() {
        return this.#nombre
    }
    set nombre(nombre) {
        if(!nombre) {
            throw new Error('El nombre es un campo requerido')
        }
        this.#nombre = nombre
    }

    get precio() {
        return this.#precio
    }
    set precio(precio) {
        if (!precio) {
            throw new Error('El precio es un campo requerido')
        }
        if (isNaN(precio)) {
            throw new Error('El precio debe ser un numero')
        }
        this.#precio = precio
    }

    get foto() {
        return this.#foto
    }
    set foto(foto) {
        if (!foto) {
            throw new Error('La foto es un campo requerido')
        }
        this.#foto = foto
    }

    get timestamp() {
        return this.#timestamp
    }
    set timestamp(timestamp) {
        if (!timestamp) {
            throw new Error('El timestamp es un campo requerido')
        }
        this.#timestamp = timestamp
    }
    
    get codigo() {
        return this.#codigo
    }
    set codigo(codigo) {
        if (!codigo) {
            throw new Error('El codigo es un campo requerido')
        }
        if (isNaN(codigo)) {
            throw new Error('El codigo debe ser un numero')
        }
        this.#codigo = codigo
    }

    get descripcion() {
        return this.#descripcion
    }
    set descripcion(descripcion) {
        if (!descripcion) {
            throw new Error('La descripcion es un campo requerido')
        }
        this.#descripcion = descripcion
    }

    get categoria() {
        return this.#categoria
    }
    set categoria(categoria) {
        if (!categoria) {
            throw new Error('El tipo es un campo requerido')
        }
        this.#categoria = categoria
    }

    datos() {
        return JSON.parse(JSON.stringify({
            nombre: this.#nombre,
            precio: this.#precio,
            foto: this.#foto,
            timestamp: this.#timestamp,
            codigo: this.#codigo,
            descripcion: this.#descripcion,
            categoria: this.#categoria
        }))
    }
}