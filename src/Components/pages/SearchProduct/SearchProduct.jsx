import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ProductAPI } from "../../../API/API";
import ListProduct from "../../ListProduct/ListProduct";
import './searchproduct.css';


const SearchProduct = (props) => {
    const {searchKey} = props;
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        axios.get(
            `${ProductAPI.PRODUCT_API}/search?key=${searchKey}`
        )
        .then(res => {
            setListProduct(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [searchKey])

    return ( 
        <div className="search-page-container">
            <h3 className="search-title">Result for "{searchKey}"</h3>
            {((listProduct.length === 0) || (searchKey === '')) ? (
                <>
                    <h2 className="search-notfound">NOT FOUND PRODUCT YOU WANT</h2>
                </>
            ) : (
                <ListProduct listProduct={listProduct}/>
            )}
        </div>
     );
}
 
export default SearchProduct;