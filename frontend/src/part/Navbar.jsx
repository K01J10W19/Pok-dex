import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react"
import { useColorMode } from '../components/ui/color-mode.jsx'
import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";
import { MdCatchingPokemon, MdDarkMode, MdLightMode } from "react-icons/md";


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return(
        <Container maxW={"1140px"} px={4} mb={10}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                >
                    <Link 
                        to={"/"}
                        style={{
                            display: "inline-flex",
                            gap: "8px",
                            textDecoration: "none",
                        }}
                    >
                        Pokémon Pokédex <MdCatchingPokemon size={24}/>
                    </Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <CiSquarePlus fontSize={20}/>
                        </Button>
                    </Link>

                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <MdDarkMode size={24}/> : <MdLightMode size={24}/>}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}
export default Navbar