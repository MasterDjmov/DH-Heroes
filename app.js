console.clear();    //si es linux
const express = require('express');
const path = require('path');
const app = express();

//aviso a express que use los static, assets
app.use(express.static('public'));

//escuchando el puerto
app.listen(3000, (error)=>{
    error?
        console.log("Error ",error.message):
        console.log('Inicio del Servidor en http://localhost:3000');
})

/**
 * Para la construcción de este pequeño sitio web se espera contar con la posibilidad de acceso a las siguientes URLs:
● / -> Debe direccionar al recurso index.html.
● /babbage -> Debe direccionar al recurso babbage.html
● /berners-lee -> Debe direccionar al recurso berners-lee.html.
● /clarke -> Debe direccionar al recurso clarke.html.
● /hamilton -> Debe direccionar al recurso hamilton.html.
● /hopper -> Debe direccionar al recurso hopper.html.
● /lovelace -> Debe direccionar al recurso lovelace.html.
● /turing-> Debe direccionar al recurso turing.html.
 */


//generando rutas
const direcciones = {
    "/berners-lee": "./views/berners-lee.html",
    "/clarke": "./views/clarke.html",
    "/hamilton": "./views/hamilton.html",
    "/hopper": "./views/hopper.html",
    "/lovelace": "./views/lovelace.html",
    "/turing": "./views/turing.html",
  };
let ruta="";
//capturo la ruta
app.use((req, res, next)=>{
    ruta = req.path;
    //console.log(ruta);
    next();
});

/** asi serian todas las rutas simples*/
app.get('/',(req, res)=>{
    res.sendFile(path.resolve('views/index.html'));
})

//ruta simple con el valor en la primer parte
app.get('/babbage',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'./views/babbage.html'));
})

//un poco mas elaborado con use
app.use((req, res, next)=>{
    ruta = req.path;
    //verifico si existe la ruta
    if(direcciones[ruta]){    //fue capturado en linea 35
        res.sendFile(path.resolve(__dirname,direcciones[ruta]));
    }else{
        next(); //permite que sigan los procesos
    }

});

//en caso de no existir dara un error el navegador
app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'./views/404.html'));
})