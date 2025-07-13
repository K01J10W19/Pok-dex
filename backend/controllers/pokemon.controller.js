import Pokemon from '../models/pokemon.model.js';
import mongoose from 'mongoose';

// get * information of pokemon
export const getPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find({});
        res.status(200).json({success: true, data: pokemons});
    } catch (error) {
        console.error("Error in fetching pokemons:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// put updated information of pokemon
export const updatePokemons = async(req, res) => {
    const {id} = req.params;

    const pokemon = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Pokemon Id"});
    }

    try{
        const updatedPokemon = await Pokemon.findByIdAndUpdate(id, pokemon, {new: true});
        res.status(200).json({success: true, data: updatedPokemon});
    } catch(error){
        res.status(500).json({success:false, message:"Server Error"});
    }
}

// post to add the new pokemon
export const addPokemon = async (req, res) => {
    const pokemon = req.body;

    if(!pokemon.name || !pokemon.identify_id || !pokemon.image){
        return res.status(400).json({success: false, message: "Please provide all fields of pokemon"});
    }

    const newPokemon = new Pokemon(pokemon);

    try{
        await newPokemon.save();
        res.status(201).json({success: true, data: newPokemon});
    } catch(error){
        console.error("Error in Create pokemon:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

// delete the pokemon
export const deletePokemon = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Pokemon Id"});
    }
    
    try {
        await Pokemon.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Pokemon Information Deleted"});
    } catch (error) {
        console.error("Error in deleting pokemons:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}