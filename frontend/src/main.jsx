import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import AlertCreationPage from './Pages/AlertCreationPage.jsx'
import './index.css'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/createAlert",
        element: <AlertCreationPage />
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
