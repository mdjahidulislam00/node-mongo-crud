const express = require('express')
const app = express()

const password = ew5To9TKUBc4vsBj;

const cors = require('cors')
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get("/jahid", (req, res) => {
    res.send('hello This is Jahid for confarmantion')
})



app.listen(3000);