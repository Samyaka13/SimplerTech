import { Box } from '@chakra-ui/react'
import CustomTable from './customComponents/CustomTable'
// import './App.css'
function App() {

  return (
    <Box w={"100%"} h={"100vh"} p={5} overflow={'hidden'} bg={"#F5F5F5"}>
        <CustomTable/>
        {/* <Demo/> */}
    </Box>
  )
}

export default App
