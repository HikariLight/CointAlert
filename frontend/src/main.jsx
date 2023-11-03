import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import AlertCreationPage from "./Pages/AlertCreationPage.jsx"
import AlertDefinitionsPage from "./Pages/AlertDefinitionsPage.jsx"
import "./index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/createAlertDefinition",
        element: <AlertCreationPage />,
    },
    {
        path: "/alertDefinitions",
        element: <AlertDefinitionsPage />,
    },
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
)
