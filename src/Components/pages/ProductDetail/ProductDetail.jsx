
import { useState } from "react";
import './productDetail.css';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { CartAPI, ImageAPI, ProductAPI } from "../../../API/API";

const ProductDetail = ({setIsAddCart, isAddCart}) => {
    const params = useParams();
    const idUser = localStorage.getItem('idUser');
    const username = localStorage.getItem('username');
    const [productDetail, setProductDetail] = useState({});
    const navigate = useNavigate();
    const [image, setImage] = useState('');

    useEffect(() => {
        axios.get(
            `${ProductAPI.PRODUCT_API}/detail/${params.id}`
        )
        .then(res => {
            setProductDetail(res.data);
            setImage(res.data.image)
        })
        .catch(err => {
            console.log(err);
        })

    },[])

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
            console.log(err);
        })
    }

    const handleBuy = (id) => {
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
        <h2 className="product-detail-title">PRODUCT DETAIL</h2>
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img src={(image === '') ? (``) : (`${ImageAPI.IMAGE_API}/${image}`)} alt="product-detail" />
            </div>
            <div className="product-detail-info">
                <div className="product-title">
                    <h3>{productDetail.title}</h3>
                </div>
                <div className="product-price">
                    <p>Price: </p>
                    <h3><strong>$ {productDetail.price}</strong></h3>
                </div>
                <div className="product-size">
                    <p>Size: </p>
                    <h3>{productDetail.size}</h3>
                </div>
                <div className="product-description">
                    <p>Description: </p>
                    <h3>{productDetail.description}</h3>
                </div>
                <div className="product-quantity">
                </div>
                <div className="product-action">
                    <button className="checkout-btn" onClick={() => handleBuy(productDetail.id)}>Buy Now</button>
                    <button className="add-to-cart-btn" onClick={() => handleAddCart(productDetail.id)}>Add To Cart</button>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ProductDetail;