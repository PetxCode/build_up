import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./comp/Header";
import Registeration from "./comp/Register";
import SignIn from "./comp/SignIn";
import HomeScreen from "./comp/HomeScreen";
import Private from "./comp/Private";
import DetailScreen from "./comp/Detailed";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Registeration />} />
          <Route path="/sign" element={<SignIn />} />
          <Route path="/user/:id" element={<DetailScreen />} />
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
    </div>
  );
};

export default App;
