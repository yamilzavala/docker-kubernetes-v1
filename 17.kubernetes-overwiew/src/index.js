import express from "express";

const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue;">Hi from color API</h1>')
})

app.listen(port, () => {
    console.log(`Color API running in port ${port}`)
})