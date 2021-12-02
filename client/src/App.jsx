import { BrowserRouter as Router, Switch , Route, Redirect } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home"
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import { CartContext, useCartState } from './hooks/useCart'
import { AuthContext, useAuthState } from './hooks/useAuth'
import OrdenRealizada from "./pages/OrdenRealizada";
import LoginAdmin from "./pages/LoginAdmin";
import MenuAdmin from "./pages/MenuAdmin";
import ProductsAdmin from "./pages/ProductsAdmin";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct"

const App = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'

    document.body.appendChild(script)
  }, []);

  const user = false;

  return (
    <AuthContext.Provider value={{...useAuthState()}}>
      <CartContext.Provider value={{...useCartState()}}>
        <Router>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/productos/:category" > <ProductList /> </Route>
            <Route path="/carrito" > <Cart /> </Route>
            <Route path="/login">{user ? <Redirect to="/"/> : <Login />} </Route>
            <Route path="/registro" >{user ? <Redirect to="/"/> : <Register />} </Route>
            <Route path="/producto/:id" > <Product /> </Route>
            <Route path="/ordenRealizada"><OrdenRealizada /></Route>
            <Route path="/admin/login"><LoginAdmin /></Route>
            <Route path="/admin/menu">< MenuAdmin/></Route>
            <Route path="/admin/productos"><ProductsAdmin /></Route>
            <Route path="/admin/addProduct"><CreateProduct/></Route>
            <Route path="/admin/editProduct"><EditProduct /></Route>
          </Switch>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );

};

export default App;