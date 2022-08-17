import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './productCart.css';
import axios from "axios";
import { toast } from "react-toastify";
import { CartAPI, ImageAPI } from "../../API/API";

const ProductCart = (props) => {
    const {id, title, price, size, image, setIsAddCart, isAddCart } = props;
    const idUser = localStorage.getItem('idUser');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleAddCart = (id) => {
        if(!username) {
            return navigate('/login')
        }
        const data = {
            idProduct: id
        }
        axios.post(
            `${CartAPI.CART_API}/${idUser}`,data,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                    }
        })
        .then(res => {
            toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            setIsAddCart(!isAddCart)
        })
        .catch(err => {
            toast.error(err.response.data.message);
        })
    }

    const handleBuyProduct = (id) => {
        if(!username) {
            return navigate('/login')
        }
        const data = {
            idProduct: id
        }
        axios.post(
            `${CartAPI.CART_API}/${idUser}`,data,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                    }
        })
        .then(res => {
            setIsAddCart(!isAddCart)
            return navigate('/cart')
        })
        .catch(err => {
            toast.error(err.response.data.message);
        })
    }

    return ( 
        <>
            <section className="dog-cart-container">
                <div className="dog-img">
                    <Link to={`/product-detail/${id}`}>
                        <img src={`${ImageAPI.IMAGE_API}/${image}`} alt={title}/>
                    </Link>
                </div>
                <div className="dog-info">
                    <Link to={`/product-detail/${id}`} className="dog-title">{title}</Link>
                </div>
                <div className="dog-price-breed">
                    <Link to={`/product-detail/${id}`} className="dog-price">Price: <strong>$ {price}</strong></Link>
                    <Link to={`/product-detail/${id}`} className="dog-breed">Size: <strong>{size}</strong></Link>
                </div>
                <div className="add-buy">
                    <AddShoppingCartIcon className="add-cart" onClick={() => handleAddCart(id)}/>
                    <button className="buy-now" onClick={() => handleBuyProduct(id)}>BUY NOW</button>
                </div>
            </section>
        </>
     );
}
 
export default ProductCart;