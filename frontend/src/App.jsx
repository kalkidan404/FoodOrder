import {Route,BrowserRouter,Routes} from "react-router-dom";
//import pages
import Cart from "./pages/Cart";
import FoodDetails from "./pages/FoodDetails";
import Foods from "./pages/Foods";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Payment from "./pages/Payment";
//admin pages
import AdminFoods from "./admin/AdminFoods";
import AdminOrders from "./admin/AdminOrders";
import AdminRestaurants from "./admin/AdminRestaurants";
import AdminDashboard from "./admin/AdminDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register"  element={<Register/>}/>
      <Route path="/foods"  element={<Foods/>}/>
      <Route path="/foods/:id"  element={<FoodDetails/>}/>
      <Route path="/restaurants"  element={<Restaurants/>}/>
      <Route path="/restaurants/:id"  element={<RestaurantDetails/>}/>
      <Route path="/cart"  element={<Cart/>}/>
      <Route path="/orders"  element={<Orders/>}/>
      <Route path="/orders/:id"  element={<OrderDetails/>}/>
      <Route path="/payment/:id" element={<Payment/>}/>
      <Route path="/admin"  element={<AdminDashboard/>}/>
      <Route path="/admin/foods"  element={<AdminFoods/>}/>
      <Route path="/admin/orders"  element={<AdminOrders/>}/>
      <Route path="/admin/restaurants"  element={<AdminRestaurants/>}/>
      <Route path="/payment/success" element={<PaymentSuccess/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;