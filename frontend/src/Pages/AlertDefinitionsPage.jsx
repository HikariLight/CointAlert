import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import AlertDefinitionBox from "../components/AlertDefinitionBox"
import CustomButton from "../components/CustomButton"

const AlertDefinitionsPage = () => {
    const apiURL = import.meta.env.VITE_serverURL
    const alertDefinitionsEndpoint = import.meta.env
        .VITE_alertDefinitionsEndpoint

    const [alertDefinitions, setAlertDefinitions] = useState([])

    useEffect(() => {
        fetch(apiURL + alertDefinitionsEndpoint)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setAlertDefinitions(JSON.parse(data))
            })
    }, [])

    return (
        <div className="h-screen w-3/4 mx-auto">
            <Navbar />

            <div className="flex flex-col border border-purple-800 rounded m-2 p-2">
                <h1 className="text-2xl my-2 text-purple-800 text-center">
                    Alert Definition Management
                </h1>

                <a href="/createAlertDefinition">
                    <CustomButton content="Create new Alert Definition" />
                </a>
            </div>

            <div className="border border-purple-800 rounded p-4 w-full">
                <div className="grid grid-cols-3 gap-3">
                    {alertDefinitions.map((alertDefinition, index) => (
                        <AlertDefinitionBox
                            alertDefinition={alertDefinition}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AlertDefinitionsPage
