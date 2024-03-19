import { Route, Routes } from 'react-router-dom';
import './App.css';
import ListItem from './features/products/ListItem';
import ProductDetails from './features/products/ProductDetails';
import Basket from './features/orders/Basket';
import UpdateProduct from './features/products/UpdateProduct';
import LoginForm from './features/users/LoginForm';
import RegistrationForm from './features/users/RegistrationForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userIn } from './features/users/useSlice';
import NavBar from './features/users/NavBar';
import Nav from './features/users/Nav';
import { pushToReduce } from './features/orders/orderSlice';
import OrderDetails from './features/orders/OrderDetails';
import Admin from './middleWare/Admin';
import AddProductR from './features/products/AddProductR';
import HomePage from './HomePage';
import ListSearch from './features/products/ListSearch';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import * as React from 'react';


function App() {


  let dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
    let busketStr = localStorage.getItem("busket");
    let str = localStorage.getItem("currentUser");
    if (str) {
      dispatch(userIn(JSON.parse(str)));
    }
    if (busketStr) {
      dispatch(pushToReduce(JSON.parse(busketStr)));
    }
    setTimeout(() => { handleClickOpen() }, 7000)
  }, [])


  return (<>
    <div style={{ position: "absolute" }}>
      <NavBar />
      <Nav />
    </div>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='getProduct' element={<ListItem />}>
        <Route path='details' element={<ProductDetails />} />
      </Route>
      <Route path='/byCategury' element={<ListSearch />}>
        <Route path='details' element={<ProductDetails />} />
      </Route>
      <Route path='basket' element={<Basket />} />
      <Route path='signUp' element={<RegistrationForm />} />
      <Route path='signIn' element={<LoginForm />} />
      <Route path='/addProduct' element={<Admin><AddProductR /></Admin>} />
      <Route path='/orderDetails' element={<OrderDetails />} />
      <Route path="/updateProduct/:id" element={<Admin><UpdateProduct /></Admin>} />
    </Routes>
    {open&&<Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      style={{textAlign:"center"}}

    >
      <DialogTitle style={{ textAlign: "center",backgroundColor:"#f4cda2" }}>{"אני מצהיר/ה כי מלאו לי 18"}</DialogTitle>
      <DialogActions style={{ textAlign: "center",backgroundColor:"#f4cda2" }}>
        <Button className='button' sx={{ ml: 100, color: "#f4cda2", backgroundColor: "#173831", border: "2px solid #173831", minWidth: 130 }} style={{ borderRadius: 20, marginRight: "38.5%" }} onClick={handleClose}>כן מלאו לי 18</Button>
      </DialogActions>
      <DialogContent style={{backgroundColor:"#f4cda2"}}>
        <DialogContentText id="alert-dialog-slide-description" style={{ color: "#173831", fontSize: "x-large" }}>
          הכניסה לאתר זה מיועדת למי שמלאו לו 18
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description" style={{ fontWeight: "bolder", color: "#173831" }}>
          אזהרה:צריכה מופרזת של אלכוהול מסכנת חיים ומזיקה לבריאות
        </DialogContentText>
      </DialogContent>
    </Dialog>}
  </>
  );
}

export default App;
