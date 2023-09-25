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
})

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const { SingIn } = useUser()
  const [userType, setUserType] = useState<"cliente" | "agente">("cliente")

  const handleChangeUserType = (type: "cliente" | "agente") => {
    setUserType(type)
  }

  const navigate = useNavigate()

  const onSubmit = (data: any) => {

    try {
      if (userType === "cliente") {
        api.post("/usuario/login", {
          cpf: data.email,
          senha: data.password,
        })
      } else {
        api.post("/agente/login", {
          cnpj: data.email,
          senha: data.password,
        })
      }

      if(SingIn(data.email, data.password, userType === "cliente")) {
        navigate("/app/home")
      } else {
        alert("Credenciais inválidas")
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Fazer login | Desnorteia</title>
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

              <Button type="submit" colorScheme="facebook">
                Entrar
              </Button>
            </VStack>
          </form>

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

          <Text>
            Não possui uma conta?
            <Link to={"/singup"}>Crie uma conta</Link>
          </Text>
        </VStack>
      </Center>
    </>
  )
}

export default LoginPage
