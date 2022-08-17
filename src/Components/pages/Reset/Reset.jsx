import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccountAPI } from '../../../API/API';
import './reset.css';

const Reset = () => {

    const param = useParams(); 
    const token = param.tempToken;
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const newPass = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        token: token
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(
            `${AccountAPI.ACCOUNT_API}/reset`,
            newPass
        )
        .then(res => {
            toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            localStorage.removeItem("idUser");
            return navigate('/');
        })
        .catch(err => {
            toast.error(err.response.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            return;
        })
    }
    return ( 
        <div className="reset-container" onSubmit={handleSubmit}>
            <form className="form-reset-container">
                <h3>RESET PASSWORD</h3>
                <div className="form-group">
                    <label>New Password</label>
                    <input 
                        type="password" 
                        placeholder="new password..."
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        placeholder="Confirm password..."
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>OK</button>
            </form>
        </div>
     );
}
 
export default Reset;