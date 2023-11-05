import { useState } from "react"
import Navbar from "../components/Navbar"
import AlertDefinitionForm from "../components/AlertDefinitionForm"

const AlertDefinitionCreationPage = () => {
    const apiURL = import.meta.env.VITE_serverURL
    const alertDefinitionsEndpoint = import.meta.env
        .VITE_alertDefinitionsEndpoint

    const [alertName, setAlertName] = useState("")
    const [cryptocurrencyName, setCryptocurrencyName] = useState("")
    const [alertType, setAlertType] = useState("")
    const [limit, setLimit] = useState("")
    const [formDataCorrectness, setFormDataCorrectness] = useState({
        alertName: true,
        cryptocurrencyName: true,
        alertType: true,
        limit: true,
    })
    const [success, setSuccess] = useState(false)

    const createAlertDefinition = () => {
        const inputCorrectness = verifyInput()
        if (Object.values(inputCorrectness).includes(false)) {
            console.error("Form data incorrect.")
            return false
        }

        const data = {
            alert_name: alertName,
            alert_type: alertType,
            cryptocurrency: cryptocurrencyName,
            limit: Number(limit),
        }

        const headers = {
            "Content-Type": "application/json",
        }

        const request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        }

        fetch(apiURL + alertDefinitionsEndpoint, request)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const responseStatus = JSON.parse(data)["status"]
                if (responseStatus == "success") {
                    setSuccess(true)
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }

    const verifyInput = () => {
        const result = {
            alertName: true,
            cryptocurrencyName: true,
            alertType: true,
            limit: true,
        }

        console.log({ length: alertName.length })
        if (alertName.length == 0 || alertName.length == 0) {
            result["alertName"] = false
        }

        if (cryptocurrencyName.length == 0) {
            result["cryptocurrencyName"] = false
        }

        if (alertType.length == 0) {
            result["alertType"] = false
        }

        if (limit.length == 0 || isNaN(Number(limit))) {
            result["limit"] = false
        }

        setFormDataCorrectness(result)
        return result
    }

    return (
        <div className="h-screen w-3/4 mx-auto">
            <Navbar />

            <div className="border border-purple-800 rounded p-4 w-full">
                <h1 className="text-2xl my-2 text-purple-800 text-center">
                    Create an alert
                </h1>

                {success ? (
                    <h1 className="text-2xl text-center text-green-700">
                        Alert Definition Created successfuly
                    </h1>
                ) : (
                    <AlertDefinitionForm
                        setAlertName={setAlertName}
                        alertName={alertName}
                        setCryptocurrencyName={setCryptocurrencyName}
                        cryptocurrencyName={cryptocurrencyName}
                        setAlertType={setAlertType}
                        alertType={alertType}
                        setLimit={setLimit}
                        limit={limit}
                        formDataCorrectness={formDataCorrectness}
                        buttonContent="Create Alert Definition"
                        buttonFunc={createAlertDefinition}
                    />
                )}
            </div>
        </div>
    )
}

export default AlertDefinitionCreationPage
