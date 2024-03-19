import { useDispatch } from 'react-redux';
import { addItem, decItem, removeItem } from './orderSlice';


import { Button, TableCell, TableRow } from "@mui/material";
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



const BusketRow = ({ product, count }) => {

	const dispatch = useDispatch();

	const handleIncrease = () => {
		dispatch(addItem(product)); // הוספת מוצר
	};

	const handleDecrease = () => {
		dispatch(decItem(product)); // הסרת מוצר
	};

	


	return (<TableRow style={{color:"#297867"}}>
		<TableCell style={{textAlign:"center"}}><Button style={{ borderRadius:200 ,minWidth: "2px",color:"#297867",fontSize:"180%" }} onClick={()=>{dispatch(removeItem(product))}}>✕</Button></TableCell>
		<TableCell align="right" style={{height:"20%",lineHeight:"20%"}}>
			<div style={{fontSize:"150%",color:"#297867",display: "flex", alignItems: "center"}}>
				<img src={product.imagePath} alt={product.productName} style={{ width: "50px",marginLeft:"5%" }} />
				{product.productName}
			</div>
		</TableCell>
		<TableCell style={{textAlign:"right",fontSize:"150%",color:"#297867"}}>₪{product.price}</TableCell>
		<TableCell style={{textAlign:"right"}}>
			<Stack spacing={0} direction="row" alignItems="center">
				<Button style={{ borderRadius:200 ,minWidth: "2px" }} onClick={handleIncrease}><AddIcon style={{color:"#297867"}}/></Button>
				<div style={{fontSize:"150%",color:"#297867"}}>{count}</div>
				<Button   style={{ borderRadius:200 ,minWidth: "2px" }} onClick={handleDecrease} disabled={count <= 1}><RemoveIcon style={{color:"#297867"}}/></Button>
			</Stack>
		</TableCell>
		<TableCell style={{textAlign:"right",fontSize:"150%",color:"#297867"}}>₪{product.price * count}</TableCell>
	</TableRow>);
}

export default BusketRow;