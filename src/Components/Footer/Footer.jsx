import Logo from '../../images/logo1.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return ( 
        <div className="footer-container">
            <div className="footer-left ">
                <div className='footer-title'>
                    <Link to="/" className='footer-img'><img src={Logo} alt={Logo} /></Link>
                </div>
            </div>
            <div >            
                <h3 className='footer-title'>Introduct</h3>                    
                <ul className='footer-list'>
                    <a href="/"><li>Contact</li></a>
                    <a href="/"><li>News</li></a>
                    <li>Email: themenshop@gmail.com</li>
                    <li>Phone: 0855307101</li>
                </ul>
            </div>
            <div className="footer-middle">
                <h3 className='footer-title'>Customet Support</h3>
                <ul className='footer-list'>
                    <a href="/"><li>Ordering Guide</li></a>
                    <a href="/"><li>Payment - Delivery</li></a>
                    <a href="/"><li>Privacy Policy</li></a>
                </ul>
            </div>
            <div className="footer-right">
                <h3 className='footer-title'>Contact With Us</h3>
                <ul className='footer-contact footer-list'>
                    <a href="/"><li><FacebookIcon /></li></a>
                    <a href="/"><li><TwitterIcon /></li></a>
                    <a href="/"><li><YouTubeIcon /></li></a>
                </ul>
            </div>
        </div>
     );
}
 
export default Footer;