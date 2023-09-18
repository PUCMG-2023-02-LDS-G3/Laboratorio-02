import React from "react"
import ReactDOM from "react-dom/client"
import Routes from "./Routes.js"

import { ChakraProvider } from "@chakra-ui/react"
import UserProvider from "./provider/UserProvider.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <>
          <Routes />
        </>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
)
