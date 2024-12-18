import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import App from './App.jsx'
import Home from './pages/Home.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import AddPage from './pages/AddPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/AddPage",
    element: <AddPage/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
    <RouterProvider router={router}/>
    </ChakraProvider>
  </StrictMode>,
)
