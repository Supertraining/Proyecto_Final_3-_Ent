export default function userDTO(usuario) {

    const obj = {
        username: usuario[0].username,
        password: usuario[0].password,
        cartId: usuario[0].cartId
    }
    return obj 
}

class UserData {
    constructor(userData) {
        this.username = userData.username
        this.nombre = userData.nombre
        this.direccion = userData.direccion
        this.edad = userData.edad
        this.telefono = userData.telefono
        this.imagen = userData.imagen
    }
}

export const userDataDTO = (userData) => {
    return new UserData(userData)
}