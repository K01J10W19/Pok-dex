import express from 'express';
import { addPokemon, deletePokemon, getPokemons, updatePokemons } from '../controllers/pokemon.controller.js';

const router = express.Router();

// Use Postman to test the conversation with API


router.get("/",getPokemons);

router.put("/:id", updatePokemons);

router.post("/", addPokemon);

router.delete("/:id", deletePokemon);

export default router;