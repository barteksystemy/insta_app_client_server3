const Item= (props) => {
    let vis = "visible"
    if (props.visible == true) {
        vis = "visible";
    } else {
        vis = "hidden";
    }
    console.log(vis);
    return (
        <>
            <div style = {{visibility: vis}}>
            <h1>ITEM 03</h1>
            </div>
            
        </>     
    )
}

export default Item