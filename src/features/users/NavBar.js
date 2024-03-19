import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userOut } from "./useSlice";
import {delBusket} from '../orders/orderSlice';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';


const NavBar = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let currentUser =useSelector(st => st.user.currentUser);
    let busket = useSelector(st => st.order.busket);

    const menuId = 'primary-search-account-menu';

    return (

        <Box sx={{ flexGrow: 1 }} >
            <AppBar  sx={{backgroundColor:"white"}}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        {currentUser&&<p style={{color:"#173831",fontSize:"25px"}}>{currentUser.userName}</p>}
                        {!currentUser&&<p style={{color:"#173831",fontSize:"25px"}}>אורח</p>}
                    </Typography>
                    
                    <img style={{ marginLeft: "41%",height:"45px" }} src={"https://alcohome.co.il/wp-content/uploads/2023/06/cropped-Layer_1-1.png"} />
                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {((currentUser && currentUser.role != "ADMIN") || !currentUser) && (
                        <Tooltip title="סל הקניות">
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={()=>{navigate("/basket")}}>
                            <Badge badgeContent={busket&&busket.length} color="success">
                                <LocalMallOutlinedIcon sx={{ fontSize: 50,color:"#173831" }} />
                            </Badge>
                        </IconButton></Tooltip>)}
                        {currentUser && currentUser.role == "ADMIN" &&
                            (<Tooltip title="כל ההזמנות">
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <ShoppingBagRoundedIcon sx={{ fontSize: 50 ,color:"#173831"}} />
                                </IconButton></Tooltip>)}
                        {currentUser && <Tooltip title="התנתקות">
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={() => { dispatch(userOut());
                                    dispatch(delBusket())
                                 }}
                                color="inherit"
                            >
                                <AccountCircle sx={{ fontSize: 50,color:"#173831" }} />
                            </IconButton>
                        </Tooltip>}
                    </Box>
                    {!currentUser && <><Button sx={{ color: '#004d40' }} onClick={() => { navigate("/signUp") }}>
                        הרשמה
                    </Button>
                        <Button sx={{ color: '#004d40' }} onClick={() => { navigate("/signIn") }}>
                            התחברות
                        </Button></>}
                </Toolbar>
            </AppBar>
    
        </Box>
);
}

export default NavBar;