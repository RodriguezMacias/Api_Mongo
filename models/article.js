import mongoose from "mongoose";//estamos importando mongoose
const ArticleSchema = new mongoose.Schema({//creamos un esquema de mongoose
    //esto es el esquema de la base de datos, es el plano (la estructura) de la base de datos
    title: {
        type:String,
        required : true, //el titulo es requerido
    },
    description:{
        type:String,
    },
    content: {
        type:String,
        required : true,//el contenido es requerido
    }
},{timestamps:true});//timestamps:true es para que se cree automaticamente la fecha de creacion y la fecha de actualizacion

//el modelo vendria sindo el arquitecto con el plano, es decir el modelo es el que se encarga de crear la base de datos
const ArticleModel = mongoose.model('Article',ArticleSchema);//creamos un modelo de mongoose
export default ArticleModel;//exportamos el modelo
