const express = require('express');
const route = express.Router();

route.get('/', (req , res)=>{
    res.render('./views/index.html')
})
// route.get('/about', (req , res)=>{
//     res.sendFile(__dirname + '/views/about.html')
// })

// For 404 Page
// route.get('*', (req , res)=>{
//     res.render('404')
// });

module.exports = route;