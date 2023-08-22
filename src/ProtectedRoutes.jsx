import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoutes = () => {

    const isLogin =useSelector(state=>state.user.isLogin)

    return isLogin === true ? <Outlet/>: <Navigate to ="/login"/>
 
}

export default ProtectedRoutes