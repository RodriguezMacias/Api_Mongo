import mongoose from "mongoose";//estamos importando mongoose
 
export default function connectDB() {//estamos creando  una funcion que se encargara de conectar a la base de datos
  const url = "mongodb://127.0.0.1/blog_db";//creamos la url de la base de datos
 
  try {//la try catch se encargara de manejar los errores en caso de que no se pueda conectar a la base de datos
    mongoose.connect(url);
  } catch (err) {
    console.error(err.message);
    process.exit(1);//es el tiempo 
  }
  const dbConnection = mongoose.connection; //creamos una variable que se encargara de la conexion a la base de datos
  dbConnection.once("open", (_) => {//una ves que la conecion de la base de datos este abierta se ejecutara el siguiente codigo
    console.log(`Database connected: ${url}`);
  });
 
  dbConnection.on("error", (err) => {//en caso de que haya un error en la conexion a la base de datos se ejecutara el siguiente codigo
    console.error(`connection error: ${err}`);
  });
  return;
}