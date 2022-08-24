"use strict"

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");



const port = process.env.PORT || 3000;


//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


const url = "mongodb+srv://first_user:first_user@cluster0.15inxy3.mongodb.net/mongoconnect?retryWrites=true&w=majority";
//configuracion para evitar fallos de conexion
mongoose.Promise = global.Promise;

var noteRoutes = require("./routes/note");


//cargar body-parser;
app.use(bodyParser.urlencoded({extended:false}));

//convertir peticion en formato JSON
app.use(bodyParser.json());

//activar CORS para permitir peticiones asincronas AJAX Y HTTP desde fornten
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//cargar archivos de ruta de la app
app.use("/api",noteRoutes);

mongoose
.connect(url, {useNewUrlParser: true})
.then(()=>{

    console.log("Connected to db succesful");
})
.catch(()=>{
 console.log(err ,"error to conected");
})

app.listen(port, ()=>{
    console.log(`server on port ${port}`);
})