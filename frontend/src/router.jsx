import { createBrowserRouter } from "react-router-dom"
import Home from "./Pages/Home"
import AuthProvider from "./Context/AuthContext"
import GuestRoute from "./Routes/GuestRoute"
import Login from "./Auth/Login"
import Register from "./Auth/Register"
import ProtectedRoute from "./Routes/ProtectedRoute"
import NavLinkLayout from "./Layouts/NavLinkLayout"
import DashboardLayout from "./Layouts/DashboardLayout"
import Dashboard from "./Pages/Dashboard"
import User from "./Pages/User"
import NotFound from "./Pages/NotFound"
import { userLoader } from "./Data/loader.js"
import Error from "./Components/Error.jsx"
import { dashboardFormHandler } from "./Data/action.js"


const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <NavLinkLayout />,
            children: [
              { index: true, element: <Home /> },
              {
                path: "dashboard",
                element: <DashboardLayout />,
                children: [
                  { 
                    index: true, 
                    element: <Dashboard />,
                    action: dashboardFormHandler,
                    // loader: displayCount,
                    // action: updateCount,
                    errorElement: <Error />
                  },
                  { 
                    path: ":userId", 
                    element: <User />, 
                    loader: userLoader,
                    errorElement: <Error />
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  { path: "*", element: <NotFound /> }
])


export default router