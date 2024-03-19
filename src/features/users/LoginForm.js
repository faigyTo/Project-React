import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "./userApi";
import { userIn } from "./useSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../orders/style.css';

import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';


const LoginForm = () => {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  let backgroundImage = "https://pix.co.il/media/wysiwyg/promise/wine-bottle-1.jpg"

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const userLogin = async (user) => {

    login(user).then(res => {
      dispatch(userIn(res.data));
      setTimeout(() => {
        navigate("/getProduct")
      }, 2000)
    }).catch(err => {
      if (err.response.request.status === 404 && err.response.data.type === 'no such user') {
        setShow(true);
        setTimeout(() => { navigate("/signUp") }, 5000);
      }
      console.log(err.response);
    })
  }

    return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`, // שימוש בתמונה כרקע
      backgroundSize: 'cover', // כדי שהתמונה תתאים לגודל של הכלי
      height: '100vh', // גובה מלא של המסך
      padding: '20px', // עיצוב פנים הטופס
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.7,
    }}>
      <form onSubmit={handleSubmit(userLogin)} style={{ marginTop: "310px", alignItems: "center" }}>
        <TextField sx={{ ml: 83 }} style={{ textAlign: "right", color: "red" }} id="outlined-basic" label="מייל" variant="outlined"  {...register("userEmail", {
          required: { value: true, message: "חובה להכניס מייל משתמש" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'כתובת מייל לא תקינה'
          }
        })}
          helperText={errors.userEmail ? (<span style={{ textAlign: "center", direction: "rtl", color: "red" }}>{errors.userEmail.message}</span>) : ""}
          color="success"
        />
        <div style={{ height: "40px" }}></div>
        <FormControl sx={{ ml: 83, width: '25ch', color: "#173831", width: "223px" }} variant="outlined">
          <InputLabel style={{ direction: "rtl", color: "#173831" }} htmlFor="outlined-adornment-password">סיסמא</InputLabel>
          <OutlinedInput
            color="success"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            {...register("userPassword", {
              required: { value: true, message: "חייבים להכניס סיסמא" },
              pattern: { value: /^[a-zA-Z0-9]{4,8}$/, message: "סיסמא חייבת ליהיות בין 4 ל8 תווים" }
            })}
            endAdornment={
              <InputAdornment position="end" style={{ color: "#173831" }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  style={{ color: "#173831" }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}


                </IconButton>
              </InputAdornment>

            }
            style={{ color: "#173831" }}
            label="Password"
          />
          <FormHelperText style={{ textAlign: "right", color: "red" }} id="component-error-text">{errors.userPassword ? (errors.userPassword.message) : ""}</FormHelperText>
        </FormControl>
        <div style={{ height: "20px" }}></div>
        <Button type="submit" className="button" sx={{ ml: 92, color: "#f4cda2", backgroundColor: "#173831", border: "2px solid #173831" }} style={{ borderRadius: 20, width: "233px", marginLeft: "44.5%" }} color="success">התחברות</Button>        {show && <h1 style={{ textAlign: "center" }}>!אין משתמש עם כזה מייל וסיסמא בבקשה תירשם לאתר</h1>}
      </form></div>);
}

export default LoginForm;