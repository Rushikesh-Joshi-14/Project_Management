require("dotenv").config();
const express = require('express');
const app = express() ;
const cors = require('cors') ;
const connection = require('./db') ;
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth') ;
const projectRoutes = require('./routes/projectRoutes');

connection() ;

app.use(express.json()) ;
app.use(cors()) ;


app.use("/api/users" , userRoutes);
app.use("/api/auth",authRoutes) ;
app.use("/api/projects", projectRoutes);

const port = 8080 ;
app.listen(port , () => {console.log(`App is listening on the Port ${port}`)}) ;