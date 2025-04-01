import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json())

//routes
app.get('/', (req, res) => {
    res.json({message: 'Hi, from notes!'})
})
//app.use('/api/notes', notesRouter)

//db connect
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('Connected to MongoDB!')
    app.listen(port, () => {
        console.log(`Notes server listening on port ${port}`)
    })
    console.log('Connected to DB');
})
.catch(err => {
    console.log('Something went wrong trying to connect to database');
    console.log(err);
}) 