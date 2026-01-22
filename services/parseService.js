const fs = require('fs').promises;//this is the modern style to not in each function passing and defining the callback function 
const path = require('path');
//cause this thing give me an error be careful about the desctructring 
const {marked} = require('marked');

// Path to your data folder
const DATA_DIR = path.join(__dirname, '../data');


const parseMarkdownFile = async (filename) => {
  try {
    const filePath = path.join(DATA_DIR, filename);
    //console.log('Reading file:', filePath);

    // first read the file content to can parse it 
    const markdownContent = await fs.readFile(filePath, 'utf-8');

    // just in very simple way to call the built in function
    const htmlContent = marked(markdownContent);

    return htmlContent;
  } catch (error) {
    console.error('Parse Markdown error:', error.message);
    throw new Error('File not found or could not parse');
  }
};

module.exports = { parseMarkdownFile };
