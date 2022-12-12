import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./screens/homeScreen";
import { DashboardScreen } from "./screens/dashboardScreen";
import { ProductOverviewScreen } from "./screens/productOverviewScreen"
import { PaymentScreen } from "./screens/paymentScreen";
import { LoginScreen } from "./screens/loginScreen";

export const LayoutScreens = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={'/'} element={<HomeScreen />} />
                <Route exact path={'/product-overview/:name'} element={<ProductOverviewScreen/>} />
                <Route exact path={'/payment'} element={<PaymentScreen/>} />
                <Route exact path={'/dashboard/:destination'} element={<DashboardScreen />} />
                <Route exact path={'/login'} element={<LoginScreen/>}/>
            </Routes>
        </BrowserRouter>
    );
};