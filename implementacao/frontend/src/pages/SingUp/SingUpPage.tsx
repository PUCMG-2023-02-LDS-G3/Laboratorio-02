import {
  Box,
  Button,
  Center,
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

const schema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
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

  const onSubmit = (data: any) => {
    console.log(data)

    navigate("/")
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
              <VStack align={"start"}>
                <Box>
                  <Text>Email</Text>
                  <Input {...register("email")} />
                </Box>
                {errors.email && <Text color={"red.600"}>{errors.email.message}</Text>}
              </VStack>

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
                  <Text color={"red.600"}>{errors.confirmPassword.message}</Text>
                )}
              </VStack>

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
