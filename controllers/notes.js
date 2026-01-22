const fs = require('fs').promises; // async fs functions
const path = require('path');

//lets call the services of the notes to can make this controller make its goal
const parseService = require('../services/parseService');
const grammarService = require('../services/grammarService');
const notesService = require('../services/notesService');

// Make sure the "data" folder exists
const DATA_DIR = path.join(__dirname, '../data');

//we will use async funcitons inside the async functions rather than using the sync
//cause that will not block the event loop


//Upload markdown file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
    }

    console.log("the req.file is ",req.file);
    const filename = await notesService.uploadFile(req.file);
    console.log("the file name is ",filename);
    res.status(201).json({
      status: 'success',
      message: 'File uploaded successfully',
      filename
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Check grammar of a note
const checkGrammer = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ status: 'fail', message: 'No content provided' });
    }

    //here we will need to call the service function
    const issues=await grammarService.checkGrammar(req.body.content);

    res.json({
      status: 'success',
      content,
      grammarIssues: issues
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

//  Save markdown note (text)
//the note is the content of the file and this function is called when the user want to edit existed file 
const saveNote = async (req, res) => {
  try {
    const { content, filename } = req.body;
    if (!content || !filename) {
      return res.status(400).json({ status: 'fail', message: 'Content or filename missing' });
    }

    const savedFile = await notesService.saveNote(filename, content);

    res.status(201).json({
      status: 'success',
      message: 'Note saved successfully',
      savedFile
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Render markdown as HTML
const renderMarkdown = async (req, res) => {
  try {
    const { id } = req.params;//this is the filename 

//here we will still need to call the service function that will handle this 
const html= await parseService.parseMarkdownFile(id);

      res.send(html); 
    
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

//List all notes
const getAllNotes = async (req, res) => {
  try {
    const files = await notesService.getAllNotes();
    res.json({
      status: 'success',
      notes: files
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  uploadFile,
  checkGrammer,
  saveNote,
  renderMarkdown,
  getAllNotes
};
