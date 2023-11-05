const AlertBox = ({ alert, getAlerts }) => {
    const apiURL = import.meta.env.VITE_serverURL
    const alertsEndpoint = import.meta.env.VITE_alertsEndpoint

    const deleteAlert = () => {
        fetch(apiURL + alertsEndpoint + alert.id, { method: "DELETE" })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                getAlerts()
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }

    return (
        <div className="border rounded border-purple-800 p-2 grid grid-cols-4">
            <div className="col-span-3">
                <h1 className="text-xl text-purple-800">
                    Alert: {alert.alert_name}
                </h1>
                <h3>Occurred on: {alert.date}</h3>
                <h3>Alert limit: {alert.limit}</h3>
                <h3>Price reached: {alert.price}</h3>
            </div>

            <button
                onClick={() => deleteAlert()}
                className="bg-purple-800 hover:bg-red-800 text-white rounded-md">
                Delete
            </button>
        </div>
    )
}

export default AlertBox
