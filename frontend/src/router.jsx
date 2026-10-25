import { createBrowserRouter } from "react-router-dom"
import Home from "./Pages/Home"
import AuthProvider from "./Context/AuthContext"
import GuestRoute from "./Routes/GuestRoute"
import Login from "./Auth/Login"
import Register from "./Auth/Register"
import ProtectedRoute from "./Routes/ProtectedRoute"
import NavLinkLayout from "./Layouts/NavLinkLayout"
import Dashboard from "./Pages/Dashboard"
import NotFound from "./Pages/NotFound"
import Error from "./Components/Error.jsx"
import { dashboardFormHandler, editApplication } from "./Data/action.js"
import DashboardLayout from "./Layouts/DashboardLayout.jsx"
import { jobApplicationLoader, dashboardApplicationLoader, getApplication } from "./Data/loader.js"
import Applications from "./Pages/Applications.jsx"
import ViewApplication from "./Pages/ViewApplication.jsx"
import EditApplication from "./Pages/EditApplication.jsx"


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
                action: dashboardFormHandler,
                ErrorBoundary: Error,
                children: [
                  {
                    index: true,
                    element: <Dashboard />,
                    loader: dashboardApplicationLoader,
                    errorElement: <Error />
                  }
                ]
              }, {
                path: "applications",
                children: [
                  {
                    index: true,
                    element: <Applications />,
                    loader: jobApplicationLoader,
                    errorElement: <Error />
                  }, 
                  {
                    path: ':id',
                    element: <ViewApplication />,
                    loader: getApplication,
                    errorElement: <Error />
                  },
                  {
                    path: ':id/edit',
                    element: <EditApplication />,
                    loader: getApplication,
                    action: editApplication,
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