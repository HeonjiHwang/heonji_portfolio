const express = require("express");
const cors = require("cors");
const app = express();
const server = require('./server.js')

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", server);

app.listen(3000, ()=>{
    console.log("Server on : http:localhost:3000");
})