import app from "./src/app.js";

const puerto = process.env.PORT || 3000;

app.listen(puerto, () => {
    console.log(`servidor corriendo en http://localhost:${puerto}`)
})