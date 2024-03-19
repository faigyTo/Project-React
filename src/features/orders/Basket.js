import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdress } from "./orderSlice";
import BusketRow from "./BusketRow";
import { addOrder } from "./orderApi";
import './style.css';


import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const Basket = () => {
	const basket = useSelector((state) => state.order.busket);
	let { busket, adress } = useSelector(st => st.order);
    let currentUser=useSelector(st=>st.user.currentUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [totalSum, setTotalSum] = useState(0);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
        if (currentUser!=null){
		    setOpen(true);
		}
		else{
			alert("!אינך רשום כמשתמש כדי לבצע הזמנה עליך להירשם")
			setTimeout(()=>{navigate('/signUp')},2000);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseSend = () => {
		
		let ord = { orderAdress: adress, orderedProducts: [] }
		let prod = {};
		for (let i = 0; i < busket.length; i++) {
			let { product, count } = busket[i];
			let { productName, price, imagePath } = product;
			prod = { productName, price, imagePath, account: count };
			ord.orderedProducts.push(prod);
		}

		addOrder(ord, currentUser.token).then(res => {
			console.log(res.data);
			setOpen(false);
			setTimeout(()=>{navigate("/orderDetails")},1500);
		}).catch(err => {
			console.log(err);
		})
	}

	useEffect(() => {
		let sum = 0;
		basket.forEach((item) => {
			sum += item.count * item.product.price;
		});
		setTotalSum(sum);
	}, [basket]);


	return (<div>
		<Box display="grid" gridTemplateColumns="1fr 2fr">
			<TableContainer component={Paper} elevation={0}>
				<Table sx={{ minWidth: 500 }} style={{ width: "70%", marginTop: "165px" }} aria-label="spanning table">
					<TableHead>
						<TableRow>
							<TableCell align="right" colSpan={3} style={{ fontWeight: "bolder", color: "#297867" }}>
								סיכום הזמנה
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ width: "10%", textAlign: "right", fontSize: "120%", color: "#297867" }} >₪{totalSum}</TableCell>
							<TableCell style={{ width: "10%", textAlign: "right", fontSize: "120%", color: "#297867" }} align="right">סך הכל לתשלום</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>

						<TableRow key={basket.length}>
							<TableCell style={{ textAlign: "right", fontSize: "120%", color: "#297867" }}>{basket.length}</TableCell>
							<TableCell align="right" style={{ fontSize: "120%", color: "#297867" }}>סך הכל מוצרים בסל הקניות</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<div style={{ height: "25px" }}></div>
				<div style={{ textAlign: "center" }}>
					<Button className="button" sx={{backgroundColor:"#173831",color:"#f4cda2",border:"2px solid #173831"}} style={{ borderRadius: 20, marginLeft: "10%" }} onClick={() => navigate("/getProduct")}>
						המשך לקנות
					</Button>
					<Button className="button" sx={{backgroundColor:"#173831",color:"#f4cda2",border:"2px solid #173831"}} style={{ borderRadius: 20, marginLeft: "10%" }} onClick={handleClickOpen}>
						סיום הזמנה
					</Button></div>
			</TableContainer>
			{basket.length > 0 && (
				<TableContainer component={Paper} elevation={0} style={{ marginTop: "165px", direction: "rtl" }}>
					<Table sx={{ minWidth: 900 }} style={{ direction: "rtl", width: "25%" }}>
						<TableHead>
							<TableRow>
								<TableCell style={{ fontWeight: "bolder", color: "#297867" }} align="right"></TableCell>
								<TableCell style={{ fontWeight: "bolder", color: "#297867" }} align="right">מוצר</TableCell>
								<TableCell style={{ fontWeight: "bolder", color: "#297867" }} align="right">מחיר</TableCell>
								<TableCell style={{ fontWeight: "bolder", color: "#297867" }} align="right">כמות</TableCell>
								<TableCell style={{ fontWeight: "bolder", color: "#297867" }} align="right">סכום ביניים</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{basket.map((item) => (
								<BusketRow key={item._id} product={item.product} count={item.count} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			{basket.length === 0 && (
				<h1 style={{ textAlign: "center", marginTop: "200px", color: "#173831" }}>
					אין לך כרגע מוצרים בסל הקניות
				</h1>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: (event) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries(formData.entries());
						// const email = formJson.email;
						// console.log(email);
						handleClose();
					},
				}}
                style={{textAlign:"right"}}
			>
				<DialogTitle style={{color: "#173831",textAlign:"center"}}>כתובת לקוח למשלוח</DialogTitle>
				<DialogContent>
					<DialogContentText style={{color: "#173831"}}>
						נא הזן כתובת למשלוח
					</DialogContentText>
					<TextField
                        align="right"
						autoFocus
						required
						margin="dense"
						id="name"
						name="address"
						label="כתובת"
						type="text"
						fullWidth
                        color="success"
						variant="standard"
                        style={{textAlign:"right"}}
						onChange={(e) => dispatch(setAdress(e.target.value))}
					/>
				</DialogContent>
				<DialogActions>
					<Button className='button' sx={{backgroundColor:"#173831",color:"#f4cda2",border:"2px solid #173831"}}  style={{ borderRadius: 20, marginLeft: "10%" }} onClick={handleClose}>בטל✕</Button>
					<Button className='button' sx={{backgroundColor:"#173831",color:"#f4cda2",border:"2px solid #173831"}}  style={{ borderRadius: 20, marginLeft: "10%" }} type="submit" onClick={handleCloseSend}>אישור✓</Button>
				</DialogActions>
			</Dialog>
		</Box>

	</div>


	);
};

export default Basket;
