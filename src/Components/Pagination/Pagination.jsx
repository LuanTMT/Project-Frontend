
import Axios from 'axios';
import { useState } from 'react';
import { ProductAPI } from '../../API/API';
import './pagination.css';

const Pagination = (props) => {

    const { setListProduct, count, limit } = props;
    const [indexActive,setIndexActive] = useState(1);
    
    if((count % limit) !== 0){

        var countPage = Math.floor(count/limit) + 1
    }
    else {
        var countPage = Math.floor(count/limit)

    }
    let data = [];

    for(let i = 1 ; i <= countPage ; i++){
        data.push(i)
    }

    const pagination1 = ({e}) => {
        setIndexActive(e);
        let offSet = e * limit - limit;

        Axios.get(`${ProductAPI.PRODUCT_API}?offset=${offSet}&limit=${limit}`,{
            headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token')
            }
        })
        .then(res => {
            const data = res.data.rows;
            setListProduct(data);
        })
        .catch(err => {
            console.log(err);
        })

    }
    const nextPage = () => {
        if(indexActive === countPage){
            return
        }else {
            let offSet = (indexActive + 1) * limit - limit;
            setIndexActive(indexActive + 1)
            Axios.get(`${ProductAPI.PRODUCT_API}?offset=${offSet}&limit=${limit}`,{
                headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token')
                }
            })
            .then(res => {
                const data = res.data.rows;
                setListProduct(data);
            })
            .catch(err => {
                console.log(err);
            })

        }
    }

    const prevPage = () => {
        if(indexActive === 1) {
            return;
        }else {
            let offSet = (indexActive - 1) * limit - limit;
            setIndexActive(indexActive - 1);
            Axios.get(`${ProductAPI.PRODUCT_API}?offset=${offSet}&limit=${limit}`,{
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('token')
                }
            })
            .then(res => {
                const data = res.data.rows;
                setListProduct(data);
            })
            .catch(err => {
                console.log(err);
            })
            }

    }
    return ( 
        <div className="pagination-container">
            <ul className="pagin-list">
                <li onClick={() => prevPage()}>PREVIOUS</li>
                {
                    data.map((e,index) => {
                        return (<li key={index} data-index={e} onClick={() => pagination1({e})}>{e}</li>)
                    })
                }

                <li onClick={() => nextPage()}>NEXT</li>
            </ul>
        </div>
    );
}

export default Pagination;