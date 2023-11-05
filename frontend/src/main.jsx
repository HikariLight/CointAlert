import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import AlertDefinitionCreationPage from "./Pages/AlertDefinitionCreationPage.jsx"
import AlertDefinitionsManagementPage from "./Pages/AlertDefinitionsManagementPage.jsx"
import AlertDefinitionModificationPage from "./Pages/AlertModificationPage.jsx"
import "./index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/createAlertDefinition",
        element: <AlertDefinitionCreationPage />,
    },
    {
        path: "/alertDefinitions",
        element: <AlertDefinitionsManagementPage />,
    },
    {
        path: "/modifyAlertDefinition/:id",
        element: <AlertDefinitionModificationPage />,
    },
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
)
