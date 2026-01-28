import express from "express"
import dotenv from "dotenv"
const app= express();

const PORT=5000;



app.listen(PORT,console.log(`server is started on ${PORT}`));