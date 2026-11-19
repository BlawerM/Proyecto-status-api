import mongoose from "mongoose";

const coleccion = () => mongoose.connection.collection("Tasks");

export async function crear(datos) {
    const resultado = await coleccion().insertOne(datos);
    return {
        _id: resultado.inserteId,
        ...datos
    };
}

export async function actualizar(id, datos) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await coleccion().findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: datos },
        { returnDocument: "after" }
    );
}

export async function listar(filtros = {}) {
    const query = {};
    if (filtros.status) query.status = filtros.status;
    return await coleccion().find(query).toArray();
}

export async function buscarPorId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await coleccion().findOne({_id: new mongoose.Types.ObjectId(id)})
}

export async function eliminar(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await coleccion().findOneAndDelete({ _Id: new mongoose.Types.ObjectId})
}