const express = require('express');

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send(`Hi from ${process.env.APP_NAME}`)
})

app.listen(port, () => {
    console.log('listening on port ' + port)
});