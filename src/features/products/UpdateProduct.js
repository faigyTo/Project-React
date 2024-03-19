import { useForm } from "react-hook-form";
import { updateProduct } from "./productApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import { Button, TextField, Typography, Container } from "@mui/material";




const UpdateProduct = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let prodToUpdate = useLocation().state;
    let currentUser = useSelector(st => st.user.currentUser);
    let navigate=useNavigate()


    const save = async (product) => {
        let { productName, price, createDate, imagePath } = product;
        price = parseInt(price);
        let newProd = { productName, price, createDate, imagePath };
        updateProduct(newProd, prodToUpdate._id, currentUser.token)
            .then(res => {
                console.log("הצלחתי");
                console.log(res.data);
                setTimeout(()=>{navigate("/getProduct")},2000);
            })
            .catch(err => {
                console.log(err);
                console.log("נכשל");
            });
        console.log(product);
    };
    let backgroundImage = "https://pix.co.il/media/wysiwyg/promise/wine-bottle-1.jpg"
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
            direction: "rtl"
        }}>
            <Container maxWidth="sm" style={{ marginTop: "200px", direction: "rtl" }}>
                <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
                    עדכון מוצר
                </Typography>
                <form onSubmit={handleSubmit(save)}>
                    <TextField
                        fullWidth
                        //label="שם מוצר"
                        defaultValue={prodToUpdate.productName}
                        {...register("productName", {
                            required: "שם מוצר הוא שדה חובה",
                            minLength: { value: 6, message: "שם מוצר חייב להכיל לפחות 6 תווים" },
                            maxLength: { value: 20, message: "שם מוצר לא יכול לכלול יותר מ-20 תווים" }
                        })}
                        placeholder="שם מוצר"
                        error={Boolean(errors.productName)}
                        helperText={errors.productName ? errors.productName.message : ""}
                        color="success"
                    />
                    <div style={{ height: "35px" }}></div>
                    <TextField
                        fullWidth
                        //label="מחיר"
                        type="number"
                        defaultValue={prodToUpdate.price}
                        {...register("price", {
                            required: "מחיר הוא שדה חובה",
                            min: { value: 250, message: "מחיר חייב להיות לפחות 250 ש'ח" },
                            max: { value: 2500, message: "מחיר לא יכול להיות גבוה מ-2500 ש'ח" }
                        })}
                        error={Boolean(errors.price)}
                        placeholder="מחיר"
                        color="success"
                        helperText={errors.price ? errors.price.message : ""}
                    />
                    <div style={{ height: "35px" }}></div>
                    <TextField
                        fullWidth
                        //label="ניתוב תמונה"
                        defaultValue={prodToUpdate.imagePath}
                        {...register("imagePath", {
                            required: "כתובת תמונה היא שדה חובה",
                            pattern: { value: /^(https?:\/\/).+/i, message: "כתובת התמונה אינה תקינה" }
                        })}
                        placeholder="ניתוב תמונה"
                        color="success"
                        error={Boolean(errors.imagePath)}
                        helperText={errors.imagePath ? errors.imagePath.message : ""}
                    />
                    <div style={{ height: "35px" }}></div>
                    <Button fullWidth style={{ color: "#f4cda2", backgroundColor: "#173831",borderRadius:20 }} variant="contained" color="primary" type="submit">
                        שמור
                    </Button>
                </form>
            </Container></div>
    );
};

export default UpdateProduct;