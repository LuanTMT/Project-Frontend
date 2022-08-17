import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { ProductAPI } from "../../API/API";

const FormAddProduct = (props) => {

    const { categories,setAppenForm, isAction, setIsAction } = props;

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('S');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('size', size);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('categoryId', category);

        axios.post(`${ProductAPI.PRODUCT_API}`,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": localStorage.getItem('token')
            }
        })
        .then(res => {
            toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            setAppenForm(false);
            setIsAction(!isAction);
        })
        .catch(err => {
            toast.error(err.response.data.message,{
                position: toast.POSITION.TOP_CENTER
              })
        })
    }

    return ( 
                <form onSubmit={handleSubmit} className="form-add-product">
                    <h3>ADD PRODUCT</h3>
                    <div className="form-group">
                        <label className="label">Title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="label">Price</label>
                        <input type="text" onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                    <label className="label">Size</label>
                    <select name="breed" onChange={(e) => setSize(e.target.value)} required>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                    <div className="form-group">
                        <label className="label">Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} required/>
                    </div>
                    <div className="form-group">
                        <label className="label">Description</label>
                        <input type="text" onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="label">Category</label>
                        <select name="category" onChange={(e) => setCategory(e.target.value)} required>
                            {categories.map((category, index) => {
                                return (
                                    <option key={index} value={category.id}>{category.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button type="submit" className="add-btn">Add Product</button>
                </form>
     );
}
 
export default FormAddProduct;