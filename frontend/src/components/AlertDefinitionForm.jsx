import CustomButton from "./CustomButton"

const AlertDefinitionForm = ({
    setAlertName,
    alertName,
    setCryptocurrencyName,
    cryptocurrencyName,
    setAlertType,
    alertType,
    setLimit,
    limit,
    formDataCorrectness,
    buttonContent,
    buttonFunc,
}) => {
    return (
        <form className="flex flex-col space-y-4 items-center">
            <div className="grid grid-cols-2 w-1/4">
                <label className="self-center">Alert Name</label>
                <input
                    className={`border bg-white rounded p-2 ${
                        formDataCorrectness["cryptocurrencyName"]
                            ? "border-gray-300"
                            : "border-red-800"
                    }`}
                    onChange={(event) => {
                        setAlertName(event.target.value)
                    }}
                    type="text"
                    defaultValue={alertName}
                    placeholder="Ex: Bitcoin under 5000$ alert"
                />
            </div>

            <div className="grid grid-cols-2 w-1/4">
                <label className="self-center">Cryptocurrency</label>
                <select
                    className={`border bg-white rounded p-2 ${
                        formDataCorrectness["cryptocurrencyName"]
                            ? "border-gray-300"
                            : "border-red-800"
                    }`}
                    defaultValue={
                        cryptocurrencyName != ""
                            ? cryptocurrencyName
                            : "default"
                    }
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

            <div className="grid grid-cols-2 w-1/4">
                <label className="self-center">Type</label>
                <select
                    className={`border bg-white rounded p-2 ${
                        formDataCorrectness["cryptocurrencyName"]
                            ? "border-gray-300"
                            : "border-red-800"
                    }`}
                    defaultValue={alertType !== "" ? alertType : "default"}
                    onChange={(event) => {
                        setAlertType(event.target.value)
                    }}>
                    <option value="default" disabled>
                        Choose a type
                    </option>
                    <option value=">=">Greater than or equal: {">="}</option>
                    <option value="<">Less than: {"<"} </option>
                </select>
            </div>

            <div className="grid grid-cols-2 w-1/4">
                <label className="self-center">Limit</label>
                <input
                    className={`border bg-white rounded p-2 ${
                        formDataCorrectness["cryptocurrencyName"]
                            ? "border-gray-300"
                            : "border-red-800"
                    }`}
                    onChange={(event) => {
                        setLimit(event.target.value)
                    }}
                    defaultValue={limit}
                    type="text"
                    placeholder="5000"
                />
            </div>

            <CustomButton content={buttonContent} func={buttonFunc} />
        </form>
    )
}

export default AlertDefinitionForm
