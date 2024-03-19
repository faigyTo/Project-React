import { useForm } from "react-hook-form";
import { addUser } from "./userApi";
import { useDispatch } from "react-redux";
import { userIn } from "./useSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


const RegistrationForm = () => {


    let [show, setShow] = useState(false);
    let dispatch = useDispatch();
    let navigate=useNavigate();
    let { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const signUp = (user) => {

        addUser(user).then(res => {
            setShow(false);
            dispatch(userIn(res.data))
            setTimeout(()=>{navigate("/getProduct")},2000);
        }).catch(err => {
            if (err.response.request.status === 409 && err.response.data.type === 'same user') {
                setShow(true);
            }
            console.log(err.response.data);
        })
    }

    let backgroundImage = "https://pix.co.il/media/wysiwyg/promise/wine-bottle-1.jpg"
    return (<div style={{
        backgroundImage: `url(${backgroundImage})`, // שימוש בתמונה כרקע
        backgroundSize: 'cover', // כדי שהתמונה תתאים לגודל של הכלי
        height: '100vh', // גובה מלא של המסך
        padding: '20px', // עיצוב פנים הטופס
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7,
      }}>
        <form onSubmit={handleSubmit(signUp)} style={{ marginTop: "285px" }}>
        <TextField sx={{ ml: 83 }} style={{ textAlign: "right", color: "red" }} id="outlined-basic" label="שם" variant="outlined"  {...register("userName", {
                required: { value: true, message: "שם משתמש הוא שדה חובה" }, minLength: { value: 3, message: "שם חייב ליהיות לפחות 3 תווים" },
                maxLength: { value: 10, message: "שם חייב ליהיות לכל היותר עם 10 תווים" }
            })} 
                helperText={errors.userName ? (<span style={{ textAlign: "center", direction: "rtl", color: "red" }}>{errors.userName.message}</span>) : ""}
                color="success"
            />
            <div style={{ height: "25px" }}></div>
            <TextField sx={{ ml: 83 }} style={{ textAlign: "right", color: "red" }} id="outlined-basic" label="מייל" variant="outlined"  {...register("userEmail", {
                required: { value: true, message: "מייל משתמש הוא שדה חובה" },
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'כתובת מייל לא תקינה'
                }
            })}
                helperText={errors.userEmail ? (<span style={{ textAlign: "center", direction: "rtl", color: "red" }}>{errors.userEmail.message}</span>) : ""}
                color="success"
            />
            <div style={{ height: "25px" }}></div>
            <FormControl sx={{ ml: 83, width: '25ch', color: "#173831", width: "223px" }} variant="outlined">
                <InputLabel style={{ direction: "rtl", color: "#173831" }} htmlFor="outlined-adornment-password">סיסמא</InputLabel>
                <OutlinedInput
                    color="success"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    {...register("userPassword", {
                        required: { value: true, message: "סיסמא היא שדה חובה" },
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
                <FormHelperText style={{ textAlign: "center", color: "red" }} id="component-error-text">{errors.userPassword ? (errors.userPassword.message) : ""}</FormHelperText>
            </FormControl>
            <div style={{height:"25px"}}></div>
            <Button className="button" type="submit" sx={{ml:92,color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20,width:"233px",marginLeft:"44.5%"}}  color="success">הרשמה</Button>
        </form>
        {show && <h2>קיים כבר משתמש עם נתונים זהים</h2>}
    </div>
    );
}

export default RegistrationForm;