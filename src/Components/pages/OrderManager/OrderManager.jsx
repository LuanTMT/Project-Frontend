import axios from "axios";
import { useEffect, useState } from "react";
import { OrderAPI, OrderDetailAPI, PaymentAPI } from "../../../API/API";
import './orderManager.css';

const OrderManager = () => {
    const [listOrder, setListOrder] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [payment, setPayment] = useState([]);
    const [searchDate, setSearchDate] = useState('all');

    useEffect(() => {
        axios.get(
            `${OrderAPI.ORDER_API}?date=${searchDate}`,{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
        })
        .then(res => {
            setListOrder(res.data);
        })
        .catch(err => {
            console.log(err.response.data.message);
        })
    }, [searchDate]);

    const handleDetail = (id) => {
        axios.get(
            `${OrderDetailAPI.ORDERDETAIL_API}/${id}`,{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            setOrderDetail(res.data)
        })
        .catch(err => {
            console.log(err);
        });

        axios.get(
            `${PaymentAPI.PAYMENT_API}/${id}`,{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            setPayment(res.data);
        })
        .catch(err => {
            console.log(err);
        })

    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }
      


    return ( 
        <div className="order-manager-container">
            <select name="order" className="search-by-date" onChange={(e) => setSearchDate(e.target.value)}>    
                <option value="all">All</option>
                <option value="1">Day ago</option>
                <option value="7">Week ago</option>
                <option value="30">Month ago</option>
            </select>
            <ul className="list-order">
                <li className="order-id">ID Order</li>
                <li className="order-username">Username Customer</li>
                <li className="order-email">Email</li>
                <li className="order-time">Time Order</li>
                <li className="order-action">Detail</li>
            </ul>
            {listOrder.map((order, index) => {
                    return (
                        <ul className="list-order" key={index}>
                            <li className="order-id">{order.orderId}</li>
                            <li className="order-username">{order.username}</li>
                            <li className="order-email">{order.email}</li>
                            <li className="order-time">{formatDate(order.createdAt)}</li>
                            <li className="order-action">
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                data-bs-toggle="modal" 
                                data-bs-target="#exampleModal"
                                onClick={() => handleDetail(order.orderId)}
                            >
                                Detail
                            </button>
                            </li>
                        </ul>
                    )
                })}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Order Detail</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {orderDetail.map((item, index) => {
                            return (
                                <div className="detail-container" key={index}>
                                    <div className="detail-image">
                                        <img src={`http://127.0.0.1:5000/public/images/${item.image}`} alt="product" />
                                    </div>
                                    <div className="detail-title">
                                        <h6>Title</h6>
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="detail-price">
                                        <h6>Price</h6>
                                        <p>{item.price} $</p>
                                    </div>
                                    <div className="detail-size">
                                        <h6>Size</h6>
                                        <p>{item.size}</p>
                                    </div>
                                    <div className="detail-quantity">
                                        <h6>Quantity</h6>
                                        <p>{item.quantityProduct}</p>
                                    </div>
                                    <div className="detail-quantity">
                                        <h6>Method</h6>
                                        <p>{payment.method}</p>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="detail-total">
                            <h3>Total: $ {payment.total}</h3>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
     );
}
 
export default OrderManager;