// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import path from "path";

import { connectDB } from './config/db.js';
import pokemonRoutes from './routes/pokemon.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us accept JSON data in the req.body

try{
    app.use("/api/pokemons", pokemonRoutes);
} catch(error){
    console.warn("⚠️ Ignoring non-breaking routing error:", err.message);
}

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("/*wildcard", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});

