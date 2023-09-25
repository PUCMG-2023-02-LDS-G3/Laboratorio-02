import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import Helmet from "react-helmet"
import { useForm } from "react-hook-form"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import useUser from "../../hooks/useUser"
import api from "../../Utils/api"
import { useState } from "react"

const schema = yup.object().shape({
  email: yup.string().required("Obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Senha deve ter no mínimo 6 dígitos"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais"),
})

function SingUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const navigate = useNavigate()
  const { createAccount } = useUser()
    const [userType, setUserType] = useState<"cliente" | "agente">("cliente")

  const onSubmit = (data: any) => {
    const isCliente = userType === "cliente"
    try {
      if (isCliente) {
        api.post("/usuario/create", {
          cpf: data.email,
          senha: data.password,
        })
        createAccount(data.email, data.password, isCliente)
      } else {
        api.post("/agente/create", {
          cnpj: data.email,
          senha: data.password,
        })
        createAccount(data.email, data.password, isCliente)
      }

      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeUserType = (type: "cliente" | "agente") => {
    setUserType(type)
  }

  return (
    <>
      <Helmet>
        <title>Criar conta | Desnorteia</title>
      </Helmet>
      <Center h={"100vh"}>
        <VStack gap={"8"}>
          <Heading>Desnorteia</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={"8"}>
              {userType === "cliente" ? (
                <VStack align={"start"}>
                  <Box>
                    <Text>CPF</Text>
                    <Input {...register("email")} />
                  </Box>
                  {errors.email && (
                    <Text color={"red.600"}>{errors.email.message}</Text>
                  )}
                </VStack>
              ) : (
                <VStack align={"start"}>
                  <Box>
                    <Text>CNPJ</Text>
                    <Input {...register("email")} />
                  </Box>
                  {errors.email && (
                    <Text color={"red.600"}>{errors.email.message}</Text>
                  )}
                </VStack>
              )}

              <VStack align={"start"}>
                <Box>
                  <Text>Senha</Text>
                  <Input {...register("password")} />
                </Box>
                {errors.password && (
                  <Text color={"red.600"}>{errors.password.message}</Text>
                )}
              </VStack>

              <VStack align={"start"}>
                <Box>
                  <Text>Confirmar senha</Text>
                  <Input {...register("confirmPassword")} />
                </Box>
                {errors.confirmPassword && (
                  <Text color={"red.600"}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </VStack>

              <Box>
            <Text>Entrar como</Text>
            <HStack gap={"4"}>
              {["cliente", "agente"].map((type) => (
                <Button
                  key={type}
                  onClick={() => handleChangeUserType(type as any)}
                  colorScheme={userType === type ? "facebook" : "gray"}>
                  {String(type).toLocaleUpperCase()}
                </Button>
              ))}
            </HStack>
          </Box>

              <Button type="submit" colorScheme="facebook">
                Entrar
              </Button>
            </VStack>
          </form>

          <Text>
            Já possui uma conta?
            <Link to={"/"}>Entre com sua conta</Link>
          </Text>
        </VStack>
      </Center>
    </>
  )
}

export default SingUpPage
