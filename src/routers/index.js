const express = require("express")
const multer = require("multer")
const Router = express.Router()
const fs = require("fs");
const path = require("path");

const axios = require("axios")

Router.get("/",(req,res)=>{
    res.send("hello")

})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Establece la carpeta de destino para guardar los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });


Router.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó un archivo' });
  }

  // Ruta temporal donde multer guardó el archivo
  const filePathTemp = req.file.path;

  // Define la ruta y el nombre del archivo en la que deseas guardarlo
  const destino = 'gato/' + req.file.filename;

  // Mueve el archivo desde la ubicación temporal a la ubicación de destino
  fs.rename(filePathTemp, destino, (err) => {
    if (err) {
      console.error('Error al mover el archivo:', err);
      return res.status(500).json({ error: 'Error al guardar el archivo' });
    }else{
      console.log("guadado en nodejs")
    }

    // Solo envía la respuesta aquí, después de procesar completamente la solicitud
    res.json({ message: 'Archivo subido y guardado con éxito' });
  });
});



  
module.exports = Router;