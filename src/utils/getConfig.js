const getConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
}

export default getConfig