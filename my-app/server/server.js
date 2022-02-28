const express = require("express");
const cors = require("cors");
const app =  express();
const api = require("./routes/index");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api", api);

app.listen(PORT, ()=>{
    console.log(`SERVER ON : http://localhost:${PORT}`);
})