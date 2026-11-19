import "dotenv/config"
import app from "./src/app.js";
import conectarDB from "./db.js";

const puerto = process.env.PORT || 3000;

await conectarDB();
app.listen(puerto, () => {
    console.log(`servidor corriendo en http://localhost:${puerto}`)
})