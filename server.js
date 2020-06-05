const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const http = require('http')
const https = require('https')
const courses = JSON.parse(fs.readFileSync('./goods.json').toString())

var httpServer = http.createServer(app);
var httpsServer = https.createServer({
    key: fs.readFileSync('./cert/lucg.club.key', 'utf8'), 
    cert: fs.readFileSync('./cert/lucg.club.crt', 'utf8')
}, app);

var PORT = 3000;
var SSLPORT = 443;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
app.use(express.static('static'))
// 解决跨域问题
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


// app.use('/:name', function(req, res) {
//     if(req.protocol === 'https') {
//         res.send('https:' + req.params.name);
//     } else {
//         res.send('http:' + req.params.name);
//     }
// });
app.get('/', (req, res) => res.send(allData))
app.get('/api/top',(req,res)=>{
    const newData = allData.sort((a,b)=>{
        return b.solded - a.solded
    })
    res.json({
        code:0,
        data:newData.slice(0,5)
    })
})
app.get('/api/goods', (req, res) => {
    const page = req.query.page || 1
    const start = (page - 1)*10
    const end = start + 10
    setTimeout(()=>{
        res.json({
        code:0,
        data: allData.slice(start,end)   
        })
    },2000)
    
})

const allData = []
courses.tags.forEach(key=>{
    courses.data[key].forEach(v=>{
        allData.push(v)
    })
})


  
// app.listen(3000, () => console.log('Example app listening on port 3000!'))


