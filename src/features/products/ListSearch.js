import { useLocation, Outlet } from "react-router-dom";
import { getAllProducts, getCountProductByCategury } from "./productApi";
import { useEffect, useState } from "react";
import Item from "./Item";
import * as React from 'react';


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ListSearch = () => {

	let color = useLocation().state;
	let [flag, setFlag] = useState(false);
	let [productArr, setProductArr] = useState([]);
	let [currentPage, setCurrentPage] = useState(1);
	let [len, setLen] = useState(0);


	useEffect(() => {
		getCountProductByCategury(color)
			.then(res => {
				setLen(res.data.count);
				console.log(res.data.count);
				console.log("kkk");
				console.log(len);
			})
			.catch(err => {
				console.log(err);
			})
	}, [flag])

	useEffect(() => {
		getAllProducts(currentPage, 6, "", color)
			.then(res => {
				setProductArr(res.data);
			}).catch(err => {
				console.log(err);
			})
	}, [currentPage, flag])


	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	return (<>
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr ", marginTop: "200px" }}>
			{productArr.map(item => <Item key={item._id} one={item} setFlag={setFlag} />)}
		</div>
		{productArr.length>0&&<Stack spacing={2} style={{ alignItems: "center" }}>

			<Pagination count={(len / 6) % 1 == 0 ? (len / 6) : Math.floor(len / 6)+1} page={currentPage} onChange={handleChange} />
		</Stack>}
		{productArr.length==0&&<h1 style={{textAlign:"center"}}>אין מוצרים בקטגוריית יין {color}</h1>}
		<Outlet />
	</>);
}

export default ListSearch;