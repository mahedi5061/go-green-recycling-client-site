import React from "react";
import { productContext } from "../../../App";
import { getDatabaseCart } from "../../../utilities/databaseManager";
import Footer from "../../Shared/Footer/Footer";
import NavbarComponent from "../../Shared/Navbar/NavbarComponent";
import CartPreviewItem from "../CartPreviewItem/CartPreviewItem";
import Cart from './../Cart/Cart';

const CartPreview = () => {
  const [products, setProducts] = React.useContext(productContext);
  const [cart, setCart] = React.useState([]);
  const [placeOrder, setPlaceOrder] = React.useState(false);

  React.useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKey = Object.keys(saveCart);
    if (products.length>0) {
      const countProduct = productKey.map((key) => {
        const product = products.find((pd) => pd._id === key);
        product.quantity = saveCart[key];
        return product;
      });
      setCart(countProduct);
    }
  }, []);

  console.log(cart);
  return (
    <>
    <NavbarComponent/>
    <div className="d-flex justify-content-center py-5">
          <div className="row w-75">
      {cart.map((pd) => (
        <CartPreviewItem pd={pd} id={pd._id} />
      ))}
      </div>
      <Cart cart={cart}/> 
      </div>
      <Footer/>
    </>
  );
};

export default CartPreview;