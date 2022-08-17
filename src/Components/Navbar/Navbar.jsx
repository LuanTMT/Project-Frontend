
import { useNavigate } from 'react-router-dom';
import './navbar.css'
const NavbarCustomer = (props) => {
    const { listCategory, setIdCategory } = props;

    const navigate = useNavigate();

    const handleClick = (id) => {
        setIdCategory(id);
        navigate(`/category/product`)
    }

    return ( 
        <ul className='list-category-customer'>
            {listCategory.map((category, index) => {
                
                return (
                    <li onClick={() => handleClick(category.id)} key={index} className="list-category">{category.name}</li>
                )
            })}
        </ul>
     );
}
 
export default NavbarCustomer;