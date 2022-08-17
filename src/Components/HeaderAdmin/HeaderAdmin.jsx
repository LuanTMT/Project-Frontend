import { Link } from "react-router-dom";
import Logo from "../../images/logo1.png";
import './headerAdmin.css';
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import UserContext from "../../Contexts/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const HeaderAdmin = () => {
    const { setRole } = useContext(UserContext);
    let navigate = useNavigate();
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar')
    const handleLogout = () => {
        localStorage.clear();
        setRole("");
        toast.success('Logout successfully',{
            position: toast.POSITION.TOP_CENTER
          });
        return navigate('/')
    }

    return ( 
        <>
            {username ? (
            <div className="header-admin-container">
            <div className="logo-admin">
                <Link to="/"><img src={Logo} alt={Logo}/></Link>
            </div>
            <h2>ADMIN PAGE</h2>
            <div className="admin-account">
                <img src={`http://127.0.0.1:5000/public/images/${avatar}`} alt="avatar" />
                <Link to="/account-manager" className='username'>{username}</Link>
                <div className='manager-account-admin'>
                        <p><Link to='/account-manager' className='my-account'>My Account</Link></p>
                        <p><Link to='/' onClick={handleLogout} className='my-account logout'>Logout</Link></p>
                </div>
            </div>
        </div>
        ) : (
            <Header />
        )}
        </>
     );
}
 
export default HeaderAdmin;