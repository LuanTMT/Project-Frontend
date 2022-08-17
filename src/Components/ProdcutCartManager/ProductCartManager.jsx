import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './productCart.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ImageAPI, ProductAPI } from '../../API/API';

const ProductCart = (props) => {
    const { id, title, price, image, size, setAppendFormUpdate, setIdProduct, isAction, setIsAction } = props;

    const deleteProduct = () => {
        axios.delete(
            `${ProductAPI.PRODUCT_API}/${id}`,{
                    headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then((res) => {
            toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            setIsAction(!isAction)
        })
        .catch(err => toast.error(err.response.data.message,{
            position: toast.POSITION.TOP_CENTER
          }))
    };

    const updateProduct = (idProduct) => {
        setAppendFormUpdate(true);
        setIdProduct(idProduct)
    }

    return ( 
        <>
            <div className="product-cart-manager">
                <div className="product-image">
                    <img src={`${ImageAPI.IMAGE_API}/${image}`} alt={image} />
                </div>
                <div className="product-title">
                    <span>Title : <strong>{title}</strong></span>
                </div>
                <div className="product-price">
                    <p>Price : $ <strong>{price}</strong></p>
                </div>
                <div className="product-size">
                    <p>Size : <strong>{size}</strong></p>
                </div>
                <div className='handle-btn'>
                    <EditIcon className='edit-btn' onClick={() => updateProduct(id)}/>
                    <DeleteIcon className='delete-btn' onClick={deleteProduct}/>
                </div>
            </div>
        </>
     );
}
 
export default ProductCart;