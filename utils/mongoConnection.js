import mongoose from "mongoose";

export const connect = async (url) => {
    try {
        await mongoose.connect(`${url}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos MongDB Atlas conectada');
    } catch (err) {
        console.log('ocurrio un error' + err);
    }
}