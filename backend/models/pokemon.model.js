import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    identify_id:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
},{
    timestamps: true // createdAt, updatedAt
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;