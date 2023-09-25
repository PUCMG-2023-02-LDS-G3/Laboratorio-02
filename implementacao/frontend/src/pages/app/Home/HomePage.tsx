import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"
import useUser from "../../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import useContracts from "../../../hooks/useContracts"
import { BsFillTrashFill, BsCheck } from "react-icons/bs"
import {FaTimes} from "react-icons/fa"

const schema = yup.object().shape({
  cnpj: yup.string().required("CNPJ é obrigatório"),
  matricula: yup.string().required("Matricula do carro é obrigatória"),
  valor: yup.number(),
  banco: yup.string(),
})

function HomePage() {
  const { user, SingOut, isUserLogged } = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const {
    createOrder,
    getUserOrders,
    removeOrder,
    getUserContracts,
    getAgentOrders,
    getAgentContracts,
    acceptOrder,
    rejectContract,
    rejectOrder,
  } = useContracts()
  const [isCredito, setIsCredito] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { valor: 0, banco: "" },
  })

  const handleChangeIsCredito = () => {
    setIsCredito(!isCredito)
  }

  const onSubmit = ({ cnpj, matricula, banco, valor }: any) => {
    const contract =
      banco.lenght === 0 && valor === 0 ? null : { cnpj: banco, valor }

    createOrder({
      cnpj,
      matricula,
      cpf: user.email,
      data: new Date(),
      aproved: null,
      credito: contract,
    })
    onClose()
    resetField("cnpj")
    resetField("matricula")
    resetField("banco")
    resetField("valor")
  }

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
        {user.isCliente ? (
          <Text> CPF: {user.email}</Text>
        ) : (
          <Text> CNPJ: {user.email}</Text>
        )}
        <Button colorScheme="facebook" onClick={handleSingOut}>
          Sair
        </Button>
      </Flex>

      <Flex flexDir={"column"}>
        {user.isCliente ? (
          <>
            <Center padding={"8"} gap={"8"}>
              <Button colorScheme="facebook" onClick={onOpen}>
                Alugar automovel
              </Button>
            </Center>

            <VStack gap={"10"}>
              <Center>
                <VStack>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    Pedidos
                  </Text>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Matrícula</Th>
                          <Th>CNPJ</Th>
                          <Th>Status</Th>
                          <Th isNumeric>Data</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {getUserOrders(user.email).map((order) => (
                          <Tr key={order.matricula}>
                            <Td>{order.matricula}</Td>
                            <Td>{order.cnpj}</Td>
                            <Td>
                              {order.aproved === null ? (
                                <Text>Em analise</Text>
                              ) : order.aproved ? (
                                <Text>Aprovado</Text>
                              ) : (
                                <Text>Reprovado</Text>
                              )}
                            </Td>
                            <Td isNumeric>{String(order.data)}</Td>
                            <Td>
                              <Button>
                                <BsFillTrashFill
                                  onClick={() => removeOrder(order)}
                                />
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </VStack>
              </Center>

              <Center>
                <VStack>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    Contratos
                  </Text>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Matrícula</Th>
                          <Th>CNPJ</Th>
                          <Th isNumeric>valor</Th>
                          <Th isNumeric>Data de inicio</Th>
                          <Th isNumeric>Data de fim</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {getUserContracts(user.email).map((contract) => (
                          <Tr key={contract.matricula}>
                            <Td>{contract.matricula}</Td>
                            <Td>{contract.cnpj}</Td>
                            <Td isNumeric>{contract.valor}</Td>
                            <Td isNumeric>{String(contract.dataInicio)}</Td>
                            <Td isNumeric>{String(contract.dataFim)}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </VStack>
              </Center>
            </VStack>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Fazer pedido
                  </AlertDialogHeader>

                  <Divider />

                  <AlertDialogBody marginY={"4"}>
                    <Center>
                      <VStack gap={"8"}>
                        <VStack align={"start"}>
                          <Box>
                            <Text>CNPJ</Text>
                            <Input {...register("cnpj")} />
                          </Box>
                          {errors.cnpj && (
                            <Text color={"red.600"}>{errors.cnpj.message}</Text>
                          )}
                        </VStack>

                        <VStack align={"start"}>
                          <Box>
                            <Text>Matricula</Text>
                            <Input {...register("matricula")} />
                          </Box>
                          {errors.matricula && (
                            <Text color={"red.600"}>
                              {errors.matricula.message}
                            </Text>
                          )}
                        </VStack>

                        <Button
                          colorScheme="facebook"
                          onClick={handleChangeIsCredito}>
                          Adicionar contrato de credito
                        </Button>

                        {isCredito ? (
                          <>
                            <VStack align={"start"}>
                              <Box>
                                <Text>CNJP do banco</Text>
                                <Input {...register("banco")} />
                              </Box>
                              {errors.banco && (
                                <Text color={"red.600"}>
                                  {errors.banco.message}
                                </Text>
                              )}
                            </VStack>
                            <VStack align={"start"}>
                              <Box>
                                <Text>Valor</Text>
                                <Input type="number" {...register("valor")} />
                              </Box>
                              {errors.valor && (
                                <Text color={"red.600"}>
                                  {errors.valor.message}
                                </Text>
                              )}
                            </VStack>
                          </>
                        ) : (
                          <> </>
                        )}
                      </VStack>
                    </Center>
                  </AlertDialogBody>

                  <Divider />

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      colorScheme="facebook"
                      onClick={handleSubmit(onSubmit)}
                      ml={3}>
                      Fazer pedido
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        ) : (
          <>
            <Center padding={"8"} gap={"8"}></Center>

            <VStack gap={"12"}>
              <Center>
                <VStack>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    Pedidos para analisar
                  </Text>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Matrícula</Th>
                          <Th>CNPJ</Th>
                          <Th>Status</Th>
                          <Th isNumeric>Data</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {getAgentOrders(user.email).map((order) => (
                          <Tr key={order.matricula}>
                            <Td>{order.matricula}</Td>
                            <Td>{order.cnpj}</Td>
                            <Td>
                              {order.aproved === null ? (
                                <Text>Em analise</Text>
                              ) : order.aproved ? (
                                <Text>Aprovado</Text>
                              ) : (
                                <Text>Reprovado</Text>
                              )}
                            </Td>
                            <Td isNumeric>{String(order.data)}</Td>
                            <Td>
                              <Button>
                                <BsCheck
                                  onClick={() => acceptOrder(order, new Date())}
                                />
                              </Button>
                            </Td>
                            <Td>
                              <Button>
                                <FaTimes
                                  onClick={() => rejectOrder(order)}
                                />
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </VStack>
              </Center>

              <Center>
                <VStack>
                  <Text fontSize={"3xl"} fontWeight={"bold"}>
                    Contratos ativos
                  </Text>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Matrícula</Th>
                          <Th>CPF</Th>
                          <Th isNumeric>valor</Th>
                          <Th isNumeric>Data de inicio</Th>
                          <Th isNumeric>Data de fim</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {getAgentContracts(user.email).map((contract) => (
                          <Tr key={contract.matricula}>
                            <Td>{contract.matricula}</Td>
                            <Td>{contract.cpf}</Td>
                            <Td isNumeric>{contract.valor}</Td>
                            <Td isNumeric>{String(contract.dataInicio)}</Td>
                            <Td isNumeric>{String(contract.dataFim)}</Td>
                            <Td>
                              <Button>
                                <BsFillTrashFill
                                  onClick={() => rejectContract(contract)}
                                />
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </VStack>
              </Center>
            </VStack>

          </>
        )}
      </Flex>
    </>
  )
}

export default HomePage
