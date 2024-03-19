const OneSmallItem = ({ prod }) => {
    return (<div style={{ width: "500px", textAlign: "right", color: "rgb(33 77 68)" }}>
        <p style={{ display: "flex", direction: "rtl", textAlign: "right" }}>
            <p style={{ textAlign: "right" }}> {prod.count}</p>
            <div style={{width:"2%"}}></div>
            <p style={{ textAlign: "right" }}>{prod.product.productName} </p>
        </p>
        <img src={prod.product.imagePath} style={{ height: '200px', marginRight: "10%" }} />
        <p style={{ marginRight: "11%" }}>{prod.product.price}₪</p>
    </div>);
}

export default OneSmallItem;