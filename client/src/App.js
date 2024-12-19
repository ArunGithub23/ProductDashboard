import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VerticalNavbar from "./components/VerticalNavbar";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
// import VerticalNavbar from "./VerticalNavbar";
// import CategoryPage from "./CategoryPage";
// import ProductPage from "./ProductPage";
import './App.css'

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <VerticalNavbar/>
        <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
          <Routes>
            <Route path="/category" element={<CategoryPage/>} />
            <Route path="/product" element={<ProductPage/>} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
