import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { MdCatchingPokemon } from "react-icons/md";
import { useEffect } from "react";
import { usePokemonStore } from "../store/pokemon";
import PokemonCard from "../part/PokemonCard.jsx";


const HomePage = () => {
    const {fetchPokemon, pokemons} = usePokemonStore();

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);
    console.log("Pokemons", pokemons);

    return(
        <Container>
            <VStack
                spacing={8}
            >
                <Text
                    fontSize={"30px"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    display={"inline-flex"}
                    alignItems={"center"}
                    gap={"10px"}
                    mb={10}
                >
                    Current Pokédex <MdCatchingPokemon size={30}/>
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    gap={5}
                    w={"full"}
                >
                    {pokemons.map((pokemon) =>(
                        <PokemonCard key={pokemon._id} pokemon={pokemon} />
                    ))}
                </SimpleGrid>

                {pokemons.length === 0 && (
                    <Text
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        gap={"10px"}
                    >
                        No Pokémon Available {" "}
                        <Link to={"/create"}>
                            <Text
                                fontSize={"xl"}
                                color={"blue.500"}
                                _hover={{ textDecoration: "underline"}}
                            >
                                Add a New Pokémon
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>

    )
}
export default HomePage