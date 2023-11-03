import { Link } from "react-router-dom"
import CustomButton from "./CustomButton"

const AlertDefinitionBox = ({ alertDefinition }) => {
    const apiURL = import.meta.env.VITE_serverURL
    const alertDefinitionsEndpoint = import.meta.env
        .VITE_alertDefinitionsEndpoint

    const deleteAlertDefinition = () => {
        fetch(apiURL + alertDefinitionsEndpoint + alertDefinition.id, {
            method: "DELETE",
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
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

            <div className="flex flex-col gap-2">
                <CustomButton
                    content="Delete"
                    func={deleteAlertDefinition}></CustomButton>

                <Link to={`/modifyAlertDefinition/${alertDefinition.id}`}>
                    <CustomButton content="Modify" />
                </Link>
            </div>
        </div>
    )
}

export default AlertDefinitionBox
