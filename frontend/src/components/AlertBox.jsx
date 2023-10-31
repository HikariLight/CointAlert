const AlertBox = ({alert}) => {
    return(
        <div className="border rounded border-purple-800 p-2">
            <h1 className="text-xl text-purple-800">Alert: {alert.name}</h1>
            <h3>Occurred on: {alert.date}</h3>
            <h3>Alert limit: {alert.limit}</h3>
            <h3>Price reached: {alert.price}</h3>
        </div>
    )
}

export default AlertBox