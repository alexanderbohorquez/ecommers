import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    // localStorage.getItem()

    const tokenValue = localStorage.getItem("token")

    if (tokenValue){
        return <Outlet/>
    }else{
        return <Navigate to="/Login"/>
    }
}

export default ProtectedRoutes