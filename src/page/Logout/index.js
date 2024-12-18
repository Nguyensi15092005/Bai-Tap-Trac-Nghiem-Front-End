import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { CheckLogin } from "../../action/login";

function LogOut(){
    const navigate= useNavigate();
    const dispatch = useDispatch();

    deleteAllCookie();
    useEffect(()=>{
        dispatch(CheckLogin(false));
        navigate("/login");
    },[])
    return(
        <>
        </>
    )
}
 
export default LogOut;