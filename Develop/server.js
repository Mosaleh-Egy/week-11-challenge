const { v4: uuidv4 } = require('uuid');
const express = require('express')
const fs = require('fs')
const db = require('./db/db.json')
const app = express()
const PORT = 3000
const path = require('path')
app.use(express.json())
app.use(express.static('public'))

app.get('/notes',(req,res)=>{
res.sendFile(path.join(__dirname,'./public/notes.html'))
})

app.get('/api/notes',(req,res)=>{
    res.json(db)
})

app.post('/api/notes',(req,res)=>{
    req.body['id']=uuidv4()
    db.push(req.body)
    console.log(db)
    fs.writeFileSync('./db/db.json',JSON.stringify(db))
    res.json(db)
})
app.listen(PORT,()=>{
    console.log('appislistening')
})
