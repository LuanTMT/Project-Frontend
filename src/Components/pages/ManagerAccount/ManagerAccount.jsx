import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './managerAccount.css';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { AccountAPI, UserAPI } from "../../../API/API";

const ManagerAccount = ({setIsAddCart, isAddCart}) => {

    const navigate = useNavigate();

    const [account, setAccount] = useState({})
    const initialValues = {currentPassword: "", newPassword: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [formChangePass, setFormChangePass] = useState(false)
    const [file, setFile] = useState(null);
    const role = localStorage.getItem('role')
    const idUser = localStorage.getItem('idUser');

    

    useEffect(() => {
        axios.get(
            `${UserAPI.USER_API}/${idUser}`,{
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            setAccount(res.data);
        })
        .catch(err => {
            console.log(err);
        });

        const isSuccess = (Object.keys(formErrors).length === 0 && isSubmit);

        if (isSuccess){
            const dataChange = {
                        currentPassword: formValues.currentPassword,
                        newPassword: formValues.newPassword
                    }
                    axios.put(
                        `${UserAPI.USER_API}/changepass/${idUser}`,
                        dataChange,{
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": localStorage.getItem('token')
                            }
                        }
                    )
                    .then(res => {
                        toast.success(res.data.message,{
                            position: toast.POSITION.TOP_CENTER
                          });
                        return navigate('/')
                    })
                    .catch(err => {
                        console.log(err);
                        if(err.response.status === 400) {
                            toast.error(err.response.data.message,{
                                position: toast.POSITION.TOP_CENTER
                              })
                        }
                    })
        }

        const newAvatar = new FormData();
        newAvatar.append('image', file)

        if (file !== null) {
            axios.put(
                `${AccountAPI.ACCOUNT_API}/avatar/${account.id}`,newAvatar,{
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                }
            )
            .then(res => {
                setAccount(res.data.user);
                localStorage.setItem('avatar', res.data.user.avatar)
                setIsAddCart(!isAddCart);
            })
            .catch(err => {
                console.log(err);
            })

        }
    },[formErrors,file]);

    const closeForm = () => {
        setFormChangePass(false);
    }

    const handleChangePass = () => {
        setFormChangePass(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    const validate = (values) => {
        const errors = {};
        if (!values.currentPassword) {
            errors.currentPassword = "* Password is required!"
        }
        if (!values.newPassword) {
            errors.newPassword = "* Password is required!"
        }else if (values.newPassword.length <= 4) {
            errors.newPassword = "* Password must be more than 4 characters!"
        }else if (values.newPassword.length > 30) {
            errors.newPassword = "* Password must be less than 30 characters!"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "* Confirm Password is required!"
        }else if (values.confirmPassword !== values.newPassword) {
            errors.confirmPassword = "* Confirm password is not format with password!"
        }
        return errors;
    }

    const handleChangeAvt = () => {
        document.getElementById('update-avt').click();
    }

    const redirecOrder = () => {
        return navigate('/order')
    }

    return ( 
            <div className="account-manager-container">
            {formChangePass ? (
                <div className="form-change-pass">
                    <CloseIcon  className="close-icon" onClick={closeForm}/>
                    <h3>CHANGE PASSWORD</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input 
                                type="password" 
                                name="currentPassword"
                                placeholder="New password..."
                                value={formValues.currentPassword}
                                onChange={handleChange}    
                            />
                        </div>
                        <p className="error-form">{ formErrors.currentPassword }</p>
                        <div className="form-group">
                            <label>New Password</label>
                            <input 
                                type="password" 
                                name="newPassword"
                                placeholder="New password..."
                                value={formValues.newPassword}
                                onChange={handleChange}    
                            />
                        </div>
                        <p className="error-form">{ formErrors.newPassword }</p>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input 
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password..."
                                value={formValues.confirmPassword}
                                onChange={handleChange}     
                            />
                        </div>
                    <p className="error-form">{ formErrors.confirmPassword }</p>
                    <button type="submit" className="change-pass-btn">Change Password</button>
                </form>
            </div>
            ) : (
               <>
                    <div className="account-avatar">
                        <img src={((account.avatar) === undefined) ? (``) : (`http://127.0.0.1:5000/public/images/${account.avatar}`)} alt={account.avatar} />
                        <input 
                            type="file" 
                            id="update-avt" 
                            accept=".jpg,.jpeg,.png" 
                            name="file" 
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{display:"none"}}
                        />
                        <button onClick={handleChangeAvt}>Change Avatar</button>
                    </div>
                    <div className="account-info-action">
                        {(role === 'admin') ? (
                            <div className="manager-info">
                                <div className="account-info">
                                    <div><strong>Full Name: </strong><span>{account.fullName}</span></div>
                                    <div><strong>Username: </strong><span>{account.username}</span></div>
                                    <div><strong>Email: </strong><span>{account.email}</span></div>
                                    <div><strong>Phone: </strong><span>{account.phone}</span></div>
                                    <div><strong>Address: </strong><span>{account.address}</span></div>
                                </div>
                                <button className="account-action" onClick={handleChangePass}>Change Password</button>
                            </div>
                        ) : (
                            <div className="manager-info">
                                <div className="account-info">
                                    <div><strong>Full Name: </strong><span>{account.fullName}</span></div>
                                    <div><strong>Username: </strong><span>{account.username}</span></div>
                                    <div><strong>Email: </strong><span>{account.email}</span></div>
                                    <div><strong>Phone: </strong><span>{account.phone}</span></div>
                                    <div><strong>Address: </strong><span>{account.address}</span></div>
                                </div>
                                <div className="account-action">
                                    <button onClick={handleChangePass}>Change Password</button>
                                    <button onClick={redirecOrder}>My Order</button>
                                </div>
                            </div>
                        )}
                    </div>
               </>
            )}
            </div>
     );
}
 
export default ManagerAccount;