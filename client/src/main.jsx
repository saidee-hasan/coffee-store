import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddCoffee from './components/AddCoffee.jsx'
import UpdateCoffee from './components/updateCoffee.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },{
    path:"/addCoffee",
    element:<AddCoffee/>
  },{
    path:"/updateCoffee",
    element:<UpdateCoffee/>
  }


])



createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
