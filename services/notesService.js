//this file will hasing the upload and the save and list notes opertions
//and here there is sperations of concerns that make this file hasing only the operations of the file itself


const fs = require('fs').promises;
const path = require('path');

// Path to the data folder
const DATA_DIR = path.join(__dirname, '../data');

const uploadFile = async (file) => {
  if (!file) throw new Error('No file provided');

  const destPath = path.join(DATA_DIR, file.originalname);
  await fs.rename(file.path, destPath);

  return file.originalname;
};


const saveNote = async (filename, content) => {
  if (!filename || !content) throw new Error('Filename or content missing');

  const filePath = path.join(DATA_DIR, filename.endsWith('.md') ? filename : `${filename}.md`);
  await fs.writeFile(filePath, content);

  return filename;
};


const getAllNotes = async () => {

  const files = await fs.readdir(DATA_DIR);

  return files;
};

module.exports = {
  uploadFile,
  saveNote,
  getAllNotes
};
