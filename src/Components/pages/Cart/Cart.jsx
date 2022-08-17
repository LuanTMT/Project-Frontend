import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import './cart.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartAPI } from "../../../API/API";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = ({isAddCart, setIsAddCart}) => {
    const idUser = localStorage.getItem("idUser");
    const [defaultQuantity, setDefaultQuantity] = useState(1);
    const [listProductInCart, setListProductInCart] = useState([]);
    const [isAction, setIsAction] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    
    const handleDelete = (idProduct) => {
        axios.delete(
            `${CartAPI.CART_API}/${idProduct}`,{
                headers: {
                    "Content-Type": "Application/json",
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            toast.success(res.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
            setIsAction(!isAction);
            setIsAddCart(!isAddCart)
        })
        .catch(err => {
            toast.error(err.response.data.message,{
                position: toast.POSITION.TOP_CENTER
              });
        })
    }
    
    useEffect(() => {
            axios.get(
                `${CartAPI.CART_API}/${idUser}`,{
                    headers: {
                        "Content-Type": "Application/json",
                        "x-access-token": localStorage.getItem('token')
                        }
            })
            .then(res => {
                let results = res.data.items || [];
                results = results.map(item => {
                    item.qty = 1;
                    return item;
                })
                setListProductInCart(results);
                setUserEmail(res.data.email)
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })

    },[isAction]);

    const handleChange = (e) => {
        setDefaultQuantity(e.target.value)
    }

    const handleDown = (productId) => {
        const results = listProductInCart.map((item) => {
            const currentQty = item.qty;

            let updatedItem = {...item};

            if (item.productId === productId) {
                updatedItem.qty = currentQty - 1;
            }
            return updatedItem;
        });
        setListProductInCart(results);
    }

    const handleUp = (productId) => {
        const results = listProductInCart.map((item) => {
            const currentQty = item.qty;
            let updatedItem = {...item};

            if (item.productId === productId) {
                updatedItem.qty = currentQty + 1;
            }
            return updatedItem;
        });
        setListProductInCart(results);
        };

        var arrs = [];
            listProductInCart.map(item => {
                let sum = item.price * item.qty;
                arrs.push(sum)
            })
        let total = arrs.reduce(function(a,b){
            return a + b;
        }, 0)

        var arrItem = [];
        listProductInCart.map(item => {
            let itemQty = item.qty;
            arrItem.push(itemQty)
        })
        let totalItems = arrItem.reduce(function(a,b){
            return a + b;
        }, 0)

        const handleCheckout = () => {
            const checkout = {
                totalItems: totalItems,
                totalBill: total,
                listItem: listProductInCart,
                userEmail: userEmail
            }
            localStorage.setItem('checkout', JSON.stringify(checkout))
            return navigate('/checkout')
        }

        const handleShopping = () => {
            return navigate('/');
        }

    return ( 
        <div className="product-cart-container">
            {(listProductInCart.length === 0) ? (
                <div className="cart-empty">
                    <ShoppingCartIcon className="cart-icon"/>
                    <h3>Cart is empty!</h3>
                    <button onClick={handleShopping}>Shopping Now</button>
                </div>
            ) : (
                <>
                <div className="product-cart">
                {listProductInCart.map((product, idx) => {
                return (
                        <div className="product-cart-info"  key={product.cartId}>
                            <div className="cart-procduct-image">
                                <img src={`http://127.0.0.1:5000/public/images/${product.image}`} alt={product.title} />
                            </div>
                            <div className="product-cart-title">
                                <h3>{product.title}</h3>
                                <p>Size: <span>{product.size}</span></p>
                                <p>Price: <span>$ {product.price}</span></p>
                            </div>
                            <div className="product-cart-quantity">
                                <div className="quantity-change">
                                <button className="product-up-down" 
                                    onClick={() => handleDown(product.productId)} type='button' disabled={product.qty === 1}>
                                        -
                                </button>

                                <input 
                                    type="text" 
                                    maxLength={3} 
                                    value={product.qty}
                                    onChange={() => handleChange(product.id)}
                                />
                                <button className="product-up-down" 
                                    onClick={() => handleUp(product.productId)} type='button'>
                                        +
                                </button>
                                </div>
                            </div>
                            <div className="product-cart-total">
                                <h4>Total</h4>
                                <p>{(product.price * product.qty).toFixed(1)} $</p>
                            </div>
                            <div className="product-cart-delete">
                                <DeleteIcon onClick={() => handleDelete(product.cartId)}/>
                            </div>
                        </div>
                        
                )
              })}
                </div>
                <div className="product-cart-action-container">
                <div className="total-item">
                    <h5>Total Items</h5>
                    <h3>{totalItems}</h3>
                </div>
                <div className="total-bill">
                    <h5>Total Bill</h5>
                    <h3>{total.toFixed(1)} $</h3>
                </div>
                <div className="product-cart-action">
                <button type="button" onClick={handleCheckout}>
                    Check Out
                </button>
                </div>
            </div>
            </>
            )}
        </div>

     );
}
 
export default Cart;
