import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';


import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "./productApi";
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../orders/orderSlice";
import OneSmallItem from '../orders/OneSmalIItem';
import '../orders/style.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = ({ one, setFlag }) => {
  let dispatch = useDispatch();
  let navigate=useNavigate();
  let { currentUser } = useSelector(st => st.user);
  let busket=useSelector(st=>st.order.busket);


  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    dispatch(addItem(one))
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProd=()=>{
    deleteProduct(one._id,currentUser.token)
    .then(res=>{
      setFlag(true);
      setOpenDelete(false);
      console.log("kkkkk");
    })
  .catch(err=>{
    console.log(err);
  })}

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
    <Card  style={{ width:"80%" ,marginLeft:"10%",marginTop:"5%"}} sx={{
      minWidth: 275,      width: {
        xs: 100, // theme.breakpoints.up('xs')
        sm: 200, // theme.breakpoints.up('sm')
        md: 300, // theme.breakpoints.up('md')
        lg: 400, // theme.breakpoints.up('lg')
        xl: 500, // theme.breakpoints.up('xl')
      }
    }} >
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <Link to={`details`} state={one}>
            <img src={one.imagePath} style={{  marginLeft:'40%'}} />
          </Link>
        </Typography>
        <Typography variant="h5" component="div" style={{textAlign:"center"}}>
          {one.productName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{textAlign:"center"}}>
          ₪{one.price}
        </Typography>
      </CardContent>
      <CardActions >
        {currentUser&&currentUser.role=="ADMIN"?(<><Button className='button' sx={{color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20,marginLeft:"20%",fontSize:"16px"}} elevetion={0} size='small' onClick={handleClickOpenDelete}>מחק מוצר <DeleteIcon className='icon'/></Button>
        <Button className='button' sx={{color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20,marginLeft:"10%"}} onClick={()=>{navigate(`/updateProduct/${one._id}`, {state:one})}}>ערוך מוצר <EditIcon className='icon'/></Button></>):
        (<Button className='button' sx={{color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20,marginLeft:"10%"}} elevetion={0} size="small"  onClick={handleClickOpen('paper')}
           
           >הוספה לסל <ShoppingCartSharpIcon className='icon'/></Button>)}
        

      </CardActions>
    </Card>
    <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{textAlign:"center"}}>{"? האם אתה בטוח שתרצה למחוק את המוצר"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                      </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='button' sx={{ml:92,color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20,marginRight:"2%" }} onClick={()=>{deleteProd()}}>מחק✓</Button>
          <Button className='button' sx={{ml:92,color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20,marginRight:"31%"}} onClick={handleCloseDelete}>בטל✕</Button>
        </DialogActions>
      </Dialog>
    <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        
      >
        <DialogTitle id="scroll-dialog-title" style={{textAlign:"center",color:"rgb(33 77 68)"}}>סל הקניות שלך מכיל</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {busket&&busket.map(item=><OneSmallItem key={item._id} prod={item}/>)}
              
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='button' sx={{ml:92,color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20,marginRight:"2%" ,minWidth:100}} onClick={handleClose}>המשך לקנות</Button>
          <Button className='button' sx={{ml:92,color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20,marginRight:"31%",minWidth:100}} onClick={()=>{navigate("/basket")}} >סיום הזמנה</Button>
        </DialogActions>
      </Dialog>
    </> 

   
  );
}

export default Item;