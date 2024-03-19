import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
    let currentUser=useSelector(st=>st.user.currentUser);
    let navigate=useNavigate();

    useEffect(()=>{
        setTimeout(()=>{navigate("/getProduct")},5000)},[]);
    
    return (<div style={{marginTop:"200px"}}>
        <h1 style={{textAlign:"center"}}>הזמנתך התקבלה בהצלחה {currentUser&&currentUser.userName} שלום</h1>        
    </div>);
}

export default OrderDetails;