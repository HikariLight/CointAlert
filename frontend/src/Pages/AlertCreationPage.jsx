import { useState } from "react"
import CustomButton from "../components/CustomButton"
import Navbar from "../components/Navbar"

const AlertCreationPage = () => {
    const [alertName, setAlertName] = useState()
    const [cryptocurrencyName, setCryptocurrencyName] = useState()
    const [alertType, setAlertType] = useState()
    const [limit, setLimit] = useState()

    const handleClick = () => {
        const apiUrl = "http://127.0.0.1:8000/createAlert"

        const data = {
            alert_name: alertName,
            alert_type: alertType,
            cryptocurrency: cryptocurrencyName,
            limit: limit,
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
        <div className="h-screen w-3/4 mx-auto">
            <Navbar />

            <div className="border border-purple-800 rounded p-4 w-full">
                <h1 className="text-2xl my-2 text-purple-800 text-center">
                    Create an alert
                </h1>

                <form className="flex flex-col space-y-4 items-center">
                    <div className="flex flex-row gap-2">
                        <label className="self-center">Alert Name</label>
                        <input
                            className="border border-gray-300 rounded p-2"
                            onChange={(event) => {
                                setAlertName(event.target.value)
                            }}
                            type="text"
                            placeholder="Ex: Bitcoin under 5000$ alert"
                        />
                    </div>

                    <div className="flex flex-row gap-2">
                        <label className="self-center">Cryptocurrency</label>
                        <select
                            className="border bg-white border-gray-300 rounded p-2"
                            defaultValue="default"
                            onChange={(event) => {
                                setCryptocurrencyName(event.target.value)
                            }}>
                            <option value="default" disabled>
                                Choose a Cryptocurrency
                            </option>
                            <option value="BTC">BTC - Bitcoin</option>
                            <option value="ETH">ETH - Ethereum</option>
                            <option value="XRP">XRP - Ripple</option>
                            <option value="LTC">LTC - Litecoin</option>
                            <option value="BCH">BCH - Bitcoin Cash</option>
                            <option value="ADA">ADA - Cardano</option>
                            <option value="XLM">XLM - Stellar</option>
                            <option value="DOGE">DOGE - Dogecoin</option>
                            <option value="XMR">XMR - Monero</option>
                            <option value="EOS">EOS - EOS</option>
                        </select>
                    </div>

                    <div className="flex flex-row gap-2">
                        <label className="self-center">Type</label>
                        <select
                            className="border bg-white border-gray-300 rounded p-2"
                            defaultValue="default"
                            onChange={(event) => {
                                setAlertType(event.target.value)
                            }}>
                            <option value="default" disabled>
                                Choose a type
                            </option>
                            <option value="gte">
                                Greater than or equal: {">="}
                            </option>
                            <option value="lt">Less than: {"<"} </option>
                        </select>
                    </div>

                    <div className="flex flex-row gap-2">
                        <label className="self-center">Limit</label>
                        <input
                            className="border border-gray-300 rounded p-2"
                            onChange={(event) => {
                                setLimit(event.target.value)
                            }}
                            type="text"
                            placeholder="5000"
                        />
                    </div>

                    <CustomButton content="Create Alert" func={handleClick} />
                </form>
            </div>
        </div>
    )
}

export default AlertCreationPage