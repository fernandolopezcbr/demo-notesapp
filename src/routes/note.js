"use strict"

const express = require("express");
var Note = require("../controllers/note");


var router = express.Router();

//guardar ruta
router.post("/save", Note.save);

//obtener notas
router.get("/notes", Note.getNotes);

//eliminar nota
router.delete("/delete/:id", Note.delete);

//actualizar nota
router.put("/update/:id", Note.update);

module.exports = router;