import { useEffect, useState } from "react"
import AlertDefinitionForm from "../components/AlertDefinitionForm"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"

const AlertDefinitionModificationPage = () => {
    const apiURL = import.meta.env.VITE_serverURL
    const alertDefinitionsEndpoint = import.meta.env
        .VITE_alertDefinitionsEndpoint

    const [alertDefinition, setAlertDefinition] = useState({})
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
    const params = useParams()

    useEffect(() => {
        fetch(apiURL + alertDefinitionsEndpoint + params.id)
            .then((response) => response.json())
            .then((data) => {
                setAlertName(data.alert_name)
                setCryptocurrencyName(data.cryptocurrency_name)
                setAlertType(data.alert_type)
                setLimit(data.limit)
                setAlertDefinition(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }, [])

    const save = () => {
        const inputCorrectness = verifyInput()
        if (Object.values(inputCorrectness).includes(false)) {
            console.error("Form data incorrect.")
            return false
        }

        const data = {
            id: alertDefinition.id,
            user_id: alertDefinition.user_id,
            alert_name: alertName,
            alert_type: alertType,
            cryptocurrency_name: cryptocurrencyName,
            limit: Number(limit),
            created_at: alertDefinition.created_at,
        }

        const headers = {
            "Content-Type": "application/json",
        }

        const request = {
            method: "PUT",
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
                console.error("Error with PUT request:", error)
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

            <div className="flex flex-col border border-purple-800 rounded m-2 p-2">
                <h1 className="text-2xl my-2 text-purple-800 text-center">
                    Alert Definition Management
                </h1>
            </div>

            {success ? (
                <h1 className="text-2xl text-center text-green-700">
                    Alert Definition Modified Successfully
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
                    buttonContent="Save Alert Definition"
                    buttonFunc={save}
                />
            )}
        </div>
    )
}

export default AlertDefinitionModificationPage
