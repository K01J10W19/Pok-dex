import { Box, Image, Heading, Text, HStack, IconButton, VStack, Input, Button} from '@chakra-ui/react';
import { useColorModeValue, useColorMode } from '../components/ui/color-mode';
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { toaster } from "../components/ui/toaster.jsx";
import { usePokemonStore } from '../store/pokemon';
import Modal from 'react-modal';
import React, { useState } from 'react'

const PokemonCard = ({pokemon}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";

    const [modalIsOpen, setmodalIsOpen] = useState(false);

    const [updatedPokemon, setupdatedPokemon] = useState(pokemon);
    const {deletePokemon, updatePokemon} = usePokemonStore();

    const handleDeletePokemon = async (pid) =>{
        const {success,message} = await deletePokemon(pid);
        if(!success){
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
            });
        }else{
            toaster.create({
                title: "Success",
                description: "Pokemon Deleted",
                type: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const handleUpdatePokemon = async (pid, updatedPokemon) =>{
        const {success,message} = await updatePokemon(pid, updatedPokemon);
        if(!success){
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
            });
        }else{
            toaster.create({
                title: "Success",
                description: "Pokemon Updated",
                type: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={pokemon.image} alt={pokemon.name} h={"48"} w={"full"} objectFit={"contain"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {pokemon.name}
                </Heading>

                <Text
                    fontWeight={"bold"}
                    fontSize={"xl"}
                    mb={4}
                    color={textColor}
                >
                    {pokemon.identify_id}
                </Text>

                <HStack>
                    <IconButton bg="blue.500" _hover={{ bg: "blue.700" }} onClick={() => setmodalIsOpen(true)}> <BiEdit /> </IconButton>
                    <Modal isOpen={modalIsOpen} onRequestClose={() => setmodalIsOpen(false)}
                        style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            },
                            content: {
                                position: 'relative',
                                inset: 'unset',
                                width: '500px',
                                padding: '30px',
                                borderRadius: '12px',
                                maxHeight: '90vh',
                                backgroundColor: isDark ? "#1A202C" : "#fff",
                                color: isDark ? "#E2E8F0" : "#1A202C", 
                                border: "1px solid",
                                borderColor: isDark ? "#2D3748" : "#CBD5E0",
                            },
                        }}  
                        >
                        <Text
                            fontSize={20}
                            fontWeight={"bold"}
                            mb={5}
                        >Update Pokémon Information</Text>
                        <VStack spacing={4} gap={5} mb={5}>
                            <Input placeholder="Pokemon Name" name="name" value={updatedPokemon.name} onChange={(e) => setupdatedPokemon({...updatedPokemon, name: e.target.value})}/>
                            <Input placeholder="Pokemon ID" name="identify_id" type="number" defaultValue={updatedPokemon.identify_id} onChange={(e) => setupdatedPokemon({...updatedPokemon, identify_id: e.target.value})}/>
                            <Input placeholder="Image URL" name="image" defaultValue={updatedPokemon.image} onChange={(e) => setupdatedPokemon({...updatedPokemon, image: e.target.value})}/>
                        </VStack>
                        <Button onClick={() => {setmodalIsOpen(false); handleUpdatePokemon(pokemon._id, updatedPokemon);}}
                            w={"full"} mb={1} 
                            bg={useColorModeValue("blue.500", "blue.400")} 
                            _hover={{bg:useColorModeValue("blue.600", "blue.500")}}
                        >Update</Button>
                        <Button onClick={() => setmodalIsOpen(false)} 
                            w={"full"} bg={useColorModeValue("#fff", "#1A202C")} 
                            color={useColorModeValue("#1A202C","#E2E8F0")}
                        >Close</Button>
                    </Modal>
                    <IconButton bg="red.500" _hover={{ bg: "red.700" }} onClick={() => handleDeletePokemon(pokemon._id)}> <MdDeleteOutline /> </IconButton>
                </HStack>
            </Box>
        </Box>
    )
}

export default PokemonCard