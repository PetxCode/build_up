import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./comp/Header";
import Registeration from "./comp/Register";
import SignIn from "./comp/SignIn";
import HomeScreen from "./comp/HomeScreen";
import Private from "./comp/Private";
import DetailScreen from "./comp/Detailed";
import StoreScreen from "./eCommerce/StoreScreen";
import { QueryClientProvider, QueryClient } from "react-query";
import Query from "./comp/Query";
import PaymentScreen from "./comp/Payment";
import CartScreen from "./comp/CartScreen";
import CheckOut from "./comp/CheckOut";
import Success from "./comp/SuccessScreen";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/register" element={<Registeration />} />
            <Route path="/sign" element={<SignIn />} />
            <Route path="/success" element={<Success />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/user/:id" element={<DetailScreen />} />
            <Route path="/store" element={<StoreScreen />} />
            <Route path="/query" element={<Query />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route
              path="/"
              element={
                <Private>
                  <HomeScreen />
                </Private>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
