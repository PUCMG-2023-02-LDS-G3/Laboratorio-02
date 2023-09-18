import {
  Button,
  Center,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import useUser from "../../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Helmet } from "react-helmet"



function HomePage() {
  const { user, SingOut, isUserLogged } = useUser()

  const navigate = useNavigate()

  const handleSingOut = () => {
    SingOut()
    navigate("/")
  }

  useEffect(() => {
    console.log("isUserLogged", isUserLogged())
    if (!isUserLogged()) {
      navigate("/")
    }
  }, [isUserLogged, navigate])

  return (
    <>

      <Helmet>
        <title>Home | Desnorteia </title>
      </Helmet>

      <Flex
        justifyContent={"space-evenly"}
        align={"center"}
        padding={"8"}
        backgroundColor={"facebook.600"}
        color={"whiteAlpha.900"}>
        <Text>Usuario: {user.email}</Text>
        <Button colorScheme="facebook" onClick={handleSingOut}>
          Sair
        </Button>
      </Flex>

      <Flex flexDir={"column"}>
        <Center padding={"8"} gap={"8"}>
          <Button colorScheme="facebook">Alugar automovel</Button>
          <Button colorScheme="facebook">Pesquisar automovel</Button>
        </Center>

        <Center>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Matrícula</Th>
                  <Th>Marca</Th>
                  <Th>Modelo</Th>
                  <Th>Placa</Th>
                  <Th isNumeric>Ano</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>JJDA41EDAS</Td>
                  <Td>Toyota</Td>
                  <Td>Corrola Cross</Td>
                  <Td>MG42069</Td>
                  <Td isNumeric>20/11/2023</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Center>
      </Flex>
    </>
  )
}

export default HomePage
