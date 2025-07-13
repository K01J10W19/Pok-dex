import { Box } from "@chakra-ui/react"
import { useColorModeValue } from './components/ui/color-mode.jsx'
import { Route, Routes } from "react-router-dom"
import { Toaster } from "./components/ui/toaster.jsx";
import CreatePage from "./pages/CreatePage.jsx"
import HomePage from "./pages/HomePage.jsx"
import Navbar from "./part/Navbar.jsx"
import Modal from 'react-modal';

Modal.setAppElement('#root');
function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
      </Routes>
      <Toaster />
    </Box>
  )
}

export default App
