import { Link } from 'react-router-dom';
import * as React from 'react';
import { getAllProducts, getCountProduct } from "./productApi";
import { useEffect, useState } from "react";
import Item from "./Item";
import { Outlet } from "react-router-dom";


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const ListItem = () => {
    let [productArr, setProductArr] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [len, setLen] = useState(0);
    let [flag, setFlag] = useState(false);


    useEffect(() => {
        getCountProduct()
            .then(res => {
                setLen(res.data.count);
            })
            .catch(err => {
                console.log(err);
            })
    }, [flag])

    useEffect(() => {
        getAllProducts(currentPage, 6, "", "")
            .then(res => {
                setProductArr(res.data);
                setFlag(false);
            }).catch(err => {
                console.log(err);
            })
    }, [currentPage, flag])

    const byColor = (image) => {
        let color = ""
        if (image == "image1") {
            color = "לבן"
        }
        else if (image == "image2") {
            color = "אדום"
        }
        else {
            color = "רוז"
        }
        getAllProducts(1, 6, "", color).then(res => {
            setProductArr(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (<>
        <div style={{ display: 'flex', marginTop: "12%", marginLeft: "0.5%" }}>

            <Link to={"/byCategury"} state={"לבן"} onClick={() => { byColor('image1') }}>
                <img src="https://www.wineboutique.co.il/images/itempics/BN_179.jpg" alt="image1" style={{ width: '98%' }} />
            </Link>
            <Link to={"/byCategury"} state={"אדום"} onClick={() => { byColor('image2') }}>
                <img src="https://www.wineboutique.co.il/images/itempics/BN_180.jpg" alt="image2" style={{ width: '98%' }} />
            </Link>
            <Link to={"/byCategury"} state={"רוז"}>
                <img src="https://www.wineboutique.co.il/images/itempics/BN_181.jpg" alt="image3" style={{ width: '98%' }} />
            </Link>
        </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr ", marginTop: "100px" }}>

                {productArr.map(item => <div key={item._id}><Item one={item} setFlag={setFlag} /></div>)}
            </div>
            <Stack spacing={2} style={{ alignItems: "center" }}>

                <Pagination count={(len / 6) % 1 == 0 ? (len / 6) : Math.floor(len / 6) + 1} page={currentPage} onChange={handleChange} />
            </Stack>
            <Outlet />
        </>);
}

export default ListItem;