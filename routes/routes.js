const express = require('express');
const route = express.Router();
const path = require('path');

route.get('/', (req , res)=>{
    res.sendFile(path.join(__dirname + './../views/index.html')); 
})
// route.get('/about', (req , res)=>{
//     res.sendFile(__dirname + '/views/about.html')
// })

// For 404 Page
// route.get('*', (req , res)=>{
//     res.render('404')
// });

module.exports = route;