import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import './categorymanager.css';
import { toast } from "react-toastify";
import { CategoryAPI } from "../../../API/API";

const CategoryManager = () => {

    const [listCategory, setListCategory] = useState([]);
    const [idCate, setIdCate] = useState(0);
    const [nameCategory, setNameCategory] = useState('');
    const [isAction, setIsAction] = useState(false);
    const [nameCate, setNameCate] = useState('');
    const dataAdd = {
        name: nameCate
    }
    const handleAddCate = () => {
        // e.preventDefault();
        axios.post(
            `${CategoryAPI.CATEGORY_API}`,dataAdd,{
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
              })
        })
        
    }

    useEffect(() => {
        axios.get(
            `${CategoryAPI.CATEGORY_API}`
        )
        .then(res => {
            setListCategory(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[isAction]);

    const handleDelete = (id) => {
        axios.delete(
            `${CategoryAPI.CATEGORY_API}/${id}`,{
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
        .catch(err => toast.error(err.response.data.message,{
            position: toast.POSITION.TOP_CENTER
          }))
    }

    const dataUpdate = {
        name: nameCategory
    }

    const handleUpdateCate = () => {
        axios.put(
            `${CategoryAPI.CATEGORY_API}/${idCate}`,dataUpdate,{
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

    const handleUpdate = (id) => {
        setIdCate(id)
        axios.get(
            `${CategoryAPI.CATEGORY_API}/${id}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            setNameCategory(res.data.name)
        })
        .catch(err => {
            console.log(err);
        })
    }

    return ( 
        <>  
        <div className="cate-manager-container">
            <h2>CATEGORY MANAGER</h2>
            <div>
            {listCategory.map((category) => {
                return (
                    <div key={category.id} className="cate-item">
                        <div className="cate-title">
                            <strong>Name: </strong>
                            <h3>{category.name}</h3>
                        </div>
                        <div className="cate-acction">
                            <button type="button" className="btn btn-primary edit-cate-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleUpdate(category.id)}>
                                EDIT
                            </button>
                            <DeleteIcon className="delete-cate" onClick={() => handleDelete(category.id)}/>
                        </div>
                    </div>
                )
            })}
            </div>
            <button type="button" className="btn btn-primary addCate-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                ADD CATEGORY
            </button>
        </div>

        {/* popup modal with form edit category */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">EDIT CATEGORY</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <input type="text" placeholder="Enter name update" value={nameCategory} onChange={(e) => setNameCategory(e.target.value)}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateCate}>UPDATE CATEGORY</button>
            </div>
            </div>
        </div>
        </div>
                
                {/* popup modal with add category */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">ADD CATEGORY</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder="Enter name of category" onChange={(e) => setNameCate(e.target.value)}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddCate}>ADD CATEGORY</button>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default CategoryManager;