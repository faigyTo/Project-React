import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Nav = () => {

  const pagesAdmin = ['עדכון מוצר', '', 'הוספת מוצר', '', 'המוצרים שלנו'];
  const pagesUser = ['ההזמנות שלי', '', 'המוצרים שלנו'];
  const pagesGuest = ['המוצרים שלנו']
  let currentUser = useSelector(st => st.user.currentUser);
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);


  return (
    <AppBar elevation={0} sx={{ backgroundColor: "#173831" }}
      style={{ marginTop: 74 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {currentUser && currentUser.role == "ADMIN" &&
            <div style={{ marginLeft: "35%" }}>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton >
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pagesAdmin.map((page) => (
                    <MenuItem key={page} onClick={() => {
                      if (page == "המוצרים שלנו") {
                        navigate('/getProduct')
                      }
                    }}>
                      <Typography textAlign="center" color="primary">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pagesAdmin.map((page) => (
                  <Button
                    key={page}
                    onClick={() => {
                      if (page == "המוצרים שלנו") {
                        navigate("/getProduct");
                      } else if (page == "הוספת מוצר") {
                        navigate("/addProduct")
                      }
                    }}
                    sx={{ my: 2, color: '#f4cda2', display: 'block', fontSize: "20px" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box></div>}
          {currentUser && currentUser.role == "USER" &&
            <div style={{ marginLeft: "40%" }}>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pagesUser.map((page) => (
                    <MenuItem key={page} >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pagesUser.map((page) => (
                  <Button
                    key={page}
                    onClick={() => {
                      if (page == "המוצרים שלנו") {
                        navigate("/getProduct")
                      }
                    }}
                    sx={{ my: 2, color: '#f4cda2', display: 'block', fontSize: "18px" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box></div>}
          {!currentUser &&
            <div style={{ marginLeft: "46.5%" }}>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton><Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pagesGuest.map((page) => (
                    <MenuItem key={page} onClick={() => navigate('/getProduct')}>
                      <Typography textAlign="center" color="#004d40">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pagesGuest.map((page) => (
                  <Button
                    key={page}
                    onClick={() => { navigate("/getProduct") }}
                    sx={{ my: 2, color: 'white', display: 'block', color: "#f4cda2", fontSize: "18px" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box></div>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;