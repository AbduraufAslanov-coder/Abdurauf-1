import { Stack, Image, Box, Text, IconButton, ClientOnly, Skeleton, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react"
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode } from "@/components/ui/color-mode";
import { Rating } from "@/components/ui/rating";
const CharacterCard = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.error("Error :", error));
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Box display="flex" gap={5} >

      <Rating ml={1000} defaultValue={3} mt={2} size="md" />
        <ClientOnly fallback={<Skeleton boxSize="8" />  }  >
      <IconButton onClick={toggleColorMode}  mt={2} variant="outline" size="sm">
        {colorMode === "light" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
      </Box>
    <Text fontSize="5xl"  textAlign={"center"} fontWeight="bold" mb={4}>
            Rick and Morty Characters
          </Text>
      <Stack direction="row" wrap="wrap" justifyContent="center">
          {characters.length === 0 && <Spinner color={"red.500"} />}
        {characters.map((character) => (
          <Box key={character.id} border='0.5px solid gray'    _hover={{ border: "2px solid red" }} w="400px" borderRadius="10px" p={4} boxShadow="50px">
            <Image src={character.image} alt={character.name} ml={100}  borderRadius="100%" width={200} />
            <Text fontSize="lg" fontWeight="bold" textAlign={"center"} mt={2}>
              {character.name}
            </Text>
            <Text fontSize="lg" fontWeight="bold" textAlign={"center"}  mt={2}>
              {character.species}
            </Text>
            <Text fontSize="lg" fontWeight="bold" textAlign={"center"}  mt={2}>
              {character.status}
            </Text>
          </Box>
        ))}
      </Stack>

    </div>
    );
};

export default CharacterCard;
