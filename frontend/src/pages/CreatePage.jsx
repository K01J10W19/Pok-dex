import { Container , VStack, Heading, Box, Input, Button } from "@chakra-ui/react";
import {useState} from "react";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import { toaster } from "../components/ui/toaster.jsx";
import { usePokemonStore } from "../store/pokemon";

const CreatePage = () => {
    const [newPokemon, setNewPokemon] = useState({
        name: "",
        identify_id: "",
        image: "",
    });

    const bg = useColorModeValue("blue.400", "blue.600");
    const hoverbg = useColorModeValue("blue.500", "blue.700");

    const {createPokemon} = usePokemonStore();

    const handleAddPokemon = async() => {
        const {success,message} = await createPokemon(newPokemon)
        if(!success){
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
            });
        }else{
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
                duration: 3000,
                isClosable: true,
            });
        }
        setNewPokemon({ name: "", identify_id: "", image: ""});
    };


    return(
        <Container maxW={"800px"}>
            <VStack
                spacing={8}
            >
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Add New Pokemon
                </Heading>

                <Box
                    w={"full"} 
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Pokemon Name"
                            name="name"
                            value={newPokemon.name}
                            onChange={(e) => setNewPokemon({...newPokemon, name: e.target.value})}
                        />
                        <Input
                            placeholder="Pokemon Identify ID"
                            name="identify_id"
                            type="number"
                            value={newPokemon.identify_id}
                            onChange={(e) => setNewPokemon({...newPokemon, identify_id: e.target.value})}
                        />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newPokemon.image}
                            onChange={(e) => setNewPokemon({...newPokemon, image: e.target.value})}
                        />
                        <Button 
                            onClick={handleAddPokemon} 
                            w="full" 
                            color="white"
                            bg={bg}
                            _hover={{ bg:hoverbg}}>
                            Add New Pokemon
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}
export default CreatePage