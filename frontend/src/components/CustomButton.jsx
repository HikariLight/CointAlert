const CustomButton = ({ content, func }) => {
    return (
        <button
            onClick={() => func()}
            type="button"
            className="py-2 px-4  bg-purple-800 hover:bg-purple-900 focus:ring-purple-700 focus:ring-offset-purple-600 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
            {content}
        </button>
    )
}

export default CustomButton
