//const express = require('express');
//const morgan = require('morgan');
//const cors = require('cors');
//const path = require('path');

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';


const app = express(); 

//conexion a base de datos
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/prueba';//myapp y prueba seria el nombre de la db
const options = {useNewUrlParser : true, useUnifiedTopology : true};

//Or using promises
mongoose.connect(uri, options).then(
    /**ready to use. The mongoose.connect() promise resolves to mongoose instance. */
()=> {console.log('conectado a DB exitosamente perrooooo') 

},
/**handle initial connection error */

err => {console.log(err) }
);



//MIDDLEWARE
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());//no hay necesidad de instalarlo ya que ya lo tiene express
app.use(express.urlencoded({ extended: true })) // permite generar la utilizacion para trabajar con solicitudes www y generar solicitudes y respuestas mediantes aplicaciones www - tiene que ver como postman
//app.use(express.static(path.join(_dirname, 'public'))); 


//RUTAS
//app.get('/', function (req, res) {
//    res.send('Hola Mundo gonorrea')
//});

app.use('/api', require('./router/nota'));

//middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public'))); 


//PUERTO

//app.listen(3000, function(){

 //   console.log('el servidor escucha por el puerto 3000')
//});

//generacion de un puerto automatico
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function (){
    console.log('Example app listening on port'+app.get('puerto'));
});
