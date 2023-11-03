import { useEffect, useState } from "react"
import AlertDefinitionForm from "../components/AlertDefinitionForm"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"

const AlertDefinitionModificationPage = () => {
    const apiUrl = "http://127.0.0.1:8000/"
    const [alertDefinition, setAlertDefinition] = useState({})
    const [alertName, setAlertName] = useState()
    const [cryptocurrencyName, setCryptocurrencyName] = useState()
    const [alertType, setAlertType] = useState()
    const [limit, setLimit] = useState()
    const params = useParams()

    useEffect(() => {
        fetch(apiUrl + "alertDefinition/" + params.id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
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

        fetch(apiUrl + "modifyAlertDefinition", request)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error("Error with PUT request:", error)
            })
    }

    return (
        <div className="h-screen w-3/4 mx-auto">
            <Navbar />

            <div className="flex flex-col border border-purple-800 rounded m-2 p-2">
                <h1 className="text-2xl my-2 text-purple-800 text-center">
                    Alert Definition Management
                </h1>
            </div>

            <AlertDefinitionForm
                setAlertName={setAlertName}
                alertName={alertName}
                setCryptocurrencyName={setCryptocurrencyName}
                cryptocurrencyName={cryptocurrencyName}
                setAlertType={setAlertType}
                alertType={alertType}
                setLimit={setLimit}
                limit={limit}
                func={save}
            />
        </div>
    )
}

export default AlertDefinitionModificationPage
