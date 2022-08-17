import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './customerManager.css';
import { toast } from "react-toastify";
import { UserAPI } from "../../../API/API";

const CustomerManager = () => {

    const [listUser, setListUser] = useState([]);
    const [isAction, setIsAction] = useState(false);
    const [usename, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [iamRole, setIamRole] = useState('admin');
    const [idUser, setIdUser] = useState(0)
    const newUser = {
        username: usename,
        email: email,
        password: password
    }

    useEffect(() => {
        axios.get(
            `${UserAPI.USER_API}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            setListUser(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [isAction])

    const handleDelete = (id) => {

        axios.delete(
            `${UserAPI.USER_API}/${id}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            setIsAction(!isAction)
        })
        .catch(err => {
            toast.error(err.response.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
        })
    }

    const handleAddUser = () => {
        axios.post(
            `${UserAPI.USER_API}`,
            newUser,{
                headers: {
                    "Content-Type":"application/json",
                    "x-access-token": localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            setIsAction(!isAction)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleEdit = (id) => {
        setIdUser(id);
    }

    const handleUpdateRole = () => {
        axios.put(
            `${UserAPI.USER_API}/${idUser}`,{iamRole},{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            toast.success(res.data.message);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return ( 
        <div className="user-manager-container">
            <div className="add-user">
                <button type="button" className="btn btn-primary w-25 mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    ADD USER
                </button>
            </div>
            <Table className="table-customer-manager">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fullName}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>
                                    <EditIcon className="edit-user" onClick={() => handleEdit(user.id)} data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">UPDATE ROLE</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <select name="role" onChange={(e) => setIamRole(e.target.value)} style={{width:"100%", padding:"10px"}}>
                                                    <option value="admin">Admin</option>
                                                    <option value="member">Member</option>
                                                </select>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={handleUpdateRole}>Save changes</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <DeleteIcon className="delete-user" onClick={() => handleDelete(user.id)}/>
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">ADD USER</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-add-user">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddUser}>ADD USER</button>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default CustomerManager;