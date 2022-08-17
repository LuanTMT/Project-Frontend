
const Input = ({type, placeholder, onChange}) => {
    return ( 
        <input type={type} onChange={onChange} placeholder={placeholder} />
     );
}
 
export default Input;