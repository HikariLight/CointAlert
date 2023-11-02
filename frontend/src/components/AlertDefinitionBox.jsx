const AlertDefinitionBox = ({ alertDefinition }) => {
    const deleteAlertDefinition = () => {
        const apiUrl = "http://127.0.0.1:8000/deleteAlertDefinition"

        const data = {
            alertDefinitionId: alertDefinition.id,
        }

        const headers = {
            "Content-Type": "application/json",
        }

        const request = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        }

        fetch(apiUrl, request)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
    }

    return (
        <div className="border rounded border-purple-800 p-2 grid grid-cols-4">
            <div className="col-span-3">
                <h1 className="text-xl text-purple-800">
                    Alert: {alertDefinition.alert_name}
                </h1>
                <h3>Alert Type: {alertDefinition.alert_type}</h3>
                <h3>Alert limit: {alertDefinition.limit}</h3>
            </div>

            <button
                onClick={() => deleteAlertDefinition()}
                className="bg-purple-800 hover:bg-red-800 text-white rounded-md">
                Delete
            </button>
        </div>
    )
}

export default AlertDefinitionBox
