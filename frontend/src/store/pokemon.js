import {create} from "zustand"

export const usePokemonStore = create((set) => ({
    pokemons: [],
    setPokemons: (pokemons) => set({ pokemons }),
    createPokemon: async (newPokemon) => {
        if(!newPokemon.name || !newPokemon.identify_id || !newPokemon.image){
            return {success: false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/pokemons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newPokemon)
        })
        const data = await res.json();
        set((state) => ({pokemons:[...state.pokemons,data.data]}))
        return {success: true, message: "Pokemon added successfully."}
    },
    fetchPokemon: async () => {
        const res = await fetch("/api/pokemons");
        const data = await res.json();
        set({ pokemons: data.data});
    },
    deletePokemon: async (pid) => {
        const res = await fetch(`/api/pokemons/${pid}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message};

        set((state) => ({pokemons: state.pokemons.filter((pokemon) => pokemon._id !== pid)}));
        return{ success: true, message: data.message};
    },
    updatePokemon: async (pid, updatedPokemon) => {
        const res = await fetch(`/api/pokemons/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPokemon),
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message};

        set((state) => ({
            pokemons: state.pokemons.map((pokemon) => (pokemon._id === pid ? data.data : pokemon)),
        }));

        return{ success: true, message: data.message };
    },
}));