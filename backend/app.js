const express = require("express");
const {PORT , DB_URL} = require("./config")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json())
app.use(cors());



const routes = require("./routes")


// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use(express.urlencoded({ extended: false }));


app.use('/images', express.static('images'));

app.use("/api",routes);






// app.use(errorHandler)
app.listen( PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
} )