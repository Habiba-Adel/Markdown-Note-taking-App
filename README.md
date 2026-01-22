# 📝 Markdown Note-taking App

A simple RESTful API for uploading, saving, parsing, and checking the grammar of Markdown notes. This project is built with Node.js, Express, and leverages external services for grammar checking and Markdown rendering.

---

## 🚀 Features

- Upload Markdown files (`.md`) via an API endpoint
- Check grammar of note content using the LanguageTool API
- Save notes (create or edit) as Markdown files
- Render Markdown as HTML
- List all notes stored in the `data` folder

This project demonstrates file handling, service layer separation, async operations, and integration with third-party APIs.

---

## 📦 Tech Stack

- **Node.js** – runtime
- **Express.js** – web framework
- **Multer** – file upload handling
- **Marked** – Markdown to HTML parsing
- **Axios** – HTTP requests (for grammar check API and that cause express is a server and in this case we need client to send the request)
- **LanguageTool API** – grammar checking
- **FS (async)** – file system operations

---

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   ```

2. **Navigate to the project folder:**
   ```bash
   cd Markdown-Note-taking-App
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

Server will run on `http://localhost:3000`.

---

## ⚙️ API Endpoints

### 1. Health Check

**GET** `/health`

**Response:**
```json
{
  "status": "OK"
}
```

---

### 2. List All Notes

**GET** `/notes`

**Response:**
```json
{
  "status": "success",
  "notes": ["example.md", "note2.md"]
}
```

---

### 3. Upload Markdown File

**POST** `/notes/upload`

**Form-Data:**
- `file`: Markdown file (`.md`)

**Response:**
```json
{
  "status": "success",
  "message": "File uploaded successfully",
  "filename": "example.md"
}
```

> **Note:** File will be saved in the `data` folder.

---

### 4. Check Grammar

**POST** `/notes/grammar`

**Body (JSON):**
```json
{
  "content": "Your markdown text here"
}
```

**Response:**
```json
{
  "status": "success",
  "content": "Your markdown text here",
  "grammarIssues": []
}
```

---

### 5. Save/Edit Note

**POST** `/notes/save`

**Body (JSON):**
```json
{
  "filename": "example.md",
  "content": "Updated markdown content"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Note saved successfully",
  "savedFile": "example.md"
}
```

---

### 6. Render Markdown as HTML

**GET** `/notes/:filename/render`

**Response:**
```html
<!-- HTML-rendered version of your Markdown file -->
```

---

## 🗂️ Project Structure

```
Markdown-Note-taking-App/
├─ controllers/
│  └─ notes.js          # Handles requests
├─ routes/
│  └─ notes.js          # Express routes
├─ services/
│  ├─ notesService.js   # File operations: upload/save/list
│  ├─ parseService.js   # Markdown to HTML parser
│  └─ grammarService.js # Grammar checking via LanguageTool
├─ data/                # Stores uploaded/saved markdown files
├─ .gitignore
├─ package.json
└─ server.js
```

---

## 💡 Notes

- All file operations are async to prevent blocking the event loop
- The project uses **Multer** to handle file uploads from `multipart/form-data` requests and that to convert the file that comming in the request into js object to enable express to understand it and deal with it
- Markdown rendering is done via **Marked**, a fast and reliable library
- Grammar check is powered by the **LanguageTool API**

---

## ❤️ Credits

Made with ❤️ by **Habiba Abdelgowad**
