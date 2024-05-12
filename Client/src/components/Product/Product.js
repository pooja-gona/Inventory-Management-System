import ShowProduct from "../Product/ShowProduct"
const Product = ({products}) => {
    return (
      <div>
        <h1 style={{ color: "black" }}>Products</h1>
        <ShowProduct products = {products} />
      </div>
    )
  }
  
  export default Product