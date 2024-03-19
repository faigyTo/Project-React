import * as React from 'react';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { addItem ,decItem} from "../orders/orderSlice";
import { useEffect } from 'react';
import { useState } from 'react';
import '../orders/style.css';
import OneSmallItem from '../orders/OneSmalIItem';

const ProductDetails = () => {
    let dispatch = useDispatch()
    let one = useLocation().state;
    let { busket } = useSelector(st => st.order);
    let [temp, setTemp] = useState(0);
    let navigate=useNavigate();

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
 
    useEffect(() => {
        for (let i = 0; i < busket.length; i++) {
            if (busket[i].product.productName == one.productName)
                setTemp(busket[i].count)
        }
    }, [busket])

    const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


    return (<div style={{ position: 'fixed', top: 0, width: "100vw", height: "100vh", backgroundColor: "white", fontFamily: "fantasy",marginTop:"100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: " 2fr 1fr " }}>
            <div style={{ marginLeft: '50%', marginTop: '10%' }}>
                    <CardContent style={{textAlign:'right'}}>
                        <Typography style={{ fontWeight: "bolder" }} sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
                            {one.productName}
                        </Typography>
                      
                        <br />
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{ fontSize:"18px",fontWeight: "bolder" }}>
                            {one.description.taste}
                        </Typography>
                        <Typography variant="h5" component="div" style={{ fontWeight: "bolder",fontSize:"50px" }}>
                            ₪{one.price}

                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{ fontSize:"20px",fontWeight: "bolder", color: (one.description.color == "רוז" ? "#ff8a65" : one.description.color == "אדום" ? "red" : "#e6ee9c") }}>

                            צבע:  {one.description.color}
                        </Typography>

                        <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{ fontSize:"20px",fontWeight: "bolder" }}>

                            אלכוהול:  {one.description.alcoholPercentage}%
                        </Typography>
                        <Typography variant="body2">

                            <Stack spacing={0} direction="row" style={{marginLeft:'160px'}}>
                                <Button variant="outlined" color='success' style={{height:"45.5px",width:"1px",marginTop:"4.5px", padding: '20x 20px',borderRadius:200 }} onClick={handleClickOpen('paper')}
                                    
                                >+</Button>
                                <div style={{ borderRadius:200,width: "30px",height:'30px', border: '2px solid rgba(46, 125, 50, 0.5)',lineHeight:"30px",textAlign:'center',padding:'6px',margin:5}} >{temp}</div>
                                <Button variant="outlined" color='success' style={{height:"45.5px",width:"1px",marginTop:"4.5px",borderRadius:200}}  disabled={temp<=1} onClick={() => {
                                    dispatch(decItem(one))
                                }}>-</Button>
                            </Stack>
                            <br />
                            <div>
                            <Button className='button' sx={{color:"#f4cda2",backgroundColor:"#173831"}} style={{marginRight:"7%",borderRadius:20}} onClick={()=>{
                                navigate("/basket")
                            }}>   לסל הקניות  <LocalMallRoundedIcon style={{fontSize:"31px"}}/></Button>
                         
                         <Button className='button' sx={{color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{marginRight:"18%",borderRadius:20}} onClick={()=>{
                                navigate("/getProduct")
                            }}>המשך לקנות<ShoppingCartSharpIcon style={{fontSize:"30px"}}/></Button>
                        </div>
                        </Typography>
                    </CardContent>
            </div>
            <>
                <img src={one.imagePath} style={{ width: '100px', marginTop: '30%' ,marginLeft:'150px'}} />
            </>
        </div>
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

        
    </div>);
}

export default ProductDetails;