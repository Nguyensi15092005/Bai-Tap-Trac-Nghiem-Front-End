import { NavLink, Outlet } from "react-router-dom";
import "./style.scss";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";


function Layout() {
  const token = getCookie("token");
  const isLogin = useSelector(state => state.LoginReducer);

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__quiz">
            <NavLink to="/">Quiz</NavLink>
          </div>
          <div className="layout-default__main">

            <ul>
              <li>
                <NavLink className="layout-default__main--while" to="/">Home</NavLink>
              </li>
              {token &&
                <>
                  <li>
                    <NavLink className="layout-default__main--while" to="/topic">Topic</NavLink>
                  </li>
                  <li>
                    <NavLink className="layout-default__main--while" to="/answers">Answers</NavLink>
                  </li>
                </>
              }
            </ul>

          </div>
          <div className="layout-default__menu">
            {token ? (
              <div className="layout-default__login">
                <NavLink to="/logout" >LogOut</NavLink>
              </div>
            ) : (
              <>
                <div className="layout-default__login">
                  <NavLink to="/login">login</NavLink>
                </div>
                <div className="layout-default__register">
                  <NavLink to="/register">register</NavLink>
                </div>
              </>
            )}
          </div>
        </header>
        <div className="layout-default__group">
          <Outlet />
        </div>
        <div className="layout-default__footer">Copyright Nguyen Van Si @front-end</div>
      </div>
    </>
  )
}

export default Layout;