import express from "express";
import os from "os"

const app = express();
const port = 80;
const color = 'blue'
const hostname = os.hostname();

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue;">Hi from color API</h1>')
})

app.get('/api', (req, res) => {
    const {format} = req.query;
    if(format === 'json') { //localhost/api?format=text
        return res.json({
            color,
            hostname
        })
    } else {
        return res.send(`color: ${color}, host: ${hostname}`)
    }
})

app.listen(port, () => {
    console.log(`Color API running in port ${port}`)
})