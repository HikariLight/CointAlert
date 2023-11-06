import { useEffect, useState } from "react"
import AlertBox from "./components/AlertBox"
import Navbar from "./components/Navbar"
import CustomButton from "./components/CustomButton"

const App = () => {
    const apiURL = import.meta.env.VITE_serverURL
    const alertsEndpoint = import.meta.env.VITE_alertsEndpoint

    const [alerts, setAlerts] = useState([])

    const getAlerts = () => {
        fetch(apiURL + alertsEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setAlerts(JSON.parse(data))
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }

    const deleteAlerts = async () => {
        fetch(apiURL + alertsEndpoint, { method: "DELETE" })
            .then((response) => {
                return response.json()
            })
            .then(() => {
                getAlerts()
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }

    useEffect(() => {
        getAlerts()
        const intervalId = setInterval(getAlerts, 5000) // 5000 milliseconds = 5 seconds
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <div className="h-screen w-3/4 mx-auto">
            <Navbar />

            <div className="flex flex-col border border-purple-800 rounded m-2 p-2">
                <h1 className="text-2xl my-2 text-purple-800 text-center">
                    CointAlert
                </h1>

                <h3 className="text-xl my-2 text-purple-800 text-center">
                    There are currently {alerts.length} alerts.
                </h3>

                <div className="flex gap-2">
                    <CustomButton content="Refresh Alerts" func={getAlerts} />
                    <CustomButton
                        content="Delete All Alerts"
                        func={deleteAlerts}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {alerts.map((alert, index) => (
                    <AlertBox alert={alert} getAlerts={getAlerts} key={index} />
                ))}
            </div>
        </div>
    )
}

export default App
