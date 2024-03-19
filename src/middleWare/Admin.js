import { useSelector } from "react-redux";


const Admin = ({children}) => {
	let currentUser=useSelector(st=>st.user.currentUser);
	return (<div style={{marginTop:"150px"}}>
	{currentUser&&currentUser.role=="ADMIN"?(<div>{children}</div>):
	<h1 style={{direction:"rtl",textAlign:"center"}}>😥אין לך הרשאת כניסה לדף זה</h1>}
	
	</div>);
}
 
export default Admin;