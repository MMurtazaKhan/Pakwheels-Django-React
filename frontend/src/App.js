import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import { Container } from 'react-bootstrap'
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdDetailsScreen from "./screens/AdDetailsScreen";
import CreateAdScreen from "./screens/CreateAdScreen";
import AdEditScreen from "./screens/AdEditScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UpdateUserScreen from "./screens/UpdateUserScreen";
import ProductListScreen from "./screens/ProductListScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import AdListScreen from "./screens/AdListScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <main className="py-3" >
      <Container>
    <Routes>
        <Route path="/" exact element={<HomeScreen/>} />
        <Route path="/register" exact element={<RegisterScreen/>} />
        <Route path="/login" exact element={<LoginScreen/>} />
        <Route path="/profile" exact element={<ProfileScreen/>} />
        <Route path="/ad/:id" exact element={<AdDetailsScreen/>} />
        <Route path="/ad/create" exact element={<CreateAdScreen/>} />
        <Route path="/ad/edit/:id" exact element={<AdEditScreen/>} />
        <Route path="/products" exact element={<ProductScreen/>} />
        <Route path="/product/:id" exact element={<ProductDetailsScreen/>} />
        <Route path="/admin/product/edit/:id" exact element={<ProductEditScreen/>} />
        <Route path="/admin/users" exact element={<UserListScreen/>} />
        <Route path="/admin/user/:id/edit" exact element={<UpdateUserScreen/>} />
        <Route path="/admin/products" exact element={<ProductListScreen/>} />
        <Route path="/admin/product/create" exact element={<CreateProductScreen/>} />
        <Route path="/admin/ads/" exact element={<AdListScreen/>} />
        <Route path="/cart" exact element={<CartScreen/>} />
        <Route path="/cart/:id" exact element={<CartScreen/>} />
        <Route path="/shipping" exact element={<ShippingScreen/>} />
        <Route path="/payment" exact element={<PaymentScreen/>} />
        <Route path="/placeorder" exact element={<PlaceOrderScreen/>} />

        </Routes>
      </Container>
      </main>
      </Router>
    </div>
  );
}

export default App;
