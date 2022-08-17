import SearchIcon from '@mui/icons-material/Search';
import './productManager.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import ListProductManager from '../../ListProductManager/ListProductManager';
import { CategoryAPI, ProductAPI } from '../../../API/API';
const Product = (props) => {
    const { setIdProduct } = props;

    const [categories, setCategories] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [idCategory, setIdCategory ] = useState(0);
    const [searchKey, setSearchKey] = useState('');
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(1);
    const [isAction, setIsAction] = useState(false);

    useEffect(() => {
        async function getCategory() {
            const res = await Axios.get(
                `${CategoryAPI.CATEGORY_API}`,{
                    headers: {
                        "x-access-token": localStorage.getItem('token')
                        }
                }
            );
            return res;
        }
        getCategory().then(res => {
            setCategories(res.data)
        })
        getCategory().catch(err => console.log(err));

        if (idCategory === 0 && searchKey === '') {
            Axios.get(
                `${ProductAPI.PRODUCT_API}?offset=0&limit=8`,{
                    headers: {
                        "x-access-token": localStorage.getItem('token')
                        }
                }
            )
            .then((res) => {
                setListProduct(res.data.rows);
                setCount(res.data.count);
                setLimit(res.data.limit);
            })
            .catch(err => console.log(err));
        }else if (searchKey !== ''){
            Axios.get(
                `${ProductAPI.PRODUCT_API}/search?key=${searchKey}`
            )
            .then(res => {
                setListProduct(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }else if (idCategory !== 0){
            Axios.get(
                `${ProductAPI.PRODUCT_API}/category/${idCategory}`
            )
            .then(res => {
                setListProduct(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }

    }, [idCategory,searchKey,isAction])

    const getIdCategory = (id) => {
        setIdCategory(id);
    }

    return ( 
        <div className="product-container">
            <div className="product-sidebar">
                <div className="search-product">
                    <input 
                        type='text' 
                        placeholder="Search product..." 
                        onChange={(e) => setSearchKey(e.target.value)}    
                    />
                    <SearchIcon className='search-icon'/>
                </div>
                <div className='product-by-category'>
                    <h3 className='cate-product'>CATEGORY</h3>
                    <ul className='list-category'>
                        {categories.map((category) => {
                            return (
                                <div key={category.id} className="category-item">
                                    <li onClick={() => getIdCategory(category.id)}>{category.name}</li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className='list-product'>
                <ListProductManager 
                    categories={categories} 
                    listProduct={listProduct} 
                    count={count} limit={limit} 
                    setListProduct={setListProduct} 
                    idCategory={idCategory}
                    setIdProduct={setIdProduct}
                    isAction={isAction}
                    setIsAction={setIsAction}
                />
            </div>
        </div>
     )
}
 
export default Product;