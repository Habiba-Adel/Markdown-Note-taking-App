const express = require('express');
const notesController=require('../controllers/notes');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

//list all notes
router.get('/' , notesController.getAllNotes);

// Upload markdown file
//and this multer package will help us in the part of making express understand the file cause it is only understand the json not understand the files so we will need to make it pass to another function before going
//there is an important thing here that the upload.single must haviing exactly the same name of the key that we pass into it the file in thte body 
router.post('/upload', upload.single('file'), notesController.uploadFile);

// Check grammar of a note
router.post('/grammar' , notesController.checkGrammer);

// Save markdown note (text)
router.post('/save' , notesController.saveNote);

// Render markdown as HTML
router.get('/:id/render' , notesController.renderMarkdown);


module.exports = router;
