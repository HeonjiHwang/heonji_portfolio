const express = require("express");
const cors = require("cors");
const app = express();
const server = require('./server.js')

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", server);

app.listen(9000, ()=>{
    console.log("Server on : http:localhost:9000");
})