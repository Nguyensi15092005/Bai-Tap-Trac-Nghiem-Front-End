import "./style.scss";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import  {CheckLogin} from "../../action/login";
import { checkExit, registerService } from "../../services/UserService";
import { generateToken } from "../../helpers/generateToken";

function Register(){
    const navigeta = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullname = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        const checkExitEmail = await checkExit("email", email);
        if(checkExitEmail.length > 0){
            alert("Email đã tồn tại!!!");
        }
        else{
            const options = {
                fullname: fullname,
                email: email,
                password: password,
                token: generateToken()
            }
            const response = await registerService(options);
            if (response) {
                navigeta("/login");
            }
            else {
                alert("Đăng ký ko thành công!!!");
            }
        }   
        

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="register" >
                <h2 className="register__title">Register Account</h2>
                <input type="text" placeholder="Full Name" className="register__name" required/><br/>
                <input type="email" placeholder="Email" className="register__email" required/><br/>
                <input type="password" placeholder="Password" className="register__pass" required /><br/>
                <button type="submit" className="register__button" >Register</button> 
            </form>
        </>
    )
}

export default Register;