import { useContext, useState } from "react";
import Button from "../../commons/buttons/Button";
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../Contexts/UserContext";
import { toast } from "react-toastify";
import { AccountAPI, AuthAPI } from "../../../API/API";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Login = ({setIsAddCart, isAddCart}) => {

    const navigate = useNavigate();

    const [isForgot, setIsForgot] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const { setUser } = useContext(UserContext);
    const dataLogin = {
        username: username,
        password: password
    };

    const handleSubbmit = (e) => {
        e.preventDefault();
        axios.post(
            `${AuthAPI.AUTH_API}/signin`,
            dataLogin
        )
        .then(res => {
            const token = res.data.accessToken;
            const role = res.data.role;
            const username = res.data.username;
            const avatar = res.data.avatar;
            const idUser = res.data.id;
            localStorage.setItem("token",token)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('role',role)
            localStorage.setItem("username", username)
            localStorage.setItem("idUser", idUser)
            setUser(res.data);
            toast.success("Login successfully!",{
                position: toast.POSITION.TOP_CENTER
            })
            setIsAddCart(!isAddCart)
            return navigate('/')
        })
        .catch(err => {
            toast.error(err.response.data.message,{
                position: toast.POSITION.TOP_CENTER
            })
        });
    };

    const handleForgot = () => {
        setIsForgot(true)
    }
    const handleCancel = () => {
        setIsForgot(false)
    }
    const data = {
        email: email
    }
    const handleSendEmail = () => {
        setOpen(true);
        axios.post(
            `${AccountAPI.ACCOUNT_API}/forgotpass`,
            data
        )
        .then(res => {
            toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            return navigate('/');
        })
        .catch(err => {
            toast.error(err.response.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            return navigate('/');
        })
    }
    
    return ( 
        <div className="container">
                {(!isForgot) ? (
                <>
                    <form className="form-register-container " onSubmit={handleSubbmit}>
                    <h2>FORM LOGIN</h2>
                    <div className="form-group-register">
                        <label>Username</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required/>
                    </div>
                    <div className="form-group-register">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-around",marginBottom:"20px"}}>
                        <Link to="/register">Register Now</Link>
                        <Link to="/login" onClick={handleForgot}>Forgot Password</Link>
                    </div>
                    <Button type="submit" title="Login"/>
                </form>
                </>) : (
                <>
                    <div className="forgot-pass-container">
                        <p>Please feild your email to change password!</p>
                        <input 
                            type="email" 
                            placeholder="Your email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        <button type="button" onClick={handleSendEmail}>OK</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </>)}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
        </div>
     );
}
 
export default Login;