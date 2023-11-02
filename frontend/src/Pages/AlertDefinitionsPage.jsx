import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import AlertDefinitionBox from "../components/AlertDefinitionBox"

const AlertDefinitionsPage = () => {
    const [alertDefinitions, setAlertDefinitions] = useState([])

    useEffect(() => {
        const apiUrl = "http://127.0.0.1:8000/alertDefinitions"

        fetch(apiUrl)
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
