import mongoose from "mongoose";

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado con exito a Mongo DB')
    } catch (error) {
        console.error('Error al conectar a Mongo DB', error.message);
        process.exit(1);
    }
};

export default conectarDB;