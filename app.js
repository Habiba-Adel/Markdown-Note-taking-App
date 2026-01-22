const express=require('express');
const notesRoutes=require('./routes/notes');

const app=express();

//the middlewares
app.use(express.json());

//adding the healthy check to check if it is working or no
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

//the available routes until now 
app.use('/notes',notesRoutes);

//what about if trying any other routes not exisetd we need to handle it 
app.use((req, res) => {
  res.status(404).json({status: 'fail' , message: 'Route not found' });
});

//then export the express app object to enable using it in the server file
module.exports=app;