// const http = require("http");
const express = require("express");
const app = express();
const port = 7000;
const mongo = require('mongodb');
const path = require('path');

app.use(express.static('public'));
app.use(express.static('public/css'));
// app.use('/css',express.static(__dirname + '/css'));
// app.use('/js',express.static(__dirname + '/js'));
// app.use('/src',express.static(__dirname + '/src'));

// app.set('views', __dirname + '/views');
// app.set("view engine", "html");
// Route
app.use('/', require('./routes/routes.js'));

// app.get('/', (req , res)=>{
//         res.sendFile(__dirname + '/views/index.html')
//     })


// ------Server-------

// const server = http.createServer(( req, res ) => {
//     console.log(req.url);
// });
app.listen(port, "127.0.0.1", ()=>{
    console.log(`Listening Port ${port}`);
});