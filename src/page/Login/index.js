import { login } from "../../services/UserService";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import  {CheckLogin} from "../../action/login";

function Login() {
    const navigeta = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const response = await login(email, password);
        console.log(response);
        if (response.length > 0) {
            setCookie("id", response[0].id, 1);
            setCookie("fullname", response[0].fullname, 1);
            setCookie("email", response[0].email, 1);
            setCookie("token", response[0].token, 1);
            dispatch(CheckLogin(true));
            navigeta("/");
        }
        else {
            alert("Sai tài khoản hoặc mật khẩu");
        }

    }

    return (
        <>
            <form className="login" onSubmit={handleSubmit}>
                <h2 className="login__title">Login Quiz</h2>
                <input className="login__email" type="email" placeholder="Email" /><br />
                <input type="password" placeholder="Password" className="login__pass" /><br />
                <button type="submit" className="login__button">Login</button>
            </form>
        </>
    )
}

export default Login;