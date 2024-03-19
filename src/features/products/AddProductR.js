import { useForm } from "react-hook-form";
import { addProducts } from "./productApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../orders/style.css';


import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import { MenuItem, FormControl, Select } from '@mui/material';


const AddProductR = () => {
    let navigate = useNavigate();
    let currentUser = useSelector(st => st.user.currentUser);
    let [show,setShow]=useState(false);

    let { register, handleSubmit, formState: { errors } } = useForm();

    const save = async (product) => {
        let { color, taste, alcoholPercentage, productName, price, createDate, imagePath } = product
        let description = { color, taste, alcoholPercentage }
        alcoholPercentage = parseInt(alcoholPercentage)
        price = parseInt(price)
        let newProd = { productName, price, createDate, imagePath, description };
        if (currentUser.role === "ADMIN") {
            addProducts(newProd, currentUser.token)
                .then(res => {
                    setShow(false)
                    console.log("הצלחתי");
                    console.log(res.data);
                    setTimeout(()=>{navigate("/getProduct")},2000)
                })
                .catch(err => {
                    if (err.response.request.status === 409 && err.response.data.type === 'same product'){
                        setShow(true)
                    }
                    console.log(err);
                    console.log("נכשל");
                })
				
        }
    }
 let backgroundImage="https://pix.co.il/media/wysiwyg/promise/wine-bottle-1.jpg";
    return (		
		<div style={{ 
			backgroundImage: `url(${backgroundImage})`, // שימוש בתמונה כרקע
			backgroundSize: 'cover', // כדי שהתמונה תתאים לגודל של הכלי
			height: '100vh', // גובה מלא של המסך
			padding: '20px', // עיצוב פנים הטופס
			display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
			opacity: 0.7,
			direction:"rtl"
		}}>
        
        <Container maxWidth="sm" >
            <Typography variant="h4" align="center" gutterBottom>
                הוספת מוצר חדש
            </Typography>
            <form onSubmit={handleSubmit(save)} style={{opacity:1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
							style={{ borderColor: '#173831',textAlign:"right" }} // שינוי צבע מסגרת האינפוט
                            {...register("productName", {
                                required: "שם מוצר הוא שדה חובה",
                                minLength: {
                                    value: 6,
                                    message: "שם מוצר חייב להכיל לפחות 6 תווים"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "שם מוצר לא יכול לכלול יותר מ-20 תווים"
                                }
                            })}
							error={Boolean(errors.productName)}
							InputLabelProps={{
								sx: { textAlign: 'right', float: 'right', marginRight: 0 },
								style: { color: '#173831', textAlign: 'right' } // שינוי המיקום לצד ימין
							}}
							inputProps={{ style: { textAlign: 'right' } }}
							color="success"
							placeholder="שם מוצר"
                        />
                        {errors.productName && <Typography color="error">{errors.productName.message}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            {...register("price", {
                                required: "מחיר הוא שדה חובה",
                                min: {
                                    value: 250,
                                    message: "מחיר חייב להיות לפחות 250 ש'ח"
                                },
                                max: {
                                    value: 2500,
                                    message: "מחיר לא יכול להיות גבוה מ-2500 ש'ח"
                                }
                            })}
							error={Boolean(errors.price)}
							color="success"
							placeholder="מחיר"
                        />
                        {errors.price && <Typography color="error">{errors.price.message}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="date"
                            {...register("createDate", {
                                max: {
                                    value: new Date().toISOString().split('T')[0],
                                    message: "התאריך חייב להיות לפני התאריך הנוכחי"
                                }
                            })}
							error={Boolean(errors.createDate)}
							color="success"
							placeholder="תאריך יצור"
                        />
                        {errors.createDate && <Typography color="error">{errors.createDate.message}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            {...register("imagePath", {
                                required: "כתובת תמונה היא שדה חובה",
                                pattern: {
                                    value: /^(https?:\/\/).+/i,
                                    message: "כתובת התמונה אינה תקינה"
                                }
                            })}
							error={Boolean(errors.imagePath)}
							color="success"
							placeholder="ניתוב תמונה"
                        />
                        {errors.imagePath && <Typography color="error">{errors.imagePath.message}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">תיאור המוצר</Typography>
                    </Grid>
                    <FormControl fullWidth style={{width:"97%",marginLeft:"3%"}} placeholder="צבע יין" color="success" >
    <Select
        {...register("color")}
        defaultValue="צבע יין"
		placeholder="צבע יין"
		sx={{ '& .MuiMenuItem-root': { backgroundColor: 'transparent' } }}
	>
		<MenuItem disabled value="">
            <em>צבע יין</em>
        </MenuItem>
        <MenuItem value="אדום" sx={{ backgroundColor: 'transparent', fontSize: '1rem' }}>אדום</MenuItem>
        <MenuItem value="לבן" sx={{ backgroundColor: 'transparent', fontSize: '1rem' }}>לבן</MenuItem>
        <MenuItem value="רוז" sx={{ backgroundColor: 'transparent', fontSize: '1rem' }}>רוז</MenuItem>
    
	</Select>
	
</FormControl>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            {...register("alcoholPercentage", {
                                required: "אחוזי אלכוהול הם שדה חובה",
                                min: {
                                    value: 7,
                                    message: "מינימום 7 אחוזי אלכוהול ליין"
                                },
                                max: {
                                    value: 50,
                                    message: "מקסימום 50 אחוזי אלכוהול ליין"
                                }
                            })}
							error={Boolean(errors.alcoholPercentage)}
							color="success"
							placeholder="אחוזי אלכוהול"
                        />
                        {errors.alcoholPercentage && <Typography color="error">{errors.alcoholPercentage.message}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth error={Boolean(errors.taste)} placeholder="בקצרה עלי" color="success"  {...register("taste")} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth className="button" sx={{color:"#f4cda2",backgroundColor:"#173831",border:"2px solid #173831"}} style={{borderRadius:20}} type="submit">הוסף</Button>
                    </Grid>
                </Grid>
            </form>
            {show&&<h1 style={{fontSize:"x-large",textAlign:"center",color:"#173831"}}>קיים כבר כזה מוצר נא הכנס מוצר אחר</h1>}
        </Container>
		</div>
    );
}

export default AddProductR;